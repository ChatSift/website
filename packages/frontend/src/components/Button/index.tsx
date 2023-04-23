import type * as Stitches from '@stitches/react';
import type { ComponentType, CSSProperties } from 'react';
import { useRef } from 'react';
import type { AriaButtonProps } from 'react-aria';
import { useButton } from 'react-aria';
import { styled, theme } from '~/stitches/stitches.config';

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

const ButtonStyle = styled(ButtonBase, {
	whiteSpace: 'nowrap',
	backgroundColor: 'transparent',
	fontSize: theme.fontSizes.two,
	fontFamily: theme.fonts.normal,
	borderRadius: theme.radii.md,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.space.sm,
	height: 'fit-content',
	paddingY: theme.space.md,
	paddingX: theme.space.lg,

	variants: {
		isDisabled: {
			true: {
				opacity: 0.5,
				cursor: 'not-allowed',
			},
			false: {
				cursor: 'pointer',
			},
			undefined: {
				cursor: 'pointer',
			},
		},

		loading: {
			true: {
				cursor: 'wait',
			},
		},

		form: {
			extraSmall: {
				padding: theme.space.xs,
			},
			small: {
				paddingX: theme.space.md,
				paddingY: theme.space.sm,
			},
		},

		buttonType: {
			callToAction: {
				backgroundColor: theme.colors.miscAccent,
				color: theme.colors.textOnAccent,
				fontWeight: theme.fontWeights.medium,
			},
			danger: {
				backgroundColor: theme.colors.miscDanger,
				color: theme.colors.textOnAccent,
				fontWeight: theme.fontWeights.medium,
			},
			ghost: {
				color: theme.colors.textSecondary,
			},
		},

		ghostHasBorder: {
			true: {},
		},
	},

	compoundVariants: [
		{
			buttonType: 'ghost',
			isDisabled: false,
			css: {
				'&:hover': {
					backgroundColor: theme.colors.onBgTertiary,
				},

				'&:active': {
					backgroundColor: theme.colors.onBgSecondary,
				},
			},
		},
		{
			buttonType: 'ghost',
			isDisabled: undefined,
			css: {
				'&:hover': {
					backgroundColor: theme.colors.onBgTertiary,
				},

				'&:active': {
					backgroundColor: theme.colors.onBgSecondary,
				},
			},
		},
		{
			buttonType: 'ghost',
			ghostHasBorder: true,
			css: {
				borderWidth: 1,
				borderStyle: 'solid',
				borderColor: theme.colors.onBgPrimary,
			},
		},
	],
});

export function Button({
	style,
	title,
	className,
	buttonType,
	as,
	...props
}: AriaButtonProps &
	ButtonProps &
	Stitches.VariantProps<typeof ButtonStyle> & {
		[_: string]: unknown;
		as?: ComponentType<any> | keyof JSX.IntrinsicElements;
	}) {
	const ref = useRef<HTMLButtonElement | null>(null);
	const { buttonProps } = useButton(props, ref);
	const { children, ...propsNoChildren } = props;

	return (
		// @ts-expect-error TS2769 todo: properly fix
		<ButtonStyle
			buttonType={buttonType}
			as={as}
			{...propsNoChildren}
			{...buttonProps}
			style={style}
			title={title}
			className={className}
			ref={ref}
		>
			{children}
		</ButtonStyle>
	);
}
