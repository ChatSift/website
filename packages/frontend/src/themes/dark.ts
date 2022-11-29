import type { Theme } from '@emotion/react';

const dark: Theme = {
	name: 'dark',
	colors: {
		accent: '#2f8fee',
		onBackground: {
			primary: '#F4F4FD33',
			secondary: '#F4F4FD1A',
			tertiary: '#F4F4FD0D',
		},
		danger: '#ff5052',
		text: {
			currentColor: 'currentColor',
			primary: '#F6F6FB',
			secondary: '#F6F6FBB2',
			disabled: '#F5F5FC66',
			onAccent: '#ffffff',
		},
		background: {
			default: '#151519',
			card: '#1C1C21',
		},
	},
};

export default dark;
