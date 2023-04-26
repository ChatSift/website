import type { AMARoutes } from '@chatsift/ama-api';
import type { ModmailRoutes } from '@chatsift/modmail-api';
import type { Route, InferRouteResult, InferRouteBody } from '@chatsift/rest-utils';
import type { SocialRoutes } from '@chatsift/social-api';
import type { AuthRoutes } from '@chatsift/website-api';
import type { Payload } from '@hapi/boom';
import type { NextRouter } from 'next/router';
import type { useErrorHandler } from 'react-error-boundary';
import type { DialogController } from '~/context/DialogControllerContext';
import * as Urls from '~/utils/urls';

type Routes = AMARoutes & AuthRoutes & ModmailRoutes & SocialRoutes;

export class APIError extends Error {
	public constructor(public readonly payload: Payload, public readonly method: string) {
		super(payload.message);
	}
}

export function handleError(
	router: NextRouter,
	error: Error,
	dialogController: DialogController,
	errorHandler: ReturnType<typeof useErrorHandler>,
) {
	console.log('error', error);

	if (error instanceof APIError) {
		switch (error.payload.statusCode) {
			case 401:
				void router.push(Urls.logIn);
				return;
			case 403:
				dialogController.openAlertDialog?.({
					title: 'Forbidden',
					description: "You don't have permission to view or edit this config.",
					actionButton: {
						text: 'Go back',
						onClick: () => {
							void router.push('/dashboard');
						},
					},
				});
				return;
		}
	}

	errorHandler(error);
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

	throw new APIError((await res.json()) as Payload, parsedMethod);
}
