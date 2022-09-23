import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';
import { guildCardGap, guildCardWidthMobile, smallestDashboardWidth } from '../../utils/constants';

const guildCardInnerGap = 12;

export const NotInvited = styled.span`
	font-size: 16px;
`;

export const GuildTitle = styled.h3`
	font-size: 18px;
	color: ${(props) => props.theme.colors.text.primary};
	font-weight: 550;
	margin: 0;
	white-space: nowrap;
	width: 100%;
	text-overflow: ellipsis;
	overflow: hidden;
`;

export const CardHeader = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	gap: 12px;
`;

export const NotInvitedHover = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${guildCardInnerGap}px;
`;

export const BotListNotInvited = styled.ul`
	display: flex;
	gap: 12px;
`;

export const Bot = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.onBackground.tertiary};
	border-radius: 4px;
	width: 48px;
	height: 48px;
`;

export const GuildImage = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 48px;
	height: 48px;
	border-radius: 100%;
	border: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
`;

export const GuildAcronym = styled(GuildImage.withComponent('div'))`
	&::after {
		max-width: 70%;
		content: attr(data-full);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;
export const SkeletonImage = GuildImage.withComponent(Skeleton);

export const GuildCardBase = styled.a`
	display: flex;
	gap: ${guildCardInnerGap}px;
	flex-direction: column;
	padding: ${guildCardGap}px;
	border-radius: 8px;
	border: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
	min-width: ${guildCardWidthMobile}px;
	width: 216px;
	height: 144px;
	color: ${(props) => props.theme.colors.text.secondary};

	& > span {
		display: flex;
	}

	&[data-is-invited='true'] {
		background-color: ${(props) => props.theme.colors.background.card};

		#header-title {
			display: none;
		}
	}

	&[data-is-invited='false'][data-skeleton='false'] {
		&:not(:hover) #header-title {
			display: none;
		}

		&:hover {
			#not-invited-hover-title {
				display: none;
			}

			${GuildAcronym},
			${GuildImage} {
				width: 24px;
				height: 24px;
				aspect-ratio: 1;
			}

			${GuildAcronym}::after {
				content: attr(data-first-letter);
			}

			${NotInvited} {
				display: none;
			}
		}
	}

	&:not([data-skeleton='true'])[data-is-invited='true'] {
		cursor: pointer;
	}

	&:not(:hover) ${NotInvitedHover}, &[data-skeleton='true'] ${NotInvitedHover} {
		display: none;
	}

	@media (max-width: ${smallestDashboardWidth}px) {
		width: 80vw;
	}
`;

export const NameAndBots = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const BotList = styled.ul`
	display: flex;
	flex-direction: row;
	gap: 4px;
`;
