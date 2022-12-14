import * as Urls from '~/utils/urls';

const autoModerator: Bot = {
	slideshowImageWidths: {
		small: 200,
		medium: 300,
		large: 508,
	},
	slideshowImages: [
		{
			url: 'https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg',
			alt: 'schoobie doober',
		},
		{
			url: 'https://i.ytimg.com/vi/Ux5cQbO_ybw/maxresdefault.jpg',
			alt: 'schoobie doober',
		},
		{
			url: 'https://i.ytimg.com/vi/lQezinb283E/maxresdefault.jpg',
			alt: 'schoobie doober',
		},
	],
	name: 'AutoModerator',
	pageTitle: 'AutoModerator',
	inviteLink: Urls.botInvite('automoderator'),
	description: {
		card: 'A powerful solution for your day-to-day moderation bot needs.',
		page: [
			'Instead of watching chat 24/7 let AutoModerator surface, review and handle issues across all timezones for you.',
		],
		otherBotUpsell: 'A robust content reporting and filtering solution for your community.',
	},
	featureList: {
		title: 'Core Features',
		text: 'Enhance your moderation toolkit with powerful utilities and commands that make moderation a breeze.',
		features: [
			{
				name: 'Essential tooling',
				description: 'Empower your staff with must have slash commands to improve moderation time cross-platform.',
			},
			{
				name: 'Robust content filtering',
				description:
					'Automatically detect and handle harmful and unwanted text, images, files and links with robust filter options.',
			},
			{
				name: 'Organized record keeping',
				description: 'Every action by staff on your members is recorded so you can swiftly case review at a glance',
			},
			{
				name: 'Comprehensive logging',
				description: 'Record essential information like message edits and user updates only where designated.',
			},
			{
				name: 'Action and reason presets',
				description: 'Define actions and punishment reasons in advance for quick handling of cases.',
			},
		],
	},
	reviews: {
		title: 'Trusted by the community',
		reviews: [
			{
				content:
					"We love Automoderator! It's made moderating our Discord server a total breeze. I can't imagine going back to another bot again.",
				author: {
					name: 'Eviljt',
					role: 'CEO, Getting things done on time LLC',
					avatarUrl: '/assets/reviewers/rjt.png',
				},
			},
			{
				content: 'Ok I pull up',
				author: {
					name: 'Gort',
					role: 'Part time serial killer, full-time capybara',
					avatarUrl: '/assets/reviewers/gort.jpg',
				},
			},
			{
				content: 'Ooo ye boogie ye shk oh yeah boogie oh yeah',
				author: {
					name: 'Bert',
					role: 'Dancer',
					avatarUrl: 'https://media.discordapp.net/stickers/871832109482917929.png?size=240',
				},
			},
		],
	},
};

export default autoModerator;
