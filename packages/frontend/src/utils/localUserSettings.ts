type LocalUserSettings = {
	theme: 'dark' | 'light';
};

export function loadSettings(): LocalUserSettings {
	return JSON.parse(localStorage.getItem('settings') ?? '{}');
}

export function saveSettings(settings: Partial<LocalUserSettings>) {
	localStorage.setItem('settings', JSON.stringify(settings));
}
