import type { Theme } from '@emotion/react';

export type SvgProps = {
	className?: string;
	themeColor(theme: Theme): string;
};
