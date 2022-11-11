import type { ConfigurableBot } from '~/data/bots/config/types';
import SvgAma from '~/svg/SvgAma';
import SvgModmail from '~/svg/SvgModmail';

const configurableBots: ConfigurableBot[] = [
	{
		id: 'modmail',
		name: 'ModMail',
		icon: <SvgModmail />,
	},
	{
		id: 'ama',
		name: 'AMA',
		icon: <SvgAma />,
	},
];

export default configurableBots;
