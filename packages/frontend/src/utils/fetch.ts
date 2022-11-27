import type { AMARoutes } from '@chatsift/ama-api';
import type { ModmailRoutes } from '@chatsift/modmail-api';
import type { Route, InferRouteResult, InferRouteBody } from '@chatsift/rest-utils';
import type { AuthRoutes } from '@chatsift/website-api';
import type { Payload } from '@hapi/boom';

type Routes = AMARoutes & AuthRoutes & ModmailRoutes;

export class APIError extends Error {
	public constructor(public readonly payload: Payload, public readonly method: string) {
		super(payload.message);
		this.method = method;
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
	const parsedMethod = (method as string).toUpperCase();
	const headers: HeadersInit = {};

	if (['POST', 'PUT', 'PATCH'].includes(parsedMethod)) {
		headers['Content-Type'] = 'application/json';
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}${path}`, {
		method: parsedMethod,
		body: body ? JSON.stringify(body) : (body as BodyInit),
		credentials: 'include',
		headers,
	});

	if (res.status >= 200 && res.status < 300) {
		return res.json() as Promise<InferRouteResult<Routes[TPath][TMethod]>>;
	}

	throw new APIError((await res.json()) as Payload, parsedMethod.toUpperCase());
}
