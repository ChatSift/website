import { Route, RouteMethod } from '@chatsift/rest-utils';
import type { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import type { Middleware, Request, Response } from 'polka';
import { inject, singleton } from 'tsyringe';
import { discordAuth } from '../../middleware/discordAuth';
import { SYMBOLS } from '../../util/symbols';

interface Result {
	id: string;
	username: string;
	discriminator: string;
	avatar: string | null;
	guilds: {
		id: string;
		name: string;
		icon: string | null;
		hasAutomoderator: boolean;
		hasAma: boolean;
		hasModmail: boolean;
	}[];
}

@singleton()
export default class extends Route<Result, never> {
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

	private has(guild: string, rest: REST) {
		return rest
			.get(Routes.guild(guild))
			.then(() => true)
			.catch(() => false);
	}

	public async handle(req: Request, res: Response) {
		const user = req.discordUser!;
		const { id, username, discriminator, avatar, guilds } = user;

		const data: Result = {
			id,
			username,
			discriminator,
			avatar,
			guilds: await Promise.all(
				guilds.map(async ({ id, name, icon }) => {
					const [hasAutomoderator, hasAma, hasModmail] = await Promise.all([
						this.has(id, this.automoderatorRest),
						this.has(id, this.amaRest),
						this.has(id, this.modmailRest),
					]);

					return {
						id,
						name,
						icon,
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
