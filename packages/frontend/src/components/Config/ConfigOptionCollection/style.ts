import styled from '@emotion/styled';

export const ConfigOptionCollection = styled.ul`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.onBackground.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};

  > *:not(:last-child) { {
    border-bottom: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
  }
`;
