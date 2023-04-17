import { styled, theme } from '~/stitches/stitches.config';
import SvgSearch from '~/svg/SvgSearch';

export const Icon = styled(SvgSearch, {
	position: 'absolute',
	top: '50%',
	translate: '0 -50%',
	right: theme.space.lg,
	color: theme.colors.textSecondary,
});

export const SearchField = styled('input', {
	width: '100%',
	fontWeight: theme.fontWeights.thin,
	fontSize: theme.fontSizes.two,
	flex: '1 1 auto',
	color: theme.colors.textPrimary,
	backgroundColor: theme.colors.onBgTertiary,
	borderWidth: theme.borderWidths.thin,
	borderStyle: theme.borderStyles.normal,
	borderColor: theme.colors.onBgSecondary,
	borderRadius: theme.radii.lg,
	padding: `${theme.space.md} ${theme.space.huge} ${theme.space.md} ${theme.space.lg}`,

	'&::placeholder': {
		color: theme.colors.textSecondary,
	},

	'&:focus': {
		outline: 'none',
		borderWidth: theme.borderWidths.thin,
		borderStyle: theme.borderStyles.normal,
		borderColor: theme.colors.textPrimary,

		'&::placeholder': {
			color: theme.colors.textPrimary,
		},

		[`${Icon}`]: {
			color: theme.colors.textPrimary,
		},
	},

	'&[disabled]': {
		opacity: 0.5,
		cursor: 'not-allowed',
	},
});

export const SearchContainer = styled('div', {
	position: 'relative',

	[`${SearchField}:focus + ${Icon}`]: {
		color: theme.colors.textPrimary,
	},
});
