import { pipeline } from 'node:stream/promises';
import { URLSearchParams } from 'node:url';
import { badGateway } from '@hapi/boom';
import type { Request, Response } from 'polka';
import type { Dispatcher } from 'undici';
import { request } from 'undici';
import { logger } from '../util/logger';

export function proxyRequests(baseUrl: string) {
	return async (req: Request, res: Response) => {
		const params = new URLSearchParams(req.query);
		const data = await request(`${baseUrl}/${req.path}${[...params.keys()].length ? `?${params.toString()}` : ''}`, {
			method: req.method as Dispatcher.HttpMethod,
			body: req,
			headers: req.headers,
		}).catch((error) => {
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
