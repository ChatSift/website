import { Route, RouteMethod } from '@chatsift/rest-utils';
import { REST } from '@discordjs/rest';
import { internal, notFound } from '@hapi/boom';
import type { APIChannel, APIGuild, APIRole } from 'discord-api-types/v10';
import { Routes } from 'discord-api-types/v10';
import type { Middleware, NextHandler, Request, Response } from 'polka';
import { inject, singleton } from 'tsyringe';
import { discordAuth } from '../../middleware/discordAuth';
import { logger } from '../../util/logger';
import { SYMBOLS } from '../../util/symbols';

export type GetDiscordAuthMeGuildResult = {
	channels: APIChannel[];
	roles: APIRole[];
};

@singleton()
export default class extends Route<GetDiscordAuthMeGuildResult, never> {
	public info = {
		method: RouteMethod.get,
		path: '/auth/v1/discord/@me/guilds/:guildId',
	} as const;

	public override middleware: Middleware[] = [discordAuth()];

	public constructor(
		@inject(SYMBOLS.automoderatorRest) private readonly automoderatorRest: REST,
		@inject(SYMBOLS.amaRest) private readonly amaRest: REST,
		@inject(SYMBOLS.modmailRest) private readonly modmailRest: REST,
	) {
		super();
	}

	private async getGuild(guild: string, rest: REST): Promise<APIGuild> {
		return (await rest.get(Routes.guild(guild))) as APIGuild;
	}

	private async getGuildChannels(guild: string, rest: REST): Promise<APIChannel[]> {
		return (await rest.get(Routes.guildChannels(guild))) as APIChannel[];
	}

	public async handle(req: Request, res: Response, next: NextHandler) {
		const { guildId } = req.params as { guildId: string };
		const user = req.discordUser!;
		const { guilds } = user;

		if (!guilds.some((guild) => guild.id !== guildId)) {
			return notFound("guild doesn't exist or user can't manage it");
		}

		const guild = await Promise.any([
			this.getGuild(guildId, this.automoderatorRest),
			this.getGuild(guildId, this.amaRest),
			this.getGuild(guildId, this.modmailRest),
		]).catch((error) => {
			logger.error(error, 'failed to get user guild');
			return null;
		});

		if (!guild) {
			return next(internal());
		}

		const { roles } = guild;
		const channels = await Promise.any([
			this.getGuildChannels(guildId, this.automoderatorRest),
			this.getGuildChannels(guildId, this.amaRest),
			this.getGuildChannels(guildId, this.modmailRest),
		]);

		const data: GetDiscordAuthMeGuildResult = {
			roles,
			channels,
		};

		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		return res.end(JSON.stringify(data));
	}
}
