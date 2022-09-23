import { useTheme } from '@emotion/react';

function SvgModmail({ width, height }: { width?: number; height?: number }) {
	const theme = useTheme();

	return (
		<svg width={width ?? 24} height={height ?? 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect
				x="4.5"
				y="6"
				width="15"
				height="12"
				stroke={theme.colors.accent}
				strokeWidth="1.875"
				strokeLinejoin="round"
			/>
			<path
				d="M8.25 9.75L12 12.75L15.75 9.75"
				stroke={theme.colors.text.primary}
				strokeWidth="1.875"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default SvgModmail;
