import { pipeline } from 'stream/promises';
import { badGateway } from '@hapi/boom';
import type { Request, Response } from 'polka';
import { Dispatcher, request } from 'undici';

export function proxyRequests(baseUrl: string) {
	return async (req: Request, res: Response) => {
		const data = await request(`${baseUrl}/${req.path}`, {
			method: req.method as Dispatcher.HttpMethod,
			body: req,
			headers: req.headers,
		}).catch(() => {
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
