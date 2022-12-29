import styled from '@emotion/styled';
import mediaQueries from '~/styles/breakpoints';

export const slideshowInterval = 3_000;

export const SlideshowContainer = styled.div`
	overflow: hidden;

	${mediaQueries.dashboardMaxWidthMin} {
		-webkit-mask-image: -webkit-gradient(linear, 60% top, right top, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
	}
`;

type SlideshowProps = {
	nImages: number;
};

export const Slideshow = styled.ul<SlideshowProps>`
	display: flex;
	gap: var(--slideshow-gap);
	width: max-content;
	animation: slideshow-slide ${({ nImages }) => slideshowInterval * nImages}ms linear infinite,
		slideshow-grow ${slideshowInterval}ms linear infinite;
	margin-right: var(--slideshow-gap);
`;

export const Image = styled.img`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.onBackground.secondary};
`;

export const ImageContainer = styled.li`
	position: relative;
	max-width: var(--width-one-item);
	width: 100%;
	border-radius: 8px;
	border: 2px solid ${({ theme }) => theme.colors.onBackground.secondary};
	overflow: hidden;
	object-fit: contain;
`;
