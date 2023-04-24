import { lightTheme } from '~/stitches/themes/light';
import { saveSettings } from '~/utils/localUserSettings';

export function setThemeWrapper(theme: 'dark' | 'light') {
	if (theme === 'light') {
		document.body.classList.add(lightTheme);
	} else {
		document.body.classList.remove(lightTheme);
	}

	saveSettings({
		theme,
	});
}
