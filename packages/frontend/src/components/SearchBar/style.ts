import styled from '@emotion/styled';

const searchIcon = (color: string) => `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
    	d="M20.7188 19.8086L16.0078 15.0977C17.0273 13.8672 17.5898 12.2852 17.5898 10.5625C17.5898 6.55469 14.2852 3.25 10.2773 3.25C6.23438 3.25 3 6.55469 3 10.5625C3 14.6055 6.26953 17.875 10.2773 17.875C11.9648 17.875 13.5469 17.3125 14.8125 16.293L19.5234 21.0039C19.6992 21.1797 19.9102 21.25 20.1562 21.25C20.3672 21.25 20.5781 21.1797 20.7188 21.0039C21.0703 20.6875 21.0703 20.1602 20.7188 19.8086ZM4.6875 10.5625C4.6875 7.46875 7.18359 4.9375 10.3125 4.9375C13.4062 4.9375 15.9375 7.46875 15.9375 10.5625C15.9375 13.6914 13.4062 16.1875 10.3125 16.1875C7.18359 16.1875 4.6875 13.6914 4.6875 10.5625Z"
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
