import styled from '@emotion/styled';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import type { ThemeProps } from '../../themes/theme';
import LinkElement from '../Link';

export const Base = styled(NavigationMenu.Root)`
	padding: 16px 32px 16px 24px;
	border-bottom: 1px solid ${(props: ThemeProps) => props.theme.colors.onBackground.secondary};
`;

export const List = styled(NavigationMenu.List)`
	list-style-type: none;
	padding: 0;
	display: flex;
	margin: 0;
`;

export const Item = styled(NavigationMenu.Item)`
	display: flex;
	align-items: center;
	margin-right: 24px;
`;

export const Auth = styled(NavigationMenu.Item)`
	display: flex;
	align-items: center;
	margin-left: auto;
	gap: 24px;
`;

export const LogIn = styled(LinkElement)`
	font-size: 18px;
	text-underline: none;
	color: ${(props) => props.theme.colors.text.secondary};
`;

export const LogoText = styled.span`
	font-weight: 550;
	font-size: 22px;
	margin-left: 8px;
	color: ${(props) => props.theme.colors.text.primary};
`;

export const Link = styled(NavigationMenu.Link)`
	color: ${(props: ThemeProps) => props.theme.colors.text.secondary};
	text-decoration: none;
	font-weight: 450;
	font-size: 18px;

	&:hover {
		color: ${(props: ThemeProps) => props.theme.colors.text.primary};
	}
`;
