import { forbidden, unauthorized } from '@hapi/boom';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import type { NextHandler, Request, Response } from 'polka';
import { container } from 'tsyringe';
import type { APIUserWithGuilds } from '../struct/Auth';
import { Auth } from '../struct/Auth';
import { logger } from '../util/logger';

declare module 'polka' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	export interface Request {
		discordUser?: APIUserWithGuilds;
	}
}

export function discordAuth(fallthrough = false) {
	const auth = container.resolve(Auth);
	return async (req: Request, res: Response, next: NextHandler) => {
		const cookies = cookie.parse(req.headers.cookie ?? '');
		const token = cookies.access_token ?? req.headers.authorization;

		if (!token) {
			return next(fallthrough ? undefined : unauthorized('missing authorization header', 'Bearer'));
		}

		let discordConnectionResult = await auth.fetchDiscordConnection(token);
		// eslint-disable-next-line promise/prefer-await-to-callbacks
		if (discordConnectionResult.isErrAnd((error) => error instanceof jwt.TokenExpiredError)) {
			if (!cookies.refresh_token) {
				return next(fallthrough ? undefined : unauthorized('expired access token and missing refresh token', 'Bearer'));
			}

			const newTokens = auth.refreshTokens(token, cookies.refresh_token);
			auth.populateAuthCookies(res, newTokens);
			discordConnectionResult = await auth.fetchDiscordConnection(newTokens.access.token);
			// eslint-disable-next-line promise/prefer-await-to-callbacks
		} else if (discordConnectionResult.isErrAnd((error) => error instanceof jwt.JsonWebTokenError)) {
			return next(fallthrough ? undefined : unauthorized('malformed token', 'Bearer'));
		} else if (discordConnectionResult.isErr()) {
			throw discordConnectionResult.unwrapErr();
		}

		const discordConnection = discordConnectionResult.unwrap();
		if (discordConnection.isNone()) {
			return next(fallthrough ? undefined : forbidden('no discord connection'));
		}

		const user = await auth.fetchDiscordUser(discordConnection.unwrap().accessToken);
		if (user.isOk()) {
			// eslint-disable-next-line require-atomic-updates
			req.discordUser = user.unwrap();
			if (req.params.guildId) {
				const guild = req.discordUser.guilds.find((guild) => guild.id === req.params.guildId);
				if (!guild) {
					return next(forbidden('cannot perform actions on this guild'));
				}
			}
		} else {
			logger.error(user.unwrapErr(), 'discord auth failed');
		}

		return next(req.discordUser || fallthrough ? undefined : unauthorized('could not auth with discord'));
	};
}
