import { useTheme } from '@emotion/react';

function SvgAma({ width, height }: { height?: number; width?: number }) {
	const theme = useTheme();

	return (
		<svg width={width ?? 24} height={height ?? 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.5 4.5V18H9L12 21L15 18H19.5V4.5H4.5Z"
				stroke={theme.colors.accent}
				strokeWidth="1.875"
				strokeLinejoin="round"
			/>
			<path
				d="M9.75 8.0625C9.23223 8.0625 8.8125 8.48223 8.8125 9C8.8125 9.51777 9.23223 9.9375 9.75 9.9375V8.0625ZM14.25 9H15.1875C15.1875 8.48223 14.7678 8.0625 14.25 8.0625V9ZM14.25 11.3333L14.5163 12.2322C14.9144 12.1143 15.1875 11.7485 15.1875 11.3333H14.25ZM11.7337 11.1011C11.2372 11.2482 10.954 11.7699 11.1011 12.2663C11.2482 12.7628 11.7699 13.046 12.2663 12.8989L11.7337 11.1011ZM12.9375 15C12.9375 14.4822 12.5178 14.0625 12 14.0625C11.4822 14.0625 11.0625 14.4822 11.0625 15H12.9375ZM11.0625 15.0015C11.0625 15.5193 11.4822 15.939 12 15.939C12.5178 15.939 12.9375 15.5193 12.9375 15.0015H11.0625ZM9.75 9.9375H14.25V8.0625H9.75V9.9375ZM13.3125 9V11.3333H15.1875V9H13.3125ZM13.9837 10.4345L11.7337 11.1011L12.2663 12.8989L14.5163 12.2322L13.9837 10.4345ZM11.0625 15V15.0015H12.9375V15H11.0625Z"
				fill={theme.colors.text.primary}
			/>
		</svg>
	);
}

export default SvgAma;
