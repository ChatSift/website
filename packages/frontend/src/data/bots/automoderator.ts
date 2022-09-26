const autoModerator: Bot = {
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
	pageTitle: 'Automate your moderation needs',
	inviteLink: '/inv-auto-moderator',
	description: {
		card: 'A powerful solution for your day-to-day moderation bot needs.',
		page: [
			'Focus on what matters most and automate the rest.',
			'Automoderator works 24x7 across multiple timezones to keep your community safe at all times.',
		],
	},
	featureList: {
		title: 'Unmatched moderation potential',
		text: 'Enhance your moderation toolkit with powerful utilities and commands that make moderation a breeze.',
		features: [
			{
				name: 'Full punishment history',
				description: 'Record all moderation cases and actions with persistent punishment history logged.',
			},
			{
				name: 'Action and reason presets',
				description: 'Define actions and punishment reasons in advance for quick handling of a case.',
			},
			{
				name: 'AI-powered NSFW filtering',
				description: 'Configure thresholds for determining how explicit an image needs to be to get filtered.',
			},
			{
				name: 'Content-type whitelists',
				description: 'Allow only particular file formats, domain links and invite links to be sent in chat.',
			},
			{
				name: 'Automated raid and spam handling',
				description:
					'Check account age, profile pictures and character sequences in usernames and action them automatically.',
			},
			{
				name: 'Customizable deep logging',
				description: 'Watch and log events in individual channels while ignoring certain channels or roles.',
			},
		],
	},
	reviews: {
		title: 'Trusted by the community',
		reviews: [
			{
				content:
					'We love Automoderator! It’s made moderating our Discord server a total breeze. I can’t imagine going back to another bot again.',
				author: {
					name: 'Gort',
					role: 'Serial killer',
					avatarUrl: '/assets/reviewers/gort.jpg',
				},
			},
			{
				content:
					'We love Automoderator! It’s made moderating our Discord server a total breeze. I can’t imagine going back to another bot again.',
				author: {
					name: 'Gort',
					role: 'Serial killer',
					avatarUrl: '/assets/reviewers/gort.jpg',
				},
			},
			{
				content:
					'We love Automoderator! It’s made moderating our Discord server a total breeze. I can’t imagine going back to another bot again.',
				author: {
					name: 'Gort',
					role: 'Serial killer',
					avatarUrl: '/assets/reviewers/gort.jpg',
				},
			},
		],
	},
};

export default autoModerator;
