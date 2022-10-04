import { useRouter } from 'next/router';
import React from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';
import * as HeaderStyles from './style';

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

function Header() {
	const router = useRouter();

	function navigate(href: string) {
		void router.push(href);
	}

	return (
		<HeaderStyles.Base>
			<Desktop navigate={navigate} />
			<Mobile navigate={navigate} />
		</HeaderStyles.Base>
	);
}

export default Header;
