import type { AuthRoutes, InferAuthRouteResult, InferAuthRouteBody } from '@chatsift/website-api';
import type { Payload } from '@hapi/boom';

export class APIError extends Error {
	public readonly payload: Payload | undefined; // can be undefined in case of network error

	public constructor(payload: Payload) {
		super(payload.message);
		this.payload = payload;
	}
}

export async function fetchApi<TPath extends keyof AuthRoutes, TMethod extends keyof AuthRoutes[TPath]>({
	path,
	method,
	body,
}: {
	path: TPath;
	method: TMethod;
	body?: InferAuthRouteBody<TPath, TMethod>;
}): Promise<InferAuthRouteResult<TPath, TMethod>> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}${path}`, {
		method: method as string,
		body: body as BodyInit,
		credentials: 'include',
	});

	if (res.status >= 200 && res.status < 300) {
		return (await res.json()) as InferAuthRouteResult<TPath, TMethod>;
	}

	throw new APIError((await res.json()) as Payload);
}
