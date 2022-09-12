import styled from '@emotion/styled';

interface SearchBarProps {
	bgImageSvgData: string;
}

export const SearchField = styled.input<SearchBarProps>`
	background-color: ${(props) => props.theme.colors.onBackground.tertiary};
	font-weight: 450;
	font-size: 18px;
	color: ${(props) => props.theme.colors.text.primary};
	border-radius: 8px;
	background-image: url(data:image/svg+xml;base64,${(props) => props.bgImageSvgData});
	background-position: right 16px center;
	background-repeat: no-repeat;
	padding: 12px ${16 * 3}px 12px 16px;

	&::placeholder {
		color: ${(props) => props.theme.colors.text.secondary};
	}
`;
