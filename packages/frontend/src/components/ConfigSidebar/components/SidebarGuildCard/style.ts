import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';

export const Card = styled.article`
	display: flex;
	flex-direction: column;
	padding: 16px;
	border-radius: 8px;
	gap: 8px;
	background-color: ${({ theme }) => theme.colors.background.card};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};

	// hack to make the skeleton not take up too much height
	> span {
		display: flex;
	}
`;

export const GuildImage = styled.img`
	display: flex !important;
	justify-content: center;
	align-items: center;
	width: 48px;
	height: 48px;
	border-radius: 100%;
	border: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
`;

export const SkeletonGuildImage = GuildImage.withComponent(Skeleton);

export const CardHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const GuildName = styled.span`
	font-weight: 550;
	font-size: 18px;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.text.primary};
`;
