import type { AuthRoutes, InferAuthRouteResult, InferAuthRouteBody } from '@chatsift/website-api';
import type { Payload } from '@hapi/boom';

export class APIError extends Error {
	public readonly payload: Payload;

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
	body?: InferAuthRouteBody<TPath, TMethod>;
	method: TMethod;
	path: TPath;
}): Promise<InferAuthRouteResult<TPath, TMethod>> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}${path}`, {
		method: method as string,
		body: body as BodyInit,
		credentials: 'include',
	});

	if (res.status >= 200 && res.status < 300) {
		return res.json() as Promise<InferAuthRouteResult<TPath, TMethod>>;
	}

	throw new APIError((await res.json()) as Payload);
}
