import { Route, RouteMethod, State, validate } from '@chatsift/rest-utils';
import { InferType, s } from '@sapphire/shapeshift';
import type { Middleware, Request, Response } from 'polka';
import { singleton } from 'tsyringe';
import { discordAuth } from '../../middleware/discordAuth';
import { Env } from '../../util/env';

@singleton()
export default class extends Route<never, never> {
	private readonly schema = s.object({
		redirect_uri: s.string.regex(this.env.allowedRedirects),
	}).strict;

	public info = {
		method: RouteMethod.get,
		path: '/auth/v1/discord',
	} as const;

	public override middleware: Middleware[] = [validate(this.schema, 'query'), discordAuth(true)];

	public constructor(private readonly env: Env) {
		super();
	}

	public handle(req: Request, res: Response) {
		const { redirect_uri } = req.query as InferType<typeof this.schema>;

		if (req.discordUser) {
			res.redirect(redirect_uri);
			return res.end();
		}

		const state = new State(redirect_uri).toString();

		const params = new URLSearchParams({
			client_id: this.env.discordClientId,
			redirect_uri: `${this.env.domain}/auth/v1/discord/callback`,
			response_type: 'code',
			scope: this.env.scopesString,
			state,
		});

		res.cookie('state', state, { httpOnly: true, path: '/' });
		res.redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`);
		return res.end();
	}
}
