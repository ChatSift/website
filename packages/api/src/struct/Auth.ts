import { setTimeout } from 'node:timers';
import { REST } from '@discordjs/rest';
import { ms } from '@naval-base/ms';
import type { Connection } from '@prisma/client';
import { ConnectionType, PrismaClient } from '@prisma/client';
import { Option, Result } from '@sapphire/result';
import type {
	APIUser,
	RESTGetAPICurrentUserGuildsResult,
	RESTPostOAuth2AccessTokenResult,
} from 'discord-api-types/v10';
import { PermissionFlagsBits, Routes } from 'discord-api-types/v10';
import jwt from 'jsonwebtoken';
import type { Response } from 'polka';
import { inject, singleton } from 'tsyringe';
import { Env } from '../util/env';
import { SYMBOLS } from '../util/symbols';

export type AccessTokenData = {
	iat: number;
	refresh: false;
	sub: string;
};

export type RefreshTokenData = {
	iat: number;
	refresh: true;
	sub: string;
};

export type Token = {
	expiration: Date;
	token: string;
};

export type Credentials = {
	access: Token;
	refresh: Token;
};

export type APIUserWithGuilds = APIUser & {
	guilds: RESTGetAPICurrentUserGuildsResult;
};

@singleton()
export class Auth {
	private readonly cachedDiscordUser = new Map<string, APIUserWithGuilds>();

	public constructor(
		private readonly prisma: PrismaClient,
		private readonly env: Env,
		@inject(SYMBOLS.oauthRest) private readonly oauthRest: REST,
	) {}

	public populateAuthCookies(res: Response, credentials: Credentials): void {
		res.cookie('access_token', credentials.access.token, {
			expires: credentials.refresh.expiration,
			path: '/',
			sameSite: this.env.isProd ? 'none' : 'strict',
			httpOnly: true,
			secure: this.env.isProd,
		});

		res.cookie('refresh_token', credentials.refresh.token, {
			expires: credentials.refresh.expiration,
			path: '/',
			sameSite: this.env.isProd ? 'none' : 'strict',
			httpOnly: true,
			secure: this.env.isProd,
		});
	}

	public noopAuthCookies(res: Response): void {
		res.cookie('access_token', 'noop', {
			expires: new Date(1_970),
			path: '/',
			sameSite: this.env.isProd ? 'none' : 'strict',
			httpOnly: true,
			secure: this.env.isProd,
		});

		res.cookie('refresh_token', 'noop', {
			expires: new Date(1_970),
			path: '/',
			sameSite: this.env.isProd ? 'none' : 'strict',
			httpOnly: true,
			secure: this.env.isProd,
		});
	}

	public createTokens(userId: number): Credentials {
		const iat = Math.floor(Date.now() / 1_000);

		const data = {
			sub: userId.toString(),
			iat,
		};

		const accessToken: AccessTokenData = {
			...data,
			refresh: false,
		};

		const refreshToken: RefreshTokenData = {
			...data,
			refresh: true,
		};

		const accessExpiresIn = ms('15m');
		const refreshExpiresIn = ms('7d');

		return {
			access: {
				token: jwt.sign(accessToken, this.env.secretKey, { expiresIn: Math.floor(accessExpiresIn / 1_000) }),
				expiration: new Date(Date.now() + accessExpiresIn),
			},
			refresh: {
				token: jwt.sign(refreshToken, this.env.secretKey, { expiresIn: Math.floor(refreshExpiresIn / 1_000) }),
				expiration: new Date(Date.now() + refreshExpiresIn),
			},
		};
	}

	public refreshTokens(accessToken: string, refreshToken: string): Credentials {
		const accessData = jwt.verify(accessToken, this.env.secretKey, { ignoreExpiration: true }) as AccessTokenData;
		const refreshData = jwt.verify(refreshToken, this.env.secretKey) as RefreshTokenData;

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (accessData.refresh || !refreshData.refresh) {
			throw new Error('invalid token(s)');
		}

		if (accessData.sub !== refreshData.sub) {
			throw new Error('unmatched token(s)');
		}

		return this.createTokens(Number.parseInt(accessData.sub, 10));
	}

	public async verifyToken(token: string, ignoreExpiration = false): Promise<number> {
		const data = jwt.verify(token, this.env.secretKey, { ignoreExpiration }) as AccessTokenData;

		const userId = Number.parseInt(data.sub, 10);
		const user = await this.prisma.user.findFirst({
			where: {
				userId,
			},
		});

		if (!user) {
			throw new Error('invalid user');
		}

		return userId;
	}

	public async fetchDiscordConnection(accessToken: string): Promise<Result<Option<Connection>, Error>> {
		return Result.fromAsync(async () => {
			const userId = await this.verifyToken(accessToken);
			const user = await this.prisma.user.findFirstOrThrow({
				where: {
					userId,
				},
				include: {
					connections: {
						where: {
							type: ConnectionType.Discord,
						},
					},
				},
			});

			const [connection] = user.connections as [Connection?];
			return Option.from(connection);
		});
	}

	public async fetchDiscordUser(discordAccessToken: string): Promise<Result<APIUserWithGuilds, Error>> {
		return Result.fromAsync(async () => {
			if (this.cachedDiscordUser.has(discordAccessToken)) {
				return this.cachedDiscordUser.get(discordAccessToken)!;
			}

			this.oauthRest.setToken(discordAccessToken);

			const fetched = (await this.oauthRest.get(Routes.user())) as APIUser;
			const rawGuilds = (await this.oauthRest.get(
				`${Routes.userGuilds()}?with_counts=true`,
			)) as RESTGetAPICurrentUserGuildsResult;
			const guilds = rawGuilds.filter(
				(guild) => (BigInt(guild.permissions) & PermissionFlagsBits.Administrator) !== 0n,
			);

			const discordUser: APIUserWithGuilds = { ...fetched, guilds };
			this.cachedDiscordUser.set(discordAccessToken, discordUser);
			setTimeout(() => this.cachedDiscordUser.delete(discordAccessToken), ms('5m')).unref();

			return discordUser;
		});
	}

	public async loginWithDiscord(discordUserId: string, data: RESTPostOAuth2AccessTokenResult): Promise<Connection> {
		const connectionData = {
			clientId: discordUserId,
			accessToken: data.access_token,
			refreshToken: data.refresh_token,
			expiresAt: new Date(Date.now() + data.expires_in * 1_000),
		};

		const existingConnection = await this.prisma.connection.findFirst({ where: { clientId: discordUserId } });
		if (existingConnection) {
			return this.prisma.connection.update({
				data: connectionData,
				where: {
					clientId: discordUserId,
				},
			});
		}

		return this.prisma.connection.create({
			data: {
				user: {
					create: {},
				},
				type: ConnectionType.Discord,
				...connectionData,
			},
		});
	}
}
