import styled from '@emotion/styled';
import type { CSSProperties } from 'react';
import { useRef } from 'react';
import type { AriaButtonProps } from 'react-aria';
import { useButton } from 'react-aria';

type ButtonProps = {
	className?: string;
	disabled?: boolean;
	paddingOverride?: { x?: number; y?: number };
	style?: CSSProperties;
	title?: string;
};

export function ButtonBase({ style, title, disabled, className, ...props }: AriaButtonProps & ButtonProps) {
	const ref = useRef<HTMLButtonElement | null>(null);
	const { buttonProps } = useButton(props, ref);
	const { children } = props;

	return (
		// eslint-disable-next-line react/button-has-type
		<button disabled={disabled} {...buttonProps} style={style} title={title} className={className} ref={ref}>
			{children}
		</button>
	);
}

const Base = styled(ButtonBase)`
	white-space: nowrap;
	background-color: transparent;
	cursor: pointer;
	font-size: 18px;
	font-family: 'Author-Variable', sans-serif;
	${({ paddingOverride }) => `padding: ${paddingOverride?.y ?? 12}px ${paddingOverride?.x ?? 16}px;`}
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	height: fit-content;

	&[disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&[data-loading='true'] {
		cursor: wait;
	}
`;

type GhostProps = ButtonProps & {
	hasBorder?: boolean;
};

export const Ghost = styled(Base)<GhostProps>`
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

export const Cta = styled(Base)`
	background-color: ${(props) => props.theme.colors.accent};
	color: ${(props) => props.theme.colors.text.onAccent};
	font-weight: 500;

	&[data-type='danger'] {
		background-color: ${(props) => props.theme.colors.danger};
	}
`;
