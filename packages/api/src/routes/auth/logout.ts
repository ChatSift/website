import { Route, RouteMethod, validate } from '@chatsift/rest-utils';
import { InferType, s } from '@sapphire/shapeshift';
import type { Middleware, Request, Response } from 'polka';
import { singleton } from 'tsyringe';
import { discordAuth } from '../../middleware/discordAuth';
import { Auth } from '../../struct/Auth';
import { Env } from '../../util/env';

@singleton()
export default class extends Route<never, never> {
	private readonly schema = s.object({
		redirect_uri: s.string.regex(this.env.allowedRedirects),
	}).strict;

	public info = {
		method: RouteMethod.get,
		path: '/auth/v1/logout',
	} as const;

	public override middleware: Middleware[] = [discordAuth(false), validate(this.schema, 'query')];

	public constructor(private readonly auth: Auth, private readonly env: Env) {
		super();
	}

	public handle(req: Request, res: Response) {
		const { redirect_uri } = req.query as InferType<typeof this.schema>;

		this.auth.noopAuthCookies(res);

		res.redirect(redirect_uri);
		return res.end();
	}
}
