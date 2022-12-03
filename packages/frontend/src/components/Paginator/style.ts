import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { ButtonBase } from '../Button';
import mediaQueries from '~/styles/breakpoints';
import { dashboardMaxWidth, guildCardWidthDesktop, skeletonDuration, smallestDashboardWidth } from '~/utils/constants';

export const PaginatorBase = styled.div``;

type PaginatorListProps = {
	itemsPerPage: number;
};

export const PaginatorList = styled.ul<PaginatorListProps>`
	display: grid;
	grid-template-columns: auto;
	gap: 16px;
	flex-wrap: wrap;
	justify-content: start;

	@media (max-width: ${smallestDashboardWidth}px) {
		display: flex;
		width: 100%;

		& > * {
			width: 100%;
		}
	}

	${mediaQueries.smallMin} {
		grid-template-columns: repeat(${(props) => props.itemsPerPage}, ${guildCardWidthDesktop}px);
	}

	@media (min-width: ${smallestDashboardWidth}px) and (max-width: ${dashboardMaxWidth}px) {
		grid-template-columns: auto auto;
	}
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
	margin: 4px;
	width: 12px;
	height: 12px;
	padding: 4px;
	border-radius: 100%;
	background-color: ${(props) => props.theme.colors.onBackground.primary};
	animation: ${LoadingAnimation} ${skeletonDuration}s ease-in-out infinite;
`;
