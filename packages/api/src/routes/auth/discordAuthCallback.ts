import { Route, RouteMethod, State, validate } from '@chatsift/rest-utils';
import { badRequest, forbidden, internal } from '@hapi/boom';
import { InferType, s } from '@sapphire/shapeshift';
import cookie from 'cookie';
import type { RESTPostOAuth2AccessTokenResult } from 'discord-api-types/v10';
import type { Middleware, NextHandler, Request, Response } from 'polka';
import { singleton } from 'tsyringe';
import { request } from 'undici';
import { discordAuth } from '../../middleware/discordAuth';
import { Auth } from '../../struct/Auth';
import { Env } from '../../util/env';
import { logger } from '../../util/logger';

@singleton()
export default class extends Route<never, never> {
	private readonly schema = s.object({
		code: s.string,
		state: s.string,
	}).strict;

	public info = {
		method: RouteMethod.get,
		path: '/auth/v1/discord/callback',
	} as const;

	public override middleware: Middleware[] = [validate(this.schema, 'query'), discordAuth(true)];

	public constructor(private readonly env: Env, private readonly auth: Auth) {
		super();
	}

	public async handle(req: Request, res: Response, next: NextHandler) {
		const { code, state: stateQuery } = req.query as InferType<typeof this.schema>;

		const cookies = cookie.parse(req.headers.cookie ?? '');
		if (stateQuery !== cookies.state) {
			return next(badRequest('invalid state'));
		}

		const state = State.from(stateQuery);
		res.cookie('state', 'noop', { httpOnly: true, path: '/', expires: new Date('1970-01-01') });

		if (req.discordUser) {
			res.redirect(state.redirectUri);
			return res.end();
		}

		const form = new URLSearchParams({
			client_id: this.env.discordClientId,
			client_secret: this.env.discordClientSecret,
			redirect_uri: `${this.env.domain}/auth/v1/discord/callback`,
			scope: this.env.discordScopes.join(' '),
			grant_type: 'authorization_code',
			code,
		});

		const result = await request('https://discord.com/api/v10/oauth2/token', {
			method: 'POST',
			body: form.toString(),
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
		});

		const oauthData = (await result.body.json()) as RESTPostOAuth2AccessTokenResult;

		if (result.statusCode >= 400) {
			logger.warn({ oauthData }, 'discord oauth error');
			return next(internal('discord oauth error'));
		}

		const { scope: returnedScope } = oauthData;
		if (returnedScope !== this.env.discordScopes.join(' ')) {
			logger.warn({ returnedScope, expectedScope: this.env.discordScopes.join(' ') }, 'miss matched scopes');
			return next(
				forbidden(`Expected scope "${this.env.discordScopes.join(' ')}" but received scope "${returnedScope}"`),
			);
		}

		const user = await this.auth.fetchDiscordUser(oauthData.access_token);
		if (!user.isOk()) {
			logger.error(user.unwrapErr());
			return next(internal('failed to fetch discord user'));
		}

		const connection = await this.auth.loginWithDiscord(user.unwrap().id, oauthData);
		const credentials = this.auth.createTokens(connection.userId);
		this.auth.populateAuthCookies(res, credentials);

		res.redirect(state.redirectUri);
		return res.end();
	}
}
