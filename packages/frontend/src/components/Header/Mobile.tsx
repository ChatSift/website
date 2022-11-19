import React, { useEffect, useState } from 'react';
import type { AriaLinkOptions } from 'react-aria';
import * as Button from '../Button';
import * as LoggedInUser from '../LoggedInUser';
import Logo from './Logo';
import { MobileNavAnimDuration } from './style';
import * as HeaderStyles from './style';
import { headerItems } from './index';
import type { HeaderLink } from './index';
import SvgHamburger from '~/svg/SvgHamburger';

type MobileLinkProps = {
	href: string;
	index: number;
	item: HeaderLink;
	mobileNavOpen: boolean | undefined;
	onClick(): void;
};

const linkDelay = 0.1;

function MobileLink({ item, mobileNavOpen, index, onClick, href, ...props }: AriaLinkOptions & MobileLinkProps) {
	return (
		<HeaderStyles.MobileLink
			{...props}
			href={href}
			key={item.href}
			data-open={mobileNavOpen}
			style={{ animationDelay: `${(headerItems.length - index) * linkDelay}s` }}
			onClick={onClick}
		>
			{item.name}
		</HeaderStyles.MobileLink>
	);
}

function Mobile() {
	const animationDuration = headerItems.length * linkDelay + MobileNavAnimDuration;
	const [mobileNavOpen, setMobileNavOpen] = useState<boolean | undefined>(undefined);
	const [hideList, setHideList] = useState(false);

	useEffect(() => {
		if (mobileNavOpen !== true) {
			const timeOut = setTimeout(() => setHideList(true), animationDuration * 1_000);

			return () => clearTimeout(timeOut);
		}

		setHideList(false);
	}, [animationDuration, mobileNavOpen]);

	return (
		<HeaderStyles.MobileNav data-open={mobileNavOpen} orientation="vertical">
			<HeaderStyles.HeaderContent>
				<Logo />
				<Button.Ghost
					style={{ padding: 0 }}
					onPress={() => setMobileNavOpen(!(mobileNavOpen ?? false))}
					title="open menu"
					aria-expanded={mobileNavOpen}
					aria-controls="menu"
					aria-haspopup="true"
				>
					<SvgHamburger />
				</Button.Ghost>
			</HeaderStyles.HeaderContent>
			<HeaderStyles.VerticalList
				className={mobileNavOpen ? HeaderStyles.MobileNavOpen : HeaderStyles.MobileNavClosed}
				style={{ animationDuration: `${animationDuration}s`, ...(hideList ? { display: 'none' } : {}) }}
				data-open={mobileNavOpen}
				id="menu"
			>
				{headerItems.map((item, index) => (
					<HeaderStyles.MobileNavItem key={item.href}>
						<MobileLink
							item={item}
							index={index}
							mobileNavOpen={mobileNavOpen}
							data-href={item.href}
							href={item.href}
							onClick={() => setMobileNavOpen(false)}
						/>
					</HeaderStyles.MobileNavItem>
				))}
			</HeaderStyles.VerticalList>
			<HeaderStyles.MobileUser data-mobile-open={mobileNavOpen} style={hideList ? { display: 'none' } : {}}>
				<LoggedInUser.Mobile />
			</HeaderStyles.MobileUser>
		</HeaderStyles.MobileNav>
	);
}

export default Mobile;
