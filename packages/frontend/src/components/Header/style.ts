import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { RouterLink } from '~/components/Link';
import { keyframes, styled, css, theme } from '~/stitches/stitches.config';

export const mobileNavAnimDuration = 0.3;

export const Header = styled('header', {
	position: 'sticky',
	top: 0,
	displayFlex: 'column',
	backgroundColor: theme.colors.bgBase,
	width: '100%',
	zIndex: 10_000,

	variants: {
		desktop: {
			true: {
				borderBottomWidth: theme.borderWidths.thin,
				borderBottomStyle: theme.borderStyles.normal,
				borderBottomColor: theme.colors.onBgSecondary,
				paddingY: theme.space.lg,
				paddingRight: theme.space.xxl,
				paddingLeft: theme.space.xl,
				height: 'auto',
			},
			false: {
				height: 64,
			},
		},
	},
});

export const activeMobileOverride = css({
	'& > *:nth-child(1)': {
		display: 'none',
	},

	variants: {
		hideChildren: {
			true: {
				'& > *': {
					display: 'none',
				},
			},
		},
	},
});

export const DesktopNav = styled(NavigationMenu.Root, {
	display: 'flex',
	alignItems: 'center',
});

export const HorizontalList = styled(NavigationMenu.List, {
	padding: 0,
	display: 'flex',
	margin: 0,

	'& > *': {
		marginRight: theme.space.xl,
	},
});

export const MobileUser = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingX: theme.space.lg,
	paddingY: theme.space.md,
	transition: `translate ${mobileNavAnimDuration}s ease-in-out, scale ${mobileNavAnimDuration}s ease-in-out`,
	backgroundColor: theme.colors.bgBase,
	position: 'absolute',
	width: '100%',
	zIndex: -1,

	variants: {
		open: {
			true: {
				pointerEvents: 'all',
				translate: '0 0',
				scale: 1,
			},
			false: {
				pointerEvents: 'none',
				translate: '0 -100%',
				scale: 0.95,
			},
		},

		visible: {
			false: {
				display: 'none',
			},
		},

		mobile: {
			false: {
				display: 'none',
			},
		},
	},
});

export const MobileNav = styled(NavigationMenu.Root, {
	position: 'relative',
	backgroundColor: theme.colors.bgBase,

	variants: {
		mobile: {
			false: {
				display: 'none',
			},
		},
	},
});

export const Logo = styled(RouterLink, {
	display: 'flex',
	alignItems: 'center',
	marginRight: theme.space.xl,
});

const mobileNavRootCloseAnimation = keyframes({
	from: {
		paddingY: theme.space.lg,
		maxHeight: 220,
	},

	to: {
		paddingY: theme.space.none,
		maxHeight: 0,
	},
});

const mobileNavOpenAnimation = keyframes({
	from: {
		maxHeight: 0,
	},

	to: {
		maxHeight: '100vh',
	},
});

export const VerticalList = styled(NavigationMenu.List, {
	overflow: 'hidden',
	displayFlex: 'column',
	marginX: theme.space.lg,
	zIndex: 3,
	backgroundColor: theme.colors.bgBase,
	transition: 'padding 0.3s ease-in-out',

	variants: {
		open: {
			true: {
				borderBottomWidth: theme.borderWidths.thin,
				borderBottomStyle: theme.borderStyles.normal,
				borderBottomColor: theme.colors.onBgSecondary,
				paddingTop: theme.space.lg,
				paddingBottom: theme.space.xl,
				animationName: mobileNavOpenAnimation.toString(),
				animationTimingFunction: 'ease-out',
			},
			false: {
				animationName: mobileNavRootCloseAnimation.toString(),
				animationTimingFunction: 'ease-in-out',
				maxHeight: 0,
			},
		},
	},
});

export const List = styled('ul', {
	listStyleType: 'none',
	padding: 0,
	margin: 0,

	variants: {
		visible: {
			true: {
				display: 'flex',
			},
			false: {
				display: 'none',
			},
		},
	},
});

export const Item = styled('li', {
	display: 'flex',
	alignItems: 'center',
	marginRight: theme.space.xl,
});

// const MobileNavItemShow = keyframesOld`
//   from {
//     transform: scale(0.95) translateY(-100%);
//     opacity: 0;
//   }
//
//   to {
//     transform: scale(1);
//     opacity: 1;
//   }
// `;

// MobileNavItemShow in stitches form
const MobileNavItemShow = keyframes({
	from: {
		scale: 0.95,
		translate: '0 -100%',
		opacity: 0,
	},
	to: {
		scale: 1,
		translate: '0 0',
		opacity: 1,
	},
});

const MobileNavItemHide = keyframes({
	from: {
		scale: 1,
		opacity: 1,
	},

	to: {
		scale: 0.95,
		translate: '0 -100%',
		opacity: 0,
	},
});

export const MobileNavItem = styled(NavigationMenu.Item, {
	'&:not(:last-child)': {
		marginBottom: theme.space.md,
	},
});

// convert to new styled
export const MobileLink = styled(RouterLink, {
	paddingX: theme.space.lg,
	paddingY: theme.space.md,
	color: theme.colors.textPrimary,
	backgroundColor: theme.colors.onBgTertiary,
	borderRadius: theme.radii.sm,
	cursor: 'pointer',
	display: 'block',
	animationTimingFunction: 'ease-out',
	animationDuration: `${mobileNavAnimDuration}s`,
	animationFillMode: 'forwards',

	variants: {
		open: {
			true: {
				scale: 0.95,
				opacity: 0,
				animationName: MobileNavItemShow.toString(),
			},
			false: {
				scale: 1,
				opacity: 1,
				animationName: MobileNavItemHide.toString(),
			},
		},
	},
});

export const ItemNoMobile = styled(NavigationMenu.Item, {
	alignItems: 'center',

	variants: {
		mobile: {
			true: {
				display: 'none',
			},
			false: {
				display: 'flex',
			},
		},
	},
});

export const HeaderContent = styled('div', {
	alignItems: 'center',
	justifyContent: 'space-between',
	marginLeft: 'auto',
	padding: theme.space.sm,
	backgroundColor: theme.colors.bgBase,

	variants: {
		visible: {
			true: {
				display: 'flex',
			},
			false: {
				display: 'none',
			},
		},
	},
});

export const AuthDesktop = styled(ItemNoMobile, {
	marginLeft: 'auto',
	gap: theme.space.xl,
});

export const LogoText = styled('h1', {
	fontWeight: theme.fontWeights.bold,
	fontSize: theme.fontSizes.three,
	margin: 0,
	marginLeft: theme.space.sm,
	color: theme.colors.textPrimary,
});

export const Link = styled(RouterLink, {
	color: theme.colors.textSecondary,
	textDecoration: 'none',
	fontWeight: theme.fontWeights.thin,
	fontSize: theme.fontSizes.two,
	cursor: 'pointer',

	'&:hover': {
		color: theme.colors.textPrimary,
	},
});
