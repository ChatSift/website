import type React from 'react';
import { useRef } from 'react';
import { AriaLinkOptions, useLink } from 'react-aria';
import { headerItems, HeaderLink } from './index';
import Logo from './Logo';
import * as HeaderStyles from './style';
import * as LoggedInUser from '../LoggedInUser';

function DesktopLink({ item, ...props }: { item: HeaderLink } & AriaLinkOptions) {
	const ref = useRef(null);
	const { linkProps } = useLink(props, ref);

	return (
		<HeaderStyles.Link {...linkProps} tabIndex={0} data-href={item.href}>
			{item.name}
		</HeaderStyles.Link>
	);
}

function Desktop({ navigate }: { navigate: (href: string) => void }) {
	return (
		<HeaderStyles.List>
			<Logo as="li" />
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
