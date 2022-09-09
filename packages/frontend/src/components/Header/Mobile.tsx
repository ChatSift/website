import React, { useEffect, useRef, useState } from 'react';
import { AriaLinkOptions, useLink } from 'react-aria';
import { headerItems, HeaderLink } from './index';
import Logo from './Logo';
import * as HeaderStyles from './style';
import { MobileNavAnimDuration } from './style';
import * as Button from '../Button';
import * as LoggedInUser from '../LoggedInUser';
import SvgHamburger from '~/svg/SvgHamburger';

interface MobileLinkProps {
	item: HeaderLink;
	mobileNavOpen: boolean | undefined;
	index: number;
	onClick: (item: HeaderLink) => void;
}

const linkDelay = 0.1;

function MobileLink({ item, mobileNavOpen, index, onClick, ...props }: MobileLinkProps & AriaLinkOptions) {
	const ref = useRef<HTMLAnchorElement>(null);
	const { linkProps } = useLink({ ...props, onPress: () => onClick(item) }, ref);

	return (
		<HeaderStyles.MobileLink
			{...linkProps}
			key={item.href}
			data-open={mobileNavOpen}
			style={{ animationDelay: `${(headerItems.length - index) * linkDelay}s` }}
			ref={ref}
			tabIndex={0}
		>
			{item.name}
		</HeaderStyles.MobileLink>
	);
}

function Mobile({ navigate }: { navigate: (href: string) => void }) {
	const animationDuration = headerItems.length * linkDelay + MobileNavAnimDuration;
	const [mobileNavOpen, setMobileNavOpen] = useState<boolean | undefined>(undefined);
	const [hideList, setHideList] = useState(false);

	function navigateInner(item: HeaderLink) {
		setMobileNavOpen(false);
		navigate(item.href);
	}

	useEffect(() => {
		if (mobileNavOpen !== true) {
			const timeOut = setTimeout(() => setHideList(true), animationDuration * 1000);

			return () => clearTimeout(timeOut);
		}

		setHideList(false);
	}, [animationDuration, mobileNavOpen]);

	return (
		<HeaderStyles.MobileNav data-open={mobileNavOpen} orientation="vertical">
			<HeaderStyles.HamburgerIcon>
				<Logo as="div" />
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
			</HeaderStyles.HamburgerIcon>
			<HeaderStyles.VerticalList
				className={mobileNavOpen ? HeaderStyles.MobileNavOpen : HeaderStyles.MobileNavClosed}
				style={{ animationDuration: `${animationDuration}s`, ...(hideList ? { display: 'none' } : {}) }}
				data-open={mobileNavOpen}
				id="menu"
			>
				{headerItems.map((item, i) => (
					<HeaderStyles.MobileNavItem key={item.href}>
						<MobileLink
							item={item}
							index={i}
							mobileNavOpen={mobileNavOpen}
							data-href={item.href}
							onClick={(item) => navigateInner(item)}
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
