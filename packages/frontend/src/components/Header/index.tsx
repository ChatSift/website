import type { GetDiscordAuthMeResult } from '@chatsift/website-api/dist/routes/auth/discordAuthMe';
import { useRouter } from 'next/router';

import type React from 'react';
import { useRef, useState } from 'react';
import { AriaLinkOptions, useLink } from 'react-aria';
import Cookies from 'universal-cookie';
import * as HeaderStyles from './style';
import { MobileNavAnimDuration } from './style';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import type { APIError } from '../../utils/fetch';
import * as Button from '../Button';
import * as LoggedInUser from '../LoggedInUser';
import SvgChatSift from '~/svg/chatsift';
import SvgHamburger from '~/svg/hamburger';

interface HeaderLink {
	name: string;
	href: string;
	external: boolean;
}

// NOTE: ADJUST mobileNavCloseAnimation's max-height GUESSTIMATE IF YOU ADD OR REMOVE LINKS
// Also, if possible, the above is scuffed, fix it if possible..
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
	mobile,
}: {
	error: APIError | null;
	isLoading: boolean;
	data: GetDiscordAuthMeResult | undefined;
	mobile: boolean;
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

	if (mobile) {
		return (
			<>
				<LoggedInUser.Mobile user={data} />
				<Button.Ghost onClick={logOut}>Logout</Button.Ghost>
			</>
		);
	}

	return (
		<>
			<Button.Ghost onClick={logOut}>Logout</Button.Ghost>
			<LoggedInUser.Desktop user={data} />
		</>
	);
}

interface MobileLinkProps {
	item: HeaderLink;
	mobileNavOpen: boolean | undefined;
	index: number;
	onClick: (e: React.MouseEvent, item: HeaderLink) => void;
}

function MobileLink({ item, mobileNavOpen, index, onClick, ...props }: MobileLinkProps & AriaLinkOptions) {
	const ref = useRef(null);
	const { linkProps } = useLink({ ...(props as AriaLinkOptions) }, ref);

	return (
		<HeaderStyles.MobileLink
			{...linkProps}
			key={item.href}
			data-open={mobileNavOpen}
			style={{ animationDelay: `${(headerItems.length - index) * 0.1}s` }}
			onClick={(e) => onClick(e, item)}
			ref={ref}
		>
			{item.name}
		</HeaderStyles.MobileLink>
	);
}

function Header() {
	const router = useRouter();
	const { isLoading, data, error } = useLoggedInUser();
	const [mobileNavOpen, setMobileNavOpen] = useState<boolean | undefined>(undefined);

	function navigate(e: React.MouseEvent, item: HeaderLink) {
		e.preventDefault();
		void router.push(item.href);
		setMobileNavOpen(false);
	}

	return (
		<HeaderStyles.Base>
			<HeaderStyles.List>
				<HeaderStyles.Item>
					<SvgChatSift />
					<HeaderStyles.LogoText>Chatsift</HeaderStyles.LogoText>
				</HeaderStyles.Item>
				<HeaderStyles.Item>
					<HeaderStyles.DesktopNav>
						<HeaderStyles.HorizontalList>
							{headerItems.map((item) => (
								<HeaderStyles.ItemNoMobile key={item.href}>
									<HeaderStyles.Link onClick={(e) => navigate(e, item)} href={item.href}>
										{item.name}
									</HeaderStyles.Link>
								</HeaderStyles.ItemNoMobile>
							))}
						</HeaderStyles.HorizontalList>
					</HeaderStyles.DesktopNav>
				</HeaderStyles.Item>
				{(error === null || error.payload?.statusCode === 401) && (
					<HeaderStyles.AuthDesktop>
						<HeaderAuth isLoading={isLoading} error={error} data={data} mobile={false} />
					</HeaderStyles.AuthDesktop>
				)}
				<HeaderStyles.HamburgerIcon>
					<Button.Ghost
						style={{ padding: 0 }}
						onClick={() => setMobileNavOpen(!(mobileNavOpen ?? false))}
						title="open menu"
					>
						<SvgHamburger />
					</Button.Ghost>
				</HeaderStyles.HamburgerIcon>
			</HeaderStyles.List>
			<HeaderStyles.MobileNav data-open={mobileNavOpen} orientation="vertical">
				<HeaderStyles.VerticalList
					className={mobileNavOpen ? HeaderStyles.MobileNavOpen : HeaderStyles.MobileNavClosed}
					style={{ animationDuration: `${headerItems.length * 0.2 + MobileNavAnimDuration}s` }}
					data-open={mobileNavOpen}
				>
					{headerItems.map((item, i) => (
						<HeaderStyles.MobileNavItem key={item.href}>
							<MobileLink
								item={item}
								index={i}
								mobileNavOpen={mobileNavOpen}
								data-href={item.href}
								onClick={(e, item) => navigate(e, item)}
							/>
						</HeaderStyles.MobileNavItem>
					))}
				</HeaderStyles.VerticalList>
			</HeaderStyles.MobileNav>
			<HeaderStyles.MobileUser data-mobile-open={mobileNavOpen}>
				<HeaderAuth isLoading={isLoading} error={error} data={data} mobile />
			</HeaderStyles.MobileUser>
		</HeaderStyles.Base>
	);
}

export default Header;
