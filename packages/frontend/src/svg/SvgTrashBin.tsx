import { useTheme } from '@emotion/react';
import type { SvgProps } from '~/svg/svgProps';

function SvgTrashBin({ className, themeColor }: SvgProps) {
	const theme = useTheme();

	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className={className}>
			<path
				fill={themeColor(theme)}
				d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
			/>
		</svg>
	);
}

export default SvgTrashBin;
