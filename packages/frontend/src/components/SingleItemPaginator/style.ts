import styled from '@emotion/styled';

export const buttonPadding = 4;
const radioButtonBottom = '32px';
export const noJsControlsGap = '8px';
export const noJsControlSize = '16px';

export const Base = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const Content = styled.div`
	display: grid;
	flex-direction: row;
	min-width: 100%;
`;

export const ControlsArrows = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: ${12 - buttonPadding}px;
`;

export const ControlsNoJs = styled.ul`
	display: none;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: relative;
	margin-bottom: ${radioButtonBottom};
`;

export const NoJsPageRadioButton = styled.input`
	position: absolute;
	bottom: -${radioButtonBottom};
	width: ${noJsControlSize};
	height: ${noJsControlSize};
	appearance: none;
	background-color: ${({ theme }) => theme.colors.text.disabled};
	border-radius: 100%;
	scale: 0.9;
	opacity: 0.7;
	transition: background-color 0.2s ease-in-out, scale 0.2s ease-in-out;
	cursor: pointer;

	&:hover {
		scale: 1;
		background-color: ${({ theme }) => theme.colors.text.secondary};
	}

	&:checked {
		scale: 1.1;
		background-color: ${({ theme }) => theme.colors.text.primary};
	}
`;

export const CurrentPage = styled.div`
	font-weight: 450;
	font-size: 18px;
`;
