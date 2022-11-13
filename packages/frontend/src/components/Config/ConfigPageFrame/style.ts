import styled from '@emotion/styled';
import mediaQueries from '~/styles/breakpoints';

export const Frame = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1 1 auto;
	min-height: 0;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	flex: 1 1 auto;
	padding: 16px;
	max-width: 100vw;
	overflow-y: auto;

	${mediaQueries.smallMin} {
		padding: 24px;
	}
`;
