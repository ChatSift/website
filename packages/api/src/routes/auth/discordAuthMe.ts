import { Route, RouteMethod } from '@chatsift/rest-utils';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import type { Middleware, Request, Response } from 'polka';
import { inject, singleton } from 'tsyringe';
import { discordAuth } from '../../middleware/discordAuth';
import { SYMBOLS } from '../../util/symbols';

export type GetDiscordAuthMeResult = {
	avatar: string | null;
	discriminator: string;
	guilds: {
		hasAma: boolean;
		hasAutomoderator: boolean;
		hasModmail: boolean;
		icon: string | null;
		id: string;
		name: string;
	}[];
	id: string;
	username: string;
};

@singleton()
export default class extends Route<GetDiscordAuthMeResult, never> {
	public info = {
		method: RouteMethod.get,
		path: '/auth/v1/discord/@me',
	} as const;

	public override middleware: Middleware[] = [discordAuth()];

	public constructor(
		@inject(SYMBOLS.automoderatorRest) private readonly automoderatorRest: REST,
		@inject(SYMBOLS.amaRest) private readonly amaRest: REST,
		@inject(SYMBOLS.modmailRest) private readonly modmailRest: REST,
	) {
		super();
	}

	private async has(guild: string, rest: REST): Promise<boolean> {
		try {
			await rest.get(Routes.guild(guild));
			return true;
		} catch {
			return false;
		}
	}

	public async handle(req: Request, res: Response) {
		const user = req.discordUser!;
		const { id, username, discriminator, avatar, guilds } = user;

		const data: GetDiscordAuthMeResult = {
			id,
			username,
			discriminator,
			avatar,
			guilds: await Promise.all(
				// @ts-expect-error TS2339
				guilds.map(async ({ id, name, icon, approximate_member_count, approximate_presence_count }) => {
					const [hasAutomoderator, hasAma, hasModmail] = await Promise.all([
						this.has(id, this.automoderatorRest),
						this.has(id, this.amaRest),
						this.has(id, this.modmailRest),
					]);

					return {
						id,
						name,
						icon,
						approximate_member_count,
						approximate_presence_count,
						hasAutomoderator,
						hasAma,
						hasModmail,
					};
				}),
			),
		};

		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(data));
	}
}
