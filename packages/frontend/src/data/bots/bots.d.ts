interface SlideshowImage {
	url: string;
	alt: string;
}

type Slideshow =
	| [SlideshowImage, SlideshowImage, ...SlideshowImage[]]
	| [...SlideshowImage[], SlideshowImage, SlideshowImage];

interface Review {
	content: string;
	author: {
		name: string;
		role: string;
		avatarUrl: string;
	};
}

interface Bot {
	// min two, otherwise why are you using a slideshow??
	slideshowImages: Slideshow;
	name: string;
	pageTitle: string;
	inviteLink: string;
	description: {
		card: string;
		page: string[];
	};
	featureList: {
		title: string;
		text: string;
		features: {
			name: string;
			description: string;
		}[];
	};
	reviews: {
		title: string;
		reviews: [Review, Review, ...Review[]];
	};
}
