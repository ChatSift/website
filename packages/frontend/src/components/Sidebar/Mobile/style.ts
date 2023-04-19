import { animated } from 'react-spring';
import { styled, theme } from '~/stitches/stitches.config';

const SidebarAnimatedDiv = styled(animated.div, {
	variants: {
		isMobile: {
			false: {
				display: 'none !important',
			},
		},
	},
});

export const Backdrop = styled(SidebarAnimatedDiv, {
	zIndex: 15_000,
	position: 'fixed',
	left: 0,
	top: 0,
	width: '100vw',
	height: '100vh',
	backgroundColor: '#000',
});

export const MainContent = styled('div', {
	displayFlex: 'column',
	gap: theme.space.lg,
	padding: theme.space.xl,
});

export const MobileUser = styled('div', {
	displayFlex: 'row',
	alignItems: 'center',
	gap: theme.space.lg,
	justifyContent: 'space-between',
	backgroundColor: theme.colors.bgBase,
	width: '100%',
	zIndex: -1,
	borderTopWidth: theme.borderWidths.thin,
	borderTopStyle: theme.borderStyles.normal,
	borderTopColor: theme.colors.onBgSecondary,
	padding: theme.space.lg,
});

export const Menu = styled(SidebarAnimatedDiv, {
	touchAction: 'none',
	position: 'fixed',
	left: 0,
	top: 0,
	maxWidth: '80vw',
	width: 300,
	height: '100vh',
	zIndex: 16_000,
	displayFlex: 'column',
	justifyContent: 'space-between',
	backgroundColor: theme.colors.bgBase,
	borderRightWidth: theme.borderWidths.thin,
	borderRightStyle: theme.borderStyles.normal,
	borderRightColor: theme.colors.onBgSecondary,
});
