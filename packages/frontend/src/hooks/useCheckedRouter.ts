import { useRouter } from 'next/router';
import useRouterLinkController from '~/RouterLinkControllerContext';

// A replacement for useRouter that allows for canceling navigation.
// I.e. if routerLinkController.onNavigate() returns false, the navigation is canceled.
// routerLinkController.onNavigate is a context value that is modifiable throughout the site.
function useCheckedRouter() {
	const router = useRouter();
	const routerLinkController = useRouterLinkController();

	return Object.fromEntries(
		Object.entries(router).map(([key, value]) => {
			if (typeof value === 'function') {
				const func = value as (...args: unknown[]) => unknown;

				return [
					key,
					(...args: unknown[]) => {
						if (routerLinkController.onNavigate?.() === false) {
							return;
						}

						func(...args);
					},
				];
			}

			return [key, value];
		}),
	);
}

export default useCheckedRouter;
