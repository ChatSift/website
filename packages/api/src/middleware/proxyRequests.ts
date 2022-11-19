import { pipeline } from 'node:stream/promises';
import { URLSearchParams } from 'node:url';
import { badGateway } from '@hapi/boom';
import type { Request, Response } from 'polka';
import type { Dispatcher } from 'undici';
import { request } from 'undici';
import { logger } from '../util/logger';

// copy pasted from undici internals; they don't allow passing in those headers yourself
const forbiddenHeaderNames = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'via',
];

export function proxyRequests(baseUrl: string) {
	return async (req: Request, res: Response) => {
		const params = new URLSearchParams(req.query);
		const headers = Object.fromEntries(
			Object.entries(req.headers).filter(([key]) => !forbiddenHeaderNames.includes(key.toLowerCase())),
		);

		const data = await request(
			`${baseUrl}${req.originalUrl}${[...params.keys()].length ? `?${params.toString()}` : ''}`,
			{
				method: req.method as Dispatcher.HttpMethod,
				body: req,
				headers,
			},
		).catch((error) => {
			logger.error(error, 'failed to proxy req');
			throw badGateway();
		});

		res.statusCode = data.statusCode;
		for (const [name, value] of Object.entries(data.headers)) {
			res.setHeader(name, value!);
		}

		await pipeline(data.body, res);
		res.end();
	};
}
