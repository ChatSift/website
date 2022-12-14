import * as Urls from '~/utils/urls';

const ama: Bot = {
	slideshowImageWidths: {
		small: 200,
		medium: 300,
		large: 508,
	},
	slideshowImages: [
		{
			url: '/assets/bot-slideshows/modmail/rattus-cattus-the-third.jpg',
			alt: 'he has claimed his rightful place on the throne',
		},
		{
			url: '/assets/bot-slideshows/modmail/rattus-cattus-the-third.jpg',
			alt: 'he has claimed his rightful place on the throne',
		},
		{
			url: '/assets/bot-slideshows/modmail/rattus-cattus-the-third.jpg',
			alt: 'he has claimed his rightful place on the throne',
		},
		{
			url: '/assets/bot-slideshows/modmail/rattus-cattus-the-third.jpg',
			alt: 'he has claimed his rightful place on the throne',
		},
		{
			url: '/assets/bot-slideshows/modmail/rattus-cattus-the-third.jpg',
			alt: 'he has claimed his rightful place on the throne',
		},
		{
			url: '/assets/bot-slideshows/modmail/rattus-cattus-the-third.jpg',
			alt: 'he has claimed his rightful place on the throne',
		},
	],
	name: 'ModMail',
	pageTitle: 'ModMail',
	inviteLink: Urls.botInvite('modmail'),
	description: {
		card: 'Receive and respond to user inquiries with an easy to use workflow.',
		page: ['Support your community with a robust out-of-the-box modmail bot that is quick to setup and easy to use.'],
		otherBotUpsell: 'Host organized Q&A events within your community.',
	},
	featureList: {
		title: 'Core Features',
		text: "We've made sure to seamlessly tie together every essential tool needed so your staff can do their job with ease.",
		features: [
			{
				name: 'Maintain confidentiality',
				description:
					'Enjoy private seamless two-way communication between staff and members neatly organized within forum threads.',
			},
			{
				name: 'Sort inquiries by tags',
				description: 'Utilize forum tags to have members categorize their inquiry before staff receive and review it.',
			},
			{
				name: 'Save time with snippets',
				description:
					'Improve your workflow by using snippets for common inquiries or even complex topics needing specific wording.',
			},
			{
				name: 'Greetings and farewells',
				description:
					'Automatically greet members when they send an inquiry or send them a farewell once their thread has been closed.',
			},
			{
				name: 'Minimize delays with alerts',
				description:
					'When inquiries are received you can have modmail ping a specific role or even notify you of new replies from members.',
			},
			{
				name: 'Classic or cozy',
				description:
					"For those who don't like embedded bot messages you can switch to a plaintext mode for bot messages.",
			},
		],
	},
};

export default ama;
