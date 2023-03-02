import { createTheme } from '~/stitches/stitches.config';

export const lightTheme = createTheme({
	colors: {
		textPrimary: '#1d274e',
		textSecondary: 'rgba(29, 39, 78, 0.75)',

		bgBase: '#F1F2F5',
		bgCard: '#FFFFFF',

		onBgPrimary: '#1E284F40',
		onBgSecondary: 'rgba(29, 39, 78, 0.15)',
		onBgTertiary: '#1E284F0D',
	},
});
