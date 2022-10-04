import styled from '@emotion/styled';
import { animated } from 'react-spring';
import mediaQueries from '~/styles/breakpoints';

export const gap = 24;
export const slideshowInterval = 3_000;

export const SlideshowContainer = styled.div`
	overflow: hidden;

	${mediaQueries.dashboardMaxWidthMin} {
		-webkit-mask-image: -webkit-gradient(linear, 60% top, right top, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
	}
`;

type SlideshowProps = {
	nImages: number;
}

export const Slideshow = styled.ul<SlideshowProps>`
	display: flex;
	gap: ${gap}px;
	width: max-content;
`;

export const Image = styled(animated.img)`
	background-color: ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 8px;
`;

export const ImageContainer = styled(animated.div)`
	position: relative;
	max-width: min(512px, 70vw);
	width: 100%;
	border-radius: 8px;
	border: 2px solid ${({ theme }) => theme.colors.onBackground.secondary};
	overflow: hidden;
`;

export const ProgressBar = styled(animated.div)`
	background-color: ${({ theme }) => theme.colors.accent};
	height: 4px;
	position: absolute;
	left: 0;
	bottom: 0;
`;
