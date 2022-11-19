import type { AMARoutes } from '@chatsift/ama-api';
import type { ModmailRoutes } from '@chatsift/modmail-api';
import type { Route, InferRouteResult, InferRouteBody } from '@chatsift/rest-utils';
import type { AuthRoutes } from '@chatsift/website-api';
import type { Payload } from '@hapi/boom';

type Routes = AMARoutes & AuthRoutes & ModmailRoutes;

export class APIError extends Error {
	public constructor(public readonly payload: Payload) {
		super(payload.message);
	}
}

export async function fetchApi<TPath extends keyof Routes, TMethod extends keyof Routes[TPath]>({
	path,
	method,
	body,
}: {
	body?: Routes[TPath][TMethod] extends Route<any, any> ? InferRouteBody<Routes[TPath][TMethod]> : never;
	method: TMethod;
	path: TPath;
}): Promise<InferRouteResult<Routes[TPath][TMethod]>> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}${path}`, {
		method: method as string,
		body: body as BodyInit,
		credentials: 'include',
	});

	if (res.status >= 200 && res.status < 300) {
		return res.json() as Promise<InferRouteResult<Routes[TPath][TMethod]>>;
	}

	throw new APIError((await res.json()) as Payload);
}
