import * as Urls from '~/utils/urls';

const autoModerator: Bot = {
	slideshowImageWidths: {
		small: 200,
		medium: 300,
		large: 508,
	},
	slideshowImages: [
		{
			url: '/assets/bot-slideshows/automoderator/AMCover1.png',
			alt: '',
		},
		{
			url: '/assets/bot-slideshows/automoderator/AMCover2.png',
			alt: '',
		},
		{
			url: '/assets/bot-slideshows/automoderator/AMCover3.png',
			alt: '',
		},
		{
			url: '/assets/bot-slideshows/automoderator/AMCover4.png',
			alt: '',
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
};

export default autoModerator;
