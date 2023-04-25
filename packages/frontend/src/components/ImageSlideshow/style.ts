import { styled, theme } from '~/stitches/stitches.config';

export const slideshowInterval = 3_000;

export const SlideshowContainer = styled('div', {
	overflow: 'hidden',

	variants: {
		hasGradient: {
			true: {
				WebkitMaskImage: '-webkit-gradient(linear, 60% top, right top, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)))',
			},
		},
	},
});

export const Slideshow = styled('ul', {
	displayFlex: 'row',
	gap: 'var(--slideshow-gap)',
	width: 'max-content',
	marginRight: 'var(--slideshow-gap)',
});

export const Image = styled('img', {
	backgroundColor: theme.colors.onBgSecondary,
});

export const ImageContainer = styled('li', {
	position: 'relative',
	maxWidth: 'var(--width-one-item)',
	width: '100%',
	borderRadius: theme.radii.lg,
	borderWidth: 2,
	borderStyle: theme.borderStyles.normal,
	borderColor: theme.colors.onBgSecondary,
	overflow: 'hidden',
	objectFit: 'contain',
});
