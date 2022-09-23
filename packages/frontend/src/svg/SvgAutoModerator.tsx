import { useTheme } from '@emotion/react';

function SvgAutoModerator({ width, height }: { width?: number; height?: number }) {
	const theme = useTheme();

	return (
		<svg width={width ?? 24} height={height ?? 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4.5 4.5V15L12 21L19.5 15V4.5H4.5Z" stroke="#318EEE" strokeWidth="1.875" strokeLinejoin="round" />
			<path
				d="M9 9V12.8182L12 15L15 12.8182V9H9Z"
				fill={theme.colors.text.primary}
				stroke={theme.colors.text.primary}
				strokeWidth="1.875"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default SvgAutoModerator;
