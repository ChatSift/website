import styled from '@emotion/styled';
import mediaQueries from '~/styles/breakpoints';

export const Frame = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1 1 auto;
	min-height: 0;
`;

export const Container = styled.div`
	flex: 1 1 auto;
	--container-padding: 16px;
	max-width: 100vw;
	position: relative;

	${mediaQueries.smallMin} {
		--container-padding: 24px;
	}
	padding: var(--container-padding);
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	height: 100%;
	overflow-y: auto;
	padding-bottom: 64px;
`;

export const DirtyBarSlot = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
`;
