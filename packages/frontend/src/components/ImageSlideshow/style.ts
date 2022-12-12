import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { animated } from 'react-spring';
import mediaQueries from '~/styles/breakpoints';

export const gap = '24px';
export const slideshowInterval = 3_000;

const maxContainerWidth = 'min(512px, 70vw)';

export const SlideshowContainer = styled.div`
	overflow: hidden;

	${mediaQueries.dashboardMaxWidthMin} {
		-webkit-mask-image: -webkit-gradient(linear, 60% top, right top, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
	}
`;

const slide = keyframes`
	0% {
		margin-left: 0;
	}
	100% {
		margin-left: calc((var(--width-one-item) * -1 - ${gap}) * var(--n-images));
	}
`;

const grow = keyframes`
	0% {
		padding-left: 0;
	}
	90% {
		padding-left: calc((((var(--width-one-item) + ${gap}) * var(--n-images)) / var(--n-images)) / 100 * 90);
	}
`;

type SlideshowProps = {
	nImages: number;
};

export const Slideshow = styled.ul<SlideshowProps>`
	display: flex;
	gap: ${gap};
	width: max-content;
	animation: ${slide} ${({ nImages }) => slideshowInterval * nImages}ms linear infinite,
		${grow} ${slideshowInterval}ms linear infinite;
	margin-right: ${gap};
`;

export const Image = styled(animated.img)`
	background-color: ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 8px;
`;

export const ImageContainer = styled(animated.div)`
	position: relative;
	max-width: ${maxContainerWidth};
	width: 100%;
	border-radius: 8px;
	border: 2px solid ${({ theme }) => theme.colors.onBackground.secondary};
	overflow: hidden;
	object-fit: contain;
`;
