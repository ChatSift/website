import { theme } from '~/stitches/stitches.config';

function SvgChatSift() {
	return (
		<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M14 24V30H20L24 34L28 30H34V24"
				stroke={theme.colors.miscAccent.toString()}
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M14 16H34M18.5 21H29.5M22.5 26H25.5"
				stroke={theme.colors.textPrimary.toString()}
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default SvgChatSift;
