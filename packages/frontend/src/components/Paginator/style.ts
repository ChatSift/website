import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { skeletonDuration } from '../../pages/_app';
import { ButtonBase } from '../Button';

export const PaginatorBase = styled.div``;

interface PaginatorListProps {
	itemsPerPage: number;
}

export const PaginatorList = styled.ul<PaginatorListProps>`
	display: flex;
	gap: 16px;
	justify-content: center;
	flex-wrap: wrap;
`;

export const PaginationButtons = styled.ul`
	display: flex;
	margin-top: 16px;
	width: 100%;
	gap: 4px;
	justify-content: center;
`;

export const PaginationButtonListItem = styled.li`
	display: flex;
	padding: 4px;

	& > * {
		transition: transform 0.2s ease-in-out;
	}

	&:hover > * {
		transform: scale(1.5) !important;
	}
`;

const AppearAnimation = keyframes`
	0% {
		transform: scale(0);
	}
	
	50% {
		transform: scale(1.2);
	}
	
	100% {
		transform: scale(1);
	}
`;

export const PaginationButton = styled(ButtonBase)`
	width: 12px;
	height: 12px;
	border-radius: 100%;
	cursor: pointer;
	transform: scale(0);
	background-color: ${(props) => props.theme.colors.onBackground.tertiary};
	animation: ${AppearAnimation} 0.5s ease-in-out;
	animation-fill-mode: forwards;

	@media (prefers-reduced-motion: reduce) {
		transform: scale(1);
	}

	&[data-active='true'] {
		background-color: ${(props) => props.theme.colors.onBackground.primary};
	}
`;

const LoadingAnimation = keyframes`
	0% {
		opacity: 0.5;
		transform: scale(0.8);
	}
	
	50% {
		opacity: 1;
		transform: scale(1.2);
	}
	
	100% {
		opacity: 0.5;
		transform: scale(0.8);
	}
`;

export const LoadingAnimationItem = styled.li`
	margin: 2px;
	width: 12px;
	height: 12px;
	border-radius: 100%;
	background-color: ${(props) => props.theme.colors.onBackground.primary};
	animation: ${LoadingAnimation} ${skeletonDuration}s ease-in-out infinite;
`;
