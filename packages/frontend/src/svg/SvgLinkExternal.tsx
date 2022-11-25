import { useTheme } from '@emotion/react';
import type { SvgProps } from '~/svg/svgProps';

function SvgLinkExternal({ themeColor }: SvgProps) {
	const theme = useTheme();

	return (
		<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.33325 17.59L15.9233 7H9.33325V5H19.3333V15H17.3333V8.41L6.74325 19L5.33325 17.59Z"
				fill={themeColor(theme)}
			/>
		</svg>
	);
}

export default SvgLinkExternal;
