import styled from '@emotion/styled';
import * as Switch from '@radix-ui/react-switch';

export const Root = styled(Switch.Root)`
	width: 40px;
	height: 24px;
	background-color: ${(props) => props.theme.colors.onBackground.primary};
	border-radius: 222px;
	position: relative;
	cursor: pointer;

	&[data-state='checked'] {
		background-color: ${(props) => props.theme.colors.accent};
	}

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

export const Thumb = styled(Switch.Thumb)`
	position: absolute;
	top: 0;
	display: block;
	width: 24px;
	height: 24px;
	background-color: ${(props) => props.theme.colors.text.onAccent};
	background-clip: padding-box;
	border: 4px solid transparent;
	border-radius: 100%;

	&[data-state='checked'] {
		right: 0;
	}
`;
