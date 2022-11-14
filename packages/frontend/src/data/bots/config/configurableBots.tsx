import type { ConfigurableBot } from '~/data/bots/config/types';
import SvgAma from '~/svg/SvgAma';
import SvgModmail from '~/svg/SvgModmail';
import * as Urls from '~/utils/urls';

const configurableBots: ConfigurableBot[] = [
	{
		id: 'modmail',
		name: 'ModMail',
		icon: <SvgModmail />,
		sidebarLinks: [
			{
				linkText: 'Settings',
				linkUrlPattern: (guildId) => Urls.dashboard.botPage(guildId, 'modmail', 'settings'),
			},
			{
				linkText: 'Snippets',
				linkUrlPattern: (guildId) => Urls.dashboard.botPage(guildId, 'modmail', 'snippets'),
			},
		],
	},
	{
		id: 'ama',
		name: 'AMA',
		icon: <SvgAma />,
		sidebarLinks: [],
	},
];

export default configurableBots;
