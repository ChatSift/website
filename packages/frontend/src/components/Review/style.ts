import styled from '@emotion/styled';
import mediaQueries from '~/styles/breakpoints';

export const Base = styled.figure`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16px;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.background.card};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	height: 200px;

	${mediaQueries.smallMin} {
		height: 164px;
	}

	${mediaQueries.dashboardMaxWidthMin} {
		height: 152px;
	}
`;

export const Quote = styled.blockquote`
	font-size: 18px;
	font-weight: 450;
	color: ${({ theme }) => theme.colors.text.primary};
`;

export const Author = styled.figcaption`
	display: flex;
	flex-direction: row;
	gap: 8px;
	align-items: center;
`;

export const AuthorAvatar = styled.img`
	width: 36px;
	height: 36px;
	border-radius: 100%;
`;

export const AuthorInfo = styled.div``;

export const AuthorName = styled.div`
	font-size: 18px;
	font-weight: 550;
	color: ${({ theme }) => theme.colors.text.primary};
	line-height: 24px;
`;

export const AuthorRole = styled.div`
	font-size: 16px;
	font-weight: 450;
	color: ${({ theme }) => theme.colors.text.secondary};
	line-height: 20px;
`;
