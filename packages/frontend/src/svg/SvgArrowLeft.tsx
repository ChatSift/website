import { useTheme } from '@emotion/react';
import type { SvgProps } from '~/svg/svgProps';

function SvgArrowLeft({ themeColor }: SvgProps) {
	const theme = useTheme();

	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path fill={themeColor(theme)} d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
		</svg>
	);
}

export default SvgArrowLeft;
