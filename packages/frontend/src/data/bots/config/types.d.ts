import type { ReactNode } from 'react';

export type ConfigurableBot = {
	icon: ReactNode;
	id: string;
	name: string;
	sidebarLinks: {
		linkText: string;
		linkUrlPattern(guildId: string): string;
	}[];
};
