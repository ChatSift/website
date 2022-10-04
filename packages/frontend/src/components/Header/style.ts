import { keyframes, css } from '@emotion/css';
import styled from '@emotion/styled';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import mediaQueries from '~/styles/breakpoints';
import type { ThemeProps } from '~/themes/theme';

export const MobileNavAnimDuration = 0.3;

export const Base = styled.header`
	position: sticky;
	top: 0;
	display: flex;
	flex-direction: column;
	background-color: ${(props: ThemeProps) => props.theme.colors.background.default};
	width: 100%;
	z-index: 10000;

	${mediaQueries.smallMin} {
		border-bottom: 1px solid ${(props: ThemeProps) => props.theme.colors.onBackground.secondary};
		padding: 16px 32px 16px 24px;
	}

	${mediaQueries.smallMax} {
		height: 64px;
	}
`;

export const DesktopNav = styled(NavigationMenu.Root)`
	display: flex;
	align-items: center;
`;

export const HorizontalList = styled(NavigationMenu.List)`
	list-style-type: none;
	padding: 0;
	display: flex;
	margin: 0;

	& > * {
		margin-right: 24px;
	}
`;

export const MobileUser = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px 16px;
	transition: transform ${MobileNavAnimDuration}s ease-in-out;
	transform: translateY(-100%) scale(0.95);
	pointer-events: none;
	background-color: ${(props: ThemeProps) => props.theme.colors.background.default};
	position: absolute;
	width: 100%;
	z-index: -1;

	&[data-mobile-open='true'] {
		transform: translateY(0);
		pointer-events: all;
	}

	${mediaQueries.smallMin} {
		display: none;
	}
`;

const mobileNavOpenAnimation = keyframes`
  from {
    max-height: 0;
  }

  to {
    max-height: 100vh;
  }
`;

const mobileNavCloseAnimation = keyframes`
  from {
    max-height: 220px;
  }

  to {
    max-height: 0;
  }
`;

const mobileNavRootCloseAnimation = keyframes`
  from {
    padding: 16px 0;
  }

  to {
    padding: 0;
  }
`;

export const MobileNav = styled(NavigationMenu.Root)`
	display: unset;
	background-color: ${(props: ThemeProps) => props.theme.colors.background.default};
	position: relative;

	${mediaQueries.smallMin} {
		display: none;
	}
`;

export const LogoBase = css`
	display: flex;
	align-items: center;
	margin-right: 24px;
`;

export const VerticalList = styled(NavigationMenu.List)`
	list-style-type: none;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	padding: 16px 0 24px;
	margin: 0 16px;
	transition: padding 0.3s ease-in-out;
	z-index: 3;
	background-color: ${(props: ThemeProps) => props.theme.colors.background.default};

	&:not([data-open]),
	&[data-open='false'] {
		padding: 0;
	}

	&[data-open='false'] {
		animation: ${mobileNavRootCloseAnimation} 0.5s ease-in-out;
	}

	&[data-open='true'] {
		border-bottom: 1px solid ${(props: ThemeProps) => props.theme.colors.onBackground.secondary};
	}
`;

export const MobileNavOpen = css`
	animation: ${mobileNavOpenAnimation} ease-out;
`;

export const MobileNavClosed = css`
	&:not([data-open]),
	&[data-open='false'] {
		max-height: 0;
	}

	&[data-open='false'] {
		animation: ${mobileNavCloseAnimation} ease-out;
	}
`;

export const List = styled.ul`
	list-style-type: none;
	padding: 0;
	display: flex;
	margin: 0;

	${mediaQueries.smallMax} {
		display: none;
	}
`;

export const Item = styled.li`
	display: flex;
	align-items: center;
	margin-right: 24px;
`;

const MobileNavItemShow = keyframes`
  from {
    transform: scale(0.95) translateY(-100%);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const MobileNavItemHide = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0.95) translateY(-100%);
    opacity: 0;
  }
`;

export const MobileNavItem = styled(NavigationMenu.Item)`
	&:not(:last-child) {
		margin-bottom: 12px;
	}
`;

export const MobileLink = styled.a`
	padding: 12px 16px;
	color: ${(props) => props.theme.colors.text.primary};
	background-color: ${(props) => props.theme.colors.onBackground.tertiary};
	border-radius: 4px;
	cursor: pointer;
	display: block;

	&[data-open='true'] {
		transform: scale(0.95);
		opacity: 0;
		animation: ${MobileNavItemShow} ${MobileNavAnimDuration}s ease-out;
	}

	&:not([data-open]),
	&[data-open='false'] {
		transform: scale(1);
		opacity: 1;
	}

	&[data-open='false'] {
		animation: ${MobileNavItemHide} ${MobileNavAnimDuration}s ease-out;
	}

	animation-fill-mode: forwards !important;
	@media (prefers-reduced-motion) {
		& {
			transform: none !important;
			opacity: 1 !important;
		}
	}
`;

export const ItemNoMobile = styled(NavigationMenu.Item)`
	align-items: center;
	display: none;

	${mediaQueries.smallMin} {
		display: flex;
	}
`;

export const HamburgerIcon = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin-left: auto;
	padding: 8px;
	background-color: ${(props: ThemeProps) => props.theme.colors.background.default};

	${mediaQueries.smallMin} {
		display: none;
	}
`;

export const AuthDesktop = styled(ItemNoMobile)`
	margin-left: auto;
	gap: 24px;
`;

export const LogoText = styled.h1`
	font-weight: 550;
	font-size: 22px;
	margin: 0 0 0 8px;
	color: ${(props) => props.theme.colors.text.primary};
`;

export const Link = styled.a`
	color: ${(props: ThemeProps) => props.theme.colors.text.secondary};
	text-decoration: none;
	font-weight: 450;
	font-size: 18px;
	cursor: pointer;

	&:hover {
		color: ${(props: ThemeProps) => props.theme.colors.text.primary};
	}
`;
