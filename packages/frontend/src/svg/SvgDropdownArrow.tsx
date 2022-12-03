import { useTheme } from '@emotion/react';
import type { SvgProps } from '~/svg/svgProps';

function SvgDropdownArrow({ themeColor }: SvgProps) {
	const theme = useTheme();

	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
			<path fill={themeColor(theme)} d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
		</svg>
	);
}

export default SvgDropdownArrow;
