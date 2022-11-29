import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import useRouterLinkController from '~/context/RouterLinkControllerContext';

// A replacement for useRouter that allows for canceling navigation.
// I.e. if routerLinkController.onNavigate() returns false, the navigation is canceled.
// routerLinkController.onNavigate is a context value that is modifiable throughout the site.
function useCheckedRouter(): NextRouter {
	const router = useRouter();
	const routerLinkController = useRouterLinkController();

	return {
		...router,
		...Object.fromEntries(
			Object.entries(router)
				.filter(([key]) => ['push', 'replace'].includes(key))
				.map(([key, value]) => {
					if (typeof value === 'function') {
						const func = value as (...args: unknown[]) => unknown;

						return [
							key,
							(toUrl: string, ...args: unknown[]) => {
								if (routerLinkController.onNavigate?.(toUrl) === false) {
									return;
								}

								func(toUrl, ...args);
							},
						];
					}

					return [key, value];
				}),
		),
	};
}

export default useCheckedRouter;
