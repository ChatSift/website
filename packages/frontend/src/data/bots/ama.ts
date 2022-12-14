import * as Urls from '~/utils/urls';

const ama: Bot = {
	slideshowImageWidths: {
		small: 240,
		medium: 240,
		large: 240,
	},
	slideshowImages: [
		{
			url: '/assets/reviewers/gort.jpg',
			alt: 'he pulls up to the after party',
		},
		{
			url: '/assets/reviewers/gort.jpg',
			alt: 'he pulls up to the after party',
		},
		{
			url: '/assets/reviewers/gort.jpg',
			alt: 'he pulls up to the after party',
		},
		{
			url: '/assets/reviewers/gort.jpg',
			alt: 'he pulls up to the after party',
		},
		{
			url: '/assets/reviewers/gort.jpg',
			alt: 'he pulls up to the after party',
		},
		{
			url: '/assets/reviewers/gort.jpg',
			alt: 'he pulls up to the after party',
		},
		{
			url: '/assets/reviewers/gort.jpg',
			alt: 'he pulls up to the after party',
		},
	],
	name: 'AMA',
	pageTitle: 'AMA (Ask Me Anything)',
	inviteLink: Urls.botInvite('ama'),
	description: {
		card: 'Manage and coordinate your Ask-Me-Anything events with ease.',
		page: [
			'Sift through community questions with a simple question feed ahead of time instead of picking them out from a live chat on the fly.',
		],
		otherBotUpsell:
			"Host and promote your community AMA's with organized workflows and promotional embeds for members.",
	},
	featureList: {
		title: 'Core Features',
		text: "Enhance your community AMA's with a robust workflow to handle question moderation and selection.",
		features: [
			{
				name: 'Maintain confidentialy',
				description: 'Review, moderate and select community questions in private.',
			},
			{
				name: 'Event embed',
				description: "New AMA's will post an embed that members can submit questions through.",
			},
			{
				name: 'Moderation queue',
				description: 'Remove unwanted, inappropriate and duplicate questions privately within the moderation queue.',
			},
			{
				name: 'Guest queue',
				description: 'Privately decide which approved questions are answered next as a host or guest using buttons.',
			},
		],
	},
};

export default ama;
