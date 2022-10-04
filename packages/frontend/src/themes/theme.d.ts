import type { Theme } from '@emotion/react';

declare module '@emotion/react' {
	export type Theme = {
		colors: {
			accent: string;
			background: {
				card: string;
				default: string;
			};
			onBackground: {
				primary: string;
				secondary: string;
				tertiary: string;
			};
			text: {
				disabled: string;
				onAccent: string;
				primary: string;
				secondary: string;
			};
		};
		name: string;
	}
}

export type ThemeProps<T = {}> = T & {
	theme: Theme;
}
