import styled from '@emotion/styled';
import ButtonLink from '~/components/ButtonLink';
import Footer from '~/components/Footer';
import PageMeta from '~/components/PageMeta';

const Container = styled.main`
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	gap: 16px;
	justify-content: center;
`;

const NotFoundTitle = styled.h3`
	font-size: 100px;
	font-weight: 550;
	color: ${({ theme }) => theme.colors.text.primary};
	display: flex;
	flex-direction: row;
	gap: 16px;
	align-items: center;
`;

function NotFound404() {
	return (
		<>
			<PageMeta title="404 Not Found" />
			<Container>
				<NotFoundTitle>404</NotFoundTitle>
				<ButtonLink.Cta href="/">Go home</ButtonLink.Cta>
			</Container>
			<Footer />
		</>
	);
}

export default NotFound404;
