import { useTheme } from '@emotion/react';

function SvgDropdownArrow() {
	const theme = useTheme();

	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M19.3125 10.6328L12.5977 17.0664C12.3867 17.2422 12.1758 17.3125 12 17.3125C11.7891 17.3125 11.5781 17.2422 11.4023 17.1016L4.65234 10.6328C4.30078 10.3164 4.30078 9.75391 4.61719 9.4375C4.93359 9.08594 5.49609 9.08594 5.8125 9.40234L12 15.3086L18.1523 9.40234C18.4688 9.08594 19.0312 9.08594 19.3477 9.4375C19.6641 9.75391 19.6641 10.3164 19.3125 10.6328Z"
				fill={theme.colors.text.disabled}
			/>
		</svg>
	);
}

export default SvgDropdownArrow;
