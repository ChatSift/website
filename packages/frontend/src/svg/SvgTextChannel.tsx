import { useTheme } from '@emotion/react';
import type { SvgProps } from '~/svg/svgProps';

function SvgTextChannel({ className, themeColor }: SvgProps) {
	const theme = useTheme();

	return (
		<svg
			width="107"
			height="120"
			viewBox="0 0 107 120"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M26.4381 32L30.9611 0H45.1278L40.6049 32H71.2995L75.8225 0H89.9892L85.4663 32H107V45.44H83.5666L79.4508 74.56H107V88H77.5511L73.0282 120H58.8615L63.3844 88L32.6897 88L28.1668 120H14.0001L18.523 88H2.44784e-06V74.56H20.4226L24.5385 45.44H2.44784e-06L0 32H26.4381ZM38.7052 45.44L34.5893 74.56H65.284L69.3999 45.44L38.7052 45.44Z"
				fill={themeColor(theme)}
			/>
		</svg>
	);
}

export default SvgTextChannel;
