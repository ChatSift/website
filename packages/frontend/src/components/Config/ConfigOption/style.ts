import styled from '@emotion/styled';
import { Body, Caption } from '~/components/Text';

export const Option = styled.li`
	padding: 12px 16px;
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

export const OptionTitle = styled(Body.Bold)`
	color: ${({ theme }) => theme.colors.text.primary};
`;

export const OptionCaption = styled(Caption.Regular)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;
