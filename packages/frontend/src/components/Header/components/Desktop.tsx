import React from 'react';
import type { AriaLinkOptions } from 'react-aria';
import type { HeaderLink } from '../index';
import { headerItems } from '../index';
import * as Styles from '../style';
import Logo from './Logo';
import * as LoggedInUser from '~/components/LoggedInUser';

function DesktopLink({ item, ...props }: AriaLinkOptions & { item: HeaderLink }) {
	return (
		<Styles.Link {...props} href={item.href}>
			{item.name}
		</Styles.Link>
	);
}

function Desktop() {
	return (
		<Styles.List>
			<li>
				<Logo />
			</li>
			<Styles.Item>
				<Styles.DesktopNav>
					<Styles.HorizontalList>
						{headerItems.map((item) => (
							<Styles.ItemNoMobile key={item.href}>
								<DesktopLink item={item} />
							</Styles.ItemNoMobile>
						))}
					</Styles.HorizontalList>
				</Styles.DesktopNav>
			</Styles.Item>
			<Styles.AuthDesktop>
				<LoggedInUser.Desktop />
			</Styles.AuthDesktop>
		</Styles.List>
	);
}

export default Desktop;
