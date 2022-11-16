import { useRouter } from 'next/router';
import useRouterLinkController from '~/RouterLinkControllerContext';

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
