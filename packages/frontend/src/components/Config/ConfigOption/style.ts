import styled from '@emotion/styled';
import { Body, Heading4 } from '~/components/Text';

export const Option = styled.li`
	display: flex;
	flex-direction: column;
	padding: 12px 16px;
	gap: 16px;
`;

export const OptionHeader = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	gap: 16px;
	justify-content: space-between;
	align-items: center;
`;

export const IconAndTag = styled.div`
	display: flex;
	flex-direction: row;
	gap: 16px;
	align-items: center;
	flex: 1 1 auto;
	min-width: 0;
`;

export const Tag = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1 1 auto;
	min-width: 0;
`;

export const OptionTitle = styled(Heading4)`
	color: ${({ theme }) => theme.colors.text.primary};
`;

export const OptionCaption = styled(Body.Regular)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;
