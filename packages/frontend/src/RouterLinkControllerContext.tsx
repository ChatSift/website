import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

type RouterLinkController = {
	onNavigate?(): boolean;
	setOnNavigate?(onNavigate: RouterLinkController['onNavigate']): void;
};

export const RouterLinkControllerContext = createContext<RouterLinkController>({});

type ProviderProps = {
	children: ReactNode;
};

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
