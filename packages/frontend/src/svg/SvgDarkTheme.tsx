import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';

function SvgDarkTheme() {
	const theme = useContext(ThemeContext);
	const color = theme.current.name === 'dark' ? theme.current.colors.text.primary : theme.current.colors.text.disabled;

	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.125 12.25C4.125 7.92578 7.64062 4.375 11.9648 4.375C12.3867 4.375 13.0195 4.44531 13.4062 4.51562C13.7578 4.58594 13.8281 5.04297 13.5117 5.21875C11.6133 6.30859 10.418 8.34766 10.418 10.5625C10.418 14.4297 13.8984 17.3477 17.7305 16.6445C18.082 16.5742 18.293 16.9609 18.082 17.2422C16.6055 19.0352 14.3906 20.125 11.9648 20.125C7.64062 20.125 4.125 16.6094 4.125 12.25Z"
				fill={color}
			/>
		</svg>
	);
}

export default SvgDarkTheme;
