import { Route, RouteMethod } from '@chatsift/rest-utils';
import { PrismaClient } from '@prisma/client';
import type { Middleware, Request, Response } from 'polka';
import { singleton } from 'tsyringe';

@singleton()
export default class extends Route<{ owo: string }, never> {
	public info = {
		method: RouteMethod.get,
		path: '/hello/world',
	} as const;

	public override middleware: Middleware[] = [];

	public constructor(private readonly prisma: PrismaClient) {
		super();
	}

	public handle(_: Request, res: Response) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ hello: 'world' }));
	}
}
