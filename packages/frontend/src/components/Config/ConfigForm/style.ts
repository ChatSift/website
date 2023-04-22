import { styled, theme } from '~/stitches/stitches.config';

export const DirtyBar = styled('div', {
	position: 'absolute',
	justifyContent: 'space-between',
	alignItems: 'center',
	borderThin: theme.colors.onBgSecondary,
	borderRadius: theme.radii.lg,
	backgroundColor: theme.colors.bgCard,
	paddingX: theme.space.lg,
	paddingY: theme.space.sm,
	marginTop: 'auto',

	variants: {
		margin: {
			small: {
				bottom: theme.space.lg,
				left: theme.space.lg,
				right: theme.space.lg,
			},
			large: {
				bottom: theme.space.xl,
				left: theme.space.xl,
				right: theme.space.xl,
			},
		},

		isVisible: {
			true: {
				displayFlex: 'row',
			},
			false: {
				display: 'none',
			},
		},
	},
});

export const DirtyBarButtons = styled('div', {
	displayFlex: 'row',
	gap: theme.space.sm,
});

export const SupportLink = styled('a', {
	color: theme.colors.miscAccent,
	textDecoration: 'underline',
});
