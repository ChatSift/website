import { useTheme } from '@emotion/react';
import type { SvgProps } from '~/svg/svgProps';

function SvgTrashBin({ className, themeColor }: SvgProps) {
	const theme = useTheme();

	return (
		<svg
			width="106"
			height="125"
			viewBox="0 0 106 125"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M37 4.5C37 2.01472 39.0147 0 41.5 0H63.5C65.9853 0 68 2.01472 68 4.5V4.5C68 6.98528 70.0147 9 72.5 9H99.5C103.09 9 106 11.9101 106 15.5V16.5C106 19.5376 103.538 22 100.5 22V22C97.4624 22 95 24.4624 95 27.5V117C95 121.418 91.4183 125 87 125H17C12.5817 125 9 121.418 9 117V26.5C9 24.0147 6.98528 22 4.5 22V22C2.01472 22 0 19.9853 0 17.5V15.5C0 11.9101 2.91015 9 6.5 9H32.5C34.9853 9 37 6.98528 37 4.5V4.5ZM26 30.5C26 27.4624 23.5376 25 20.5 25V25C17.4624 25 15 27.4624 15 30.5V114.5C15 117.538 17.4624 120 20.5 120V120C23.5376 120 26 117.538 26 114.5V30.5ZM42 30.5C42 27.4624 39.5376 25 36.5 25V25C33.4624 25 31 27.4624 31 30.5V114.5C31 117.538 33.4624 120 36.5 120V120C39.5376 120 42 117.538 42 114.5V30.5ZM47 30.5C47 27.4624 49.4624 25 52.5 25V25C55.5376 25 58 27.4624 58 30.5V114.5C58 117.538 55.5376 120 52.5 120V120C49.4624 120 47 117.538 47 114.5V30.5ZM74 30.5C74 27.4624 71.5376 25 68.5 25V25C65.4624 25 63 27.4624 63 30.5V114.5C63 117.538 65.4624 120 68.5 120V120C71.5376 120 74 117.538 74 114.5V30.5ZM79 30.5C79 27.4624 81.4624 25 84.5 25V25C87.5376 25 90 27.4624 90 30.5V114.5C90 117.538 87.5376 120 84.5 120V120C81.4624 120 79 117.538 79 114.5V30.5Z"
				fill={themeColor(theme)}
			/>
		</svg>
	);
}

export default SvgTrashBin;