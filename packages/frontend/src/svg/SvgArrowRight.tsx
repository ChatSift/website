import { useTheme } from '@emotion/react';
import type { SvgProps } from '~/svg/svgProps';

function SvgArrowRight({ themeColor }: SvgProps) {
	const theme = useTheme();

	return (
		<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M15.5234 8.05859L9.89844 13.6836C9.6875 13.8945 9.40625 14 9.125 14C8.80859 14 8.52734 13.8945 8.31641 13.6836C7.85938 13.2617 7.85938 12.5234 8.31641 12.1016L12.0078 8.375H1.25C0.617188 8.375 0.125 7.88281 0.125 7.25C0.125 6.65234 0.617188 6.125 1.25 6.125H12.0078L8.31641 2.43359C7.85938 2.01172 7.85938 1.27344 8.31641 0.851562C8.73828 0.394531 9.47656 0.394531 9.89844 0.851562L15.5234 6.47656C15.9805 6.89844 15.9805 7.63672 15.5234 8.05859Z"
				fill={themeColor(theme)}
			/>
		</svg>
	);
}

export default SvgArrowRight;
