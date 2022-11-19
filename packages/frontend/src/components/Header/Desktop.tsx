import React from 'react';
import type { AriaLinkOptions } from 'react-aria';
import * as LoggedInUser from '../LoggedInUser';
import Logo from './Logo';
import * as HeaderStyles from './style';
import type { HeaderLink } from './index';
import { headerItems } from './index';

function DesktopLink({ item, ...props }: AriaLinkOptions & { item: HeaderLink }) {
	return (
		<HeaderStyles.Link {...props} href={item.href}>
			{item.name}
		</HeaderStyles.Link>
	);
}

function Desktop() {
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
								<DesktopLink item={item} />
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
