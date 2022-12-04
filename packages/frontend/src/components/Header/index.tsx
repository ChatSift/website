import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Desktop from './components/Desktop';
import Mobile from './components/Mobile';
import * as HeaderStyles from './style';
import { activeMobileOverride } from './style';

export type HeaderLink = {
	external: boolean;
	href: string;
	name: string;
};

// NOTE: ADJUST mobileNavCloseAnimation's max-height GUESSTIMATE IF YOU ADD OR REMOVE LINKS
// Also, if possible, the above is scuffed, fix it if possible..
export const headerItems: HeaderLink[] = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		external: false,
	},
	{
		name: 'GitHub',
		href: '/github',
		external: false,
	},
	{
		name: 'Support',
		href: '/support',
		external: false,
	},
];

export function MobileHeaderOverride({ children }: { children: ReactNode }) {
	const [container, setContainer] = useState<Element | null>(null);

	useEffect(() => {
		if (!container) {
			setContainer(document.querySelector('#mobile-override-container'));
		}
	}, [container]);

	useEffect(() => {
		if (!container) {
			return;
		}

		container.classList.add(activeMobileOverride);

		return () => container.classList.remove(activeMobileOverride);
	}, [container]);

	if (!container) {
		return null;
	}

	return createPortal(children, container);
}

function Header() {
	return (
		<HeaderStyles.Base>
			<Desktop />
			<div id="mobile-override-container">
				<Mobile />
			</div>
		</HeaderStyles.Base>
	);
}

export default Header;
