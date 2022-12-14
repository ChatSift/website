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
	reviews: {
		title: 'Ok I pull up',
		reviews: [
			{
				content:
					'When I first laid eyes on Rattus Cattus the Third, I knew I was in the presence of greatness. He stood tall and proud, surveying his kingdom with the air of a true ruler. It was clear that he was no ordinary cat - he was a true feline conqueror.',
				author: {
					name: 'Whiskers',
					role: 'Noble feline',
					avatarUrl: '/assets/reviewers/whiskers.png',
				},
			},
			{
				content:
					'Rattus Cattus the Third may be small in stature, but he is a giant among cats. He is a master strategist, always thinking several steps ahead of his foes. He may be soft and fluffy on the outside, but there is a fierce warrior within him.',
				author: {
					name: 'Socks',
					role: 'Young kitten',
					avatarUrl: '/assets/reviewers/socks.png',
				},
			},
			{
				content:
					'I have never seen a cat as agile and graceful as Rattus Cattus the Third. He moves with the speed and precision of a ninja, always landing on his feet and never missing a beat. He is the embodiment of feline perfection.',
				author: {
					name: 'Paws',
					role: 'Clever feline',
					avatarUrl: '/assets/reviewers/paws.png',
				},
			},
			{
				content:
					'Rattus Cattus the Third has a heart of gold. He may be tough and fierce in battle, but he is also kind and gentle with those he cares about. He is the perfect combination of strength and compassion, a true hero among cats.',
				author: {
					name: 'Mittens',
					role: 'Gentle feline',
					avatarUrl: '/assets/reviewers/mittens.png',
				},
			},
		],
	},
};

export default ama;
