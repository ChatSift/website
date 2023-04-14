import React, { useEffect, useState } from 'react';
import type { AriaLinkOptions } from 'react-aria';
import { headerItems, isMobile } from '../index';
import type { HeaderLink } from '../index';
import * as Styles from '../style';
import Logo from './Logo';
import Button from '~/components/Button';
import * as LoggedInUser from '~/components/LoggedInUser';
import SvgClose from '~/svg/SvgClose';
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
		<Styles.MobileLink
			{...props}
			href={href}
			key={item.href}
			open={mobileNavOpen}
			style={{ animationDelay: `${(headerItems.length - index) * linkDelay}s` }}
			onClick={onClick}
		>
			{item.name}
		</Styles.MobileLink>
	);
}

function Mobile() {
	const animationDuration = headerItems.length * linkDelay + Styles.mobileNavAnimDuration;
	const [mobileNavOpen, setMobileNavOpen] = useState<boolean | undefined>(false);
	const [hideList, setHideList] = useState(false);

	useEffect(() => {
		if (mobileNavOpen !== true) {
			const timeOut = setTimeout(() => setHideList(true), animationDuration * 1_000);

			return () => clearTimeout(timeOut);
		}

		setHideList(false);
	}, [animationDuration, mobileNavOpen]);

	return (
		<Styles.MobileNav
			mobile={{
				'@initial': true,
				'@medium': false,
			}}
			orientation="vertical"
		>
			<Styles.HeaderContent visible={isMobile}>
				<Logo />
				<Button.Ghost
					style={{ padding: 12 }}
					onPress={() => setMobileNavOpen(!(mobileNavOpen ?? false))}
					title="open menu"
					aria-expanded={mobileNavOpen}
					aria-controls="menu"
					aria-haspopup="true"
				>
					{mobileNavOpen ? (
						<SvgClose themeColor={(theme) => theme.colors.text.secondary} />
					) : (
						<SvgHamburger themeColor={(theme) => theme.colors.text.secondary} />
					)}
				</Button.Ghost>
			</Styles.HeaderContent>
			<Styles.VerticalList
				// className={mobileNavOpen ? Styles.MobileNavOpen : Styles.MobileNavClosed}
				style={{ animationDuration: `${animationDuration}s`, ...(hideList ? { display: 'none' } : {}) }}
				open={mobileNavOpen}
				id="menu"
			>
				{headerItems.map((item, index) => (
					<Styles.MobileNavItem key={item.href}>
						<MobileLink
							item={item}
							index={index}
							mobileNavOpen={mobileNavOpen}
							data-href={item.href}
							href={item.href}
							onClick={() => setMobileNavOpen(false)}
						/>
					</Styles.MobileNavItem>
				))}
			</Styles.VerticalList>
			<Styles.MobileUser
				open={mobileNavOpen}
				mobile={{
					'@initial': true,
					'@medium': false,
				}}
				visible={!hideList}
			>
				<LoggedInUser.Mobile />
			</Styles.MobileUser>
		</Styles.MobileNav>
	);
}

export default Mobile;
