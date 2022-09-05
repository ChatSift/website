import type { Theme } from '@emotion/react';

const light: Theme = {
	colors: {
		accent: '#2f8fee',
		onBackground: {
			primary: '#1E284F40',
			secondary: 'rgba(29, 39, 78, 0.15)',
			tertiary: '#1E284F0D',
		},
		text: {
			primary: '#1d274e',
			secondary: 'rgba(29, 39, 78, 0.75)',
			disabled: '#1E284F80',
		},
		background: {
			default: '#F1F2F5',
			card: '#FFFFFF',
		},
	},
};

export default light;
