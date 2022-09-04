import type { GetDiscordAuthMeResult } from '@chatsift/website-api/dist/routes/auth/discordAuthMe';
import { useRouter } from 'next/router';

import type React from 'react';
import Cookies from 'universal-cookie';
import * as HeaderStyles from './style';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import type { APIError } from '../../utils/fetch';
import * as Button from '../Button';
import LoggedInUser from '../LoggedInUser';
import SvgChatSift from '~/svg/chatsift';

interface HeaderLink {
	name: string;
	href: string;
	external: boolean;
}

const headerItems: HeaderLink[] = [
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

function HeaderAuth({
	error,
	isLoading,
	data,
}: {
	error: APIError | null;
	isLoading: boolean;
	data: GetDiscordAuthMeResult | undefined;
}) {
	if (isLoading) {
		return <>Loading...</>;
	}

	if (error?.payload?.statusCode === 401) {
		return (
			<HeaderStyles.LogIn
				href={`${process.env.NEXT_PUBLIC_API_URL!}/auth/v1/discord?redirect_uri=${process.env.NEXT_PUBLIC_SITE_URL!}`}
			>
				Login
			</HeaderStyles.LogIn>
		);
	}

	if (error || !data) {
		return <>Error</>;
	}

	function logOut() {
		const cookies = new Cookies(document.cookie);
		cookies.remove('access_token');
		location.reload();
	}

	return (
		<>
			<Button.Ghost onClick={logOut}>Logout</Button.Ghost>
			<LoggedInUser user={data} />
		</>
	);
}

function Header() {
	const router = useRouter();
	const { isLoading, data, error } = useLoggedInUser();

	function navigate(e: React.MouseEvent, href: string) {
		e.preventDefault();
		void router.push(href);
	}

	return (
		<HeaderStyles.Base>
			<HeaderStyles.List>
				<HeaderStyles.Item>
					<SvgChatSift />
					<HeaderStyles.LogoText>Chatsift</HeaderStyles.LogoText>
				</HeaderStyles.Item>
				{headerItems.map((item) => (
					<HeaderStyles.Item key={item.href}>
						<HeaderStyles.Link onClick={(e) => navigate(e, item.href)} href={item.href}>
							{item.name}
						</HeaderStyles.Link>
					</HeaderStyles.Item>
				))}
				{(error === null || error.payload?.statusCode === 401) && (
					<HeaderStyles.Auth>
						<HeaderAuth isLoading={isLoading} error={error} data={data} />
					</HeaderStyles.Auth>
				)}
			</HeaderStyles.List>
		</HeaderStyles.Base>
	);
}

export default Header;
