import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import { stitchesMediaQueries } from '~/styles/breakpoints';
import { dashboardPadding } from '~/utils/constants';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
	theme: {
		colors: {
			textPrimary: '#F6F6FB',
			textSecondary: '#F6F6FBB2',
			textOnAccent: '#ffffff',
			textDisabled: '#F5F5FC66',

			bgBase: '#151519',
			bgCard: '#1C1C21',

			onBgPrimary: '#F4F4FD33',
			onBgSecondary: '#F4F4FD1A',
			onBgTertiary: '#F4F4FD0D',

			miscAccent: '#2f8fee',
			miscDanger: '#ff5052',
		},
		sizes: {
			dropdownIcon: '18px',
			smallImage: '24px',
			mediumImage: '32px',
			image: '48px',
			largeImage: '64px',
		},
		radii: {
			sm: '4px',
			md: '6px',
			lg: '8px',
			full: '1337px',
			rounded: '100%',
		},
		borderWidths: {
			thin: '1px',
		},
		borderStyles: {
			normal: 'solid',
		},
		fontSizes: {
			zero: '14px',
			one: '16px',
			two: '18px',
			three: '22px',
			four: '24px',
			five: '32px',
			huge: '100px',
		},
		lineHeights: {
			one: '18px',
			two: '24px',
			three: '32px',
		},
		fonts: {
			normal: "Author-Variable, 'Inter', sans-serif",
		},
		fontWeights: {
			thin: 450,
			medium: 500,
			bold: 550,
		},
		space: {
			none: '0',
			xxs: '4px',
			xs: '6px',
			sm: '8px',
			md: '12px',
			lg: '16px',
			xl: '24px',
			xxl: '32px',
			huge: '48px',
			dashboardPadding: `${dashboardPadding}px`,
		},
	},
	media: stitchesMediaQueries,

	utils: {
		borderThin: (borderColor: Stitches.ScaleValue<'colors'> | 'transparent') => ({
			// eslint-disable-next-line @typescript-eslint/no-base-to-string
			border: `$borderWidths$thin $borderStyles$normal ${borderColor}`,
		}),
		borderTopThin: (borderColor: Stitches.ScaleValue<'colors'> | 'transparent') => ({
			// eslint-disable-next-line @typescript-eslint/no-base-to-string
			borderTop: `$borderWidths$thin $borderStyles$normal ${borderColor}`,
		}),
		borderBottomThin: (borderColor: Stitches.ScaleValue<'colors'> | 'transparent') => ({
			// eslint-disable-next-line @typescript-eslint/no-base-to-string
			borderBottom: `$borderWidths$thin $borderStyles$normal ${borderColor}`,
		}),
		displayFlex: (value: 'column' | 'row') => ({
			display: 'flex',
			flexDirection: value,
		}),
		marginX: (value: Stitches.ScaleValue<'space'>) => ({
			marginLeft: value,
			marginRight: value,
		}),
		marginY: (value: Stitches.ScaleValue<'space'>) => ({
			marginTop: value,
			marginBottom: value,
		}),
		paddingX: (value: Stitches.ScaleValue<'space'>) => ({
			paddingLeft: value,
			paddingRight: value,
		}),
		paddingY: (value: Stitches.ScaleValue<'space'>) => ({
			paddingTop: value,
			paddingBottom: value,
		}),
	},
});

// console.log(getCssText());

export const globalStyles = globalCss({
	body: {
		backgroundColor: theme.colors.bgBase,
	},

	// snitches get Stitches
	"[class*='css-']": {
		outline: '2px solid red',
	},
});
