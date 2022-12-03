import styled from '@emotion/styled';
import * as Button from '~/components/Button';
import Footer from '~/components/Footer';
import { RouterLink } from '~/components/Link';

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

const HomeButton = Button.Cta.withComponent(RouterLink);

function NotFound404() {
	return (
		<>
			<Container>
				<NotFoundTitle>
					{/* <LookingGlass themeColor={(theme) => theme.colors.text.primary} /> */}
					404
				</NotFoundTitle>
				<HomeButton href="/">Go home</HomeButton>
			</Container>
			<Footer />
		</>
	);
}

export default NotFound404;
