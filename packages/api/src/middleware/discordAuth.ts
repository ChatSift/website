import { forbidden, unauthorized } from '@hapi/boom';
import cookie from 'cookie';
import type { NextHandler, Request, Response } from 'polka';
import { container } from 'tsyringe';
import { APIUserWithGuilds, Auth } from '../struct/Auth';

declare module 'polka' {
	export interface Request {
		discordUser?: APIUserWithGuilds;
	}
}

export function discordAuth(fallthrough = false) {
	const auth = container.resolve(Auth);
	return async (req: Request, res: Response, next: NextHandler) => {
		const cookies = cookie.parse(req.headers.cookie ?? '');
		const token = cookies.access_token ?? req.headers.authorization;

		res.headersSent;
		if (!token) {
			return next(fallthrough ? undefined : unauthorized('missing authorization header', 'Bearer'));
		}

		const user = await auth.fetchDiscordUser(token);
		if (user.isOk()) {
			req.discordUser = user.unwrap();
			if (req.params.guildId) {
				const guild = req.discordUser.guilds.find((g) => g.id === req.params.guildId);
				if (!guild) {
					return next(forbidden('cannot perform actions on this guild'));
				}
			}
		}

		return next(req.discordUser || fallthrough ? undefined : unauthorized('could not auth with discord'));
	};
}
