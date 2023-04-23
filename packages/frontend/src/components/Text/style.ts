import { styled, theme } from '~/stitches/stitches.config';

export const Text = styled('p', {
	variants: {
		kind: {
			big: {
				fontSize: theme.fontSizes.huge,
			},
			title: {
				fontSize: theme.fontSizes.five,
			},
			subtitle: {
				fontSize: theme.fontSizes.four,
			},
			heading3: {
				fontSize: theme.fontSizes.four,
				lineHeight: theme.lineHeights.three,
			},
			heading4: {
				fontSize: theme.fontSizes.three,
				lineHeight: theme.lineHeights.two,
			},
			body: {
				fontSize: theme.fontSizes.two,
				lineHeight: theme.lineHeights.two,
			},
			caption: {
				fontSize: theme.fontSizes.one,
				lineHeight: theme.lineHeights.one,
			},
		},

		color: {
			primary: {
				color: theme.colors.textPrimary,
			},
			secondary: {
				color: theme.colors.textSecondary,
			},
		},

		weight: {
			thin: {
				fontWeight: theme.fontWeights.thin,
			},
			medium: {
				fontWeight: theme.fontWeights.medium,
			},
			bold: {
				fontWeight: theme.fontWeights.bold,
			},
		},
	},

	defaultVariants: {
		kind: 'body',
		color: 'secondary',
		weight: 'thin',
	},
});
