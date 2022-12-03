import styled from '@emotion/styled';

const searchIcon = (color: string) => `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3M9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z"
		fill="${color}"
	/>
</svg>
`;

function backgroundImageGen(color: string) {
	return `url(data:image/svg+xml;base64,${Buffer.from(searchIcon(color)).toString('base64')});`;
}

export const SearchField = styled.input`
	background-color: ${(props) => props.theme.colors.onBackground.tertiary};
	font-weight: 450;
	font-size: 18px;
	color: ${(props) => props.theme.colors.text.primary};
	border-radius: 8px;
	background-image: ${(props) => backgroundImageGen(props.theme.colors.onBackground.primary)};
	background-position: right 16px center;
	background-repeat: no-repeat;
	padding: 12px ${16 * 3}px 12px 16px;
	border: 1px solid ${(props) => props.theme.colors.onBackground.secondary};

	&::placeholder {
		color: ${(props) => props.theme.colors.text.secondary};
	}

	&:focus {
		&::placeholder {
			color: ${(props) => props.theme.colors.text.primary};
		}

		background-image: ${(props) => backgroundImageGen(props.theme.colors.text.primary)};
		border: 1px solid ${(props) => props.theme.colors.text.primary};
	}
`;
