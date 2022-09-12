import { useTheme } from '@emotion/react';

function SvgThemeSeparator() {
	const theme = useTheme();

	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M7.18359 21.25C7.04297 21.25 6.90234 21.2148 6.76172 21.1445C6.375 20.8984 6.23438 20.4062 6.48047 19.9844L16.043 3.67188C16.2539 3.28516 16.7812 3.14453 17.2031 3.39062C17.5898 3.63672 17.7305 4.12891 17.4844 4.55078L7.92188 20.8633C7.78125 21.1094 7.5 21.25 7.18359 21.25Z"
				fill={theme.colors.onBackground.secondary}
			/>
		</svg>
	);
}

export default SvgThemeSeparator;
