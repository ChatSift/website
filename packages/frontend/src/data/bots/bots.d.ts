type BotId = 'ama' | 'automoderator' | 'modmail';

type SlideshowImage = {
	alt: string;
	url: string;
};

type Slideshow =
	| [...SlideshowImage[], SlideshowImage, SlideshowImage]
	| [SlideshowImage, SlideshowImage, ...SlideshowImage[]];

type Review = {
	author: {
		avatarUrl: string;
		name: string;
		role: string;
	};
	content: string;
};

type Bot = {
	description: {
		card: string;
		// This is the upsell that is placed on another bot's page
		otherBotUpsell?: string;
		page: string[];
	};
	featureList: {
		features: {
			description: string;
			name: string;
		}[];
		text: string;
		title: string;
	};
	inviteLink: string;
	name: string;
	pageTitle: string;
	reviews?: {
		reviews: [Review, Review, ...Review[]];
		title: string;
	};
	slideshowImageWidth: number;
	// min two, otherwise why are you using a slideshow??
	slideshowImages: Slideshow;
};
