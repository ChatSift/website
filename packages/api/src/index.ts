import 'reflect-metadata';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readdirRecurse } from '@chatsift/readdir';
import type { Route } from '@chatsift/rest-utils';
import { attachHttpUtils, sendBoom } from '@chatsift/rest-utils';
import { REST } from '@discordjs/rest';
import { Boom, isBoom, notFound } from '@hapi/boom';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';
import type { Middleware } from 'polka';
import polka from 'polka';
import { container } from 'tsyringe';
import { discordAuth } from './middleware/discordAuth';
import { proxyRequests } from './middleware/proxyRequests';
import { Env } from './util/env';
import { logger } from './util/logger';
import { SYMBOLS } from './util/symbols';

const env = container.resolve(Env);
container.register(PrismaClient, { useValue: new PrismaClient() });

container.register(SYMBOLS.oauthRest, { useValue: new REST({ authPrefix: 'Bearer' }) });
container.register(SYMBOLS.automoderatorRest, { useValue: new REST().setToken(env.automoderatorToken) });
container.register(SYMBOLS.amaRest, { useValue: new REST().setToken(env.amaToken) });
container.register(SYMBOLS.modmailRest, { useValue: new REST().setToken(env.modmailToken) });

const app = polka({
	onError(error, _, res) {
		res.setHeader('content-type', 'application/json');
		const boom = isBoom(error) ? error : new Boom(error);

		if (boom.output.statusCode === 500) {
			logger.error(boom, boom.message);
		}

		sendBoom(boom, res);
	},
	onNoMatch(_, res) {
		res.setHeader('content-type', 'application/json');
		sendBoom(notFound(), res);
	},
}).use(
	cors({
		origin: env.cors ?? '*',
		credentials: true,
	}),
	helmet({ contentSecurityPolicy: env.isProd ? undefined : false }) as Middleware,
	attachHttpUtils(),
);

const path = join(dirname(fileURLToPath(import.meta.url)), 'routes');
const files = readdirRecurse(path, { fileExtensions: ['js'] });

for await (const file of files) {
	const mod = (await import(pathToFileURL(file).toString())) as { default?: new () => Route<any, any> };
	if (mod.default) {
		const route = container.resolve(mod.default);
		logger.info(route.info, 'Registering route');
		route.register(app);
	}
}

// External api proxying
app
	.use('/automoderator/:version/*', discordAuth(), proxyRequests(env.automoderatorAPIURL))
	.use('/ama/:version/*', discordAuth(), proxyRequests(env.amaAPIURL))
	.use('/modmail/:version/*', discordAuth(), proxyRequests(env.modmailAPIURL));

app.listen(env.port, () => logger.info(`Listening to requests on port ${env.port}`));

export * from './routeTypes';
