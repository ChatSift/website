import { styled, theme } from '~/stitches/stitches.config';

export const Input = styled('input', {
	backgroundColor: theme.colors.onBgTertiary,
	fontWeight: theme.fontWeights.thin,
	fontSize: theme.fontSizes.two,
	color: theme.colors.textPrimary,
	borderRadius: theme.radii.lg,
	paddingY: theme.space.md,
	paddingRight: theme.space.huge,
	paddingLeft: theme.space.lg,
	borderThin: 'transparent',

	'&::placeholder': {
		color: theme.colors.textSecondary,
	},

	'&:focus::placeholder': {
		color: theme.colors.textPrimary,
	},

	variants: {
		isInvalid: {
			true: {
				borderColor: theme.colors.miscDanger,
			},
			undefined: {
				borderColor: 'transparent',

				'&:focus': {
					borderColor: theme.colors.textPrimary,
				},
			},
			false: {
				borderColor: 'transparent',

				'&:focus': {
					borderColor: theme.colors.textPrimary,
				},
			},
		},
	},
});
