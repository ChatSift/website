import { Theme } from '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		name: string;
		colors: {
			text: {
				primary: string;
				secondary: string;
				disabled: string;
				onAccent: string;
			};
			onBackground: {
				primary: string;
				secondary: string;
				tertiary: string;
			};
			accent: string;
			background: {
				default: string;
				card: string;
			};
		};
	}
}

export interface ThemeProps<T = {}> extends T {
	theme: Theme;
}
