import styled from '@emotion/styled';
import { CSSProperties, useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

interface ButtonProps {
	style?: CSSProperties;
	title?: string;
	className?: string;
}

export function ButtonBase({ style, title, className, ...props }: ButtonProps & AriaButtonProps) {
	const ref = useRef<HTMLButtonElement | null>(null);
	const { buttonProps } = useButton(props, ref);
	const { children } = props;

	return (
		<button {...buttonProps} style={style} title={title} className={className} ref={ref}>
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
	align-items: center;
	justify-content: center;
	gap: 8px;
	height: fit-content;

	&[disabled] {
		opacity: 0.5;
	}

	&[data-loading='true'] {
		cursor: wait;
	}
`;

interface GhostProps extends ButtonProps {
	hasBorder?: boolean;
}

export const Ghost = styled(Base)<GhostProps>`
	background-color: transparent;
	cursor: pointer;
	font-size: 18px;
	font-family: 'Author-Variable', sans-serif;
	color: ${(props) => props.theme.colors.text.secondary};
	border: ${(props) => (props.hasBorder ? `1px solid ${props.theme.colors.onBackground.primary};` : 'none')};

	&:not([disabled]):hover {
		&:hover {
			background-color: ${(props) => props.theme.colors.onBackground.tertiary};
		}

		&:active {
			background-color: ${(props) => props.theme.colors.onBackground.secondary};
		}
	}
`;
