import styled from '@emotion/styled';
import { ButtonHTMLAttributes, useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

function ButtonBase(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	const ref = useRef<HTMLButtonElement | null>(null);
	const { buttonProps } = useButton(props as AriaButtonProps, ref);
	const { children } = props;

	return (
		<button {...props} {...buttonProps} ref={ref}>
			{children}
		</button>
	);
}

const Base = styled(ButtonBase)`
	background-color: transparent;
	cursor: pointer;
	font-size: 18px;
	font-family: 'Author-Variable', sans-serif;
	padding: 12px 16px;
	border-radius: 6px;
	display: flex;
`;

export const Ghost = styled(Base)`
	background-color: transparent;
	cursor: pointer;
	font-size: 18px;
	font-family: 'Author-Variable', sans-serif;
	color: ${(props) => props.theme.colors.text.secondary};
	border: none;

	&:hover {
		background-color: ${(props) => props.theme.colors.onBackground.tertiary};
	}

	&:active {
		background-color: ${(props) => props.theme.colors.onBackground.secondary};
	}
`;
