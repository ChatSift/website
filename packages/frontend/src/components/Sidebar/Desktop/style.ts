import { styled, theme } from '~/stitches/stitches.config';

export const NavMenu = styled('nav', {
	width: 300,
	borderRightWidth: theme.borderWidths.thin,
	borderRightStyle: theme.borderStyles.normal,
	borderRightColor: theme.colors.onBgSecondary,
	padding: theme.space.xl,
	flexShrink: 0,

	variants: {
		visible: {
			true: {
				displayFlex: 'column',
			},
			false: {
				display: 'none',
			},
		},
	},
});
