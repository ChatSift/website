import { useTheme } from '@emotion/react';
import type { SvgProps } from '~/svg/svgProps';

function SvgDarkTheme({ themeColor }: SvgProps) {
	const theme = useTheme();

	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z"
				fill={themeColor(theme)}
			/>
			<path
				d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z"
				fill={themeColor(theme)}
			/>
			<path
				d="M6.47094 5.44867L6.5392 6.65167C6.6925 9.35355 7.80352 12.0462 9.88315 14.146C11.9638 16.1969 14.6471 17.3175 17.3582 17.4708L18.5616 17.5388L17.6634 18.3426C14.3261 21.3292 9.20497 21.2114 5.99703 18.0141L5.99586 18.013C2.79855 14.805 2.68083 9.68388 5.66741 6.34657L6.47094 5.44867Z"
				fill={themeColor(theme)}
			/>
		</svg>
	);
}

export default SvgDarkTheme;
