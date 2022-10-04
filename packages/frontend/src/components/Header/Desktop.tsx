import { default as NextLink } from 'next/link';
import React, { useRef } from 'react';
import type { AriaLinkOptions } from 'react-aria';
import { useLink } from 'react-aria';
import * as LoggedInUser from '../LoggedInUser';
import Logo from './Logo';
import * as HeaderStyles from './style';
import type { HeaderLink } from './index';
import { headerItems } from './index';

function DesktopLink({ item, ...props }: AriaLinkOptions & { item: HeaderLink }) {
	const ref = useRef(null);
	const { linkProps } = useLink(props, ref);

	return (
		<NextLink href={item.href}>
			<HeaderStyles.Link {...linkProps} tabIndex={0} href={item.href}>
				{item.name}
			</HeaderStyles.Link>
		</NextLink>
	);
}

function Desktop({ navigate }: { navigate(href: string): void }) {
	return (
		<HeaderStyles.List>
			<li>
				<Logo />
			</li>
			<HeaderStyles.Item>
				<HeaderStyles.DesktopNav>
					<HeaderStyles.HorizontalList>
						{headerItems.map((item) => (
							<HeaderStyles.ItemNoMobile key={item.href}>
								<DesktopLink onPress={() => navigate(item.href)} item={item} />
							</HeaderStyles.ItemNoMobile>
						))}
					</HeaderStyles.HorizontalList>
				</HeaderStyles.DesktopNav>
			</HeaderStyles.Item>
			<HeaderStyles.AuthDesktop>
				<LoggedInUser.Desktop />
			</HeaderStyles.AuthDesktop>
		</HeaderStyles.List>
	);
}

export default Desktop;
