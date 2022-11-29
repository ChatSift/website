import { createContext, useContext, useState } from 'react';
import type { ProviderProps } from '~/context/props';

type RouterLinkController = {
	onNavigate?(toUrl: string): boolean;
	setOnNavigate?(onNavigate: RouterLinkController['onNavigate']): void;
};

export const RouterLinkControllerContext = createContext<RouterLinkController>({});

export function RouterLinkControllerProvider({ children }: ProviderProps) {
	const [onNavigate, setOnNavigate] = useState<RouterLinkController['onNavigate']>();

	return (
		<RouterLinkControllerContext.Provider
			value={{
				onNavigate,
				setOnNavigate: (newValue) => setOnNavigate(() => newValue),
			}}
		>
			{children}
		</RouterLinkControllerContext.Provider>
	);
}

const useRouterLinkController = () => useContext(RouterLinkControllerContext);

export default useRouterLinkController;
