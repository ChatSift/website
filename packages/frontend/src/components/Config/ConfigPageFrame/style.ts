import { css } from '@emotion/css';
import styled from '@emotion/styled';
import mediaQueries from '~/styles/breakpoints';

export const Frame = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1 1 auto;
	min-height: 0;
`;

export const NoScript = styled.noscript`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	align-items: center;
	justify-content: center;
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
	padding-left: 24px;
	padding-right: 0;
`;

export const Content = css`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	padding-right: 24px;
`;

export const ContentContainer = styled.div`
	padding-bottom: 64px;
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

export const DirtyBarSlot = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
`;
