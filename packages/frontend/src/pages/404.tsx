import { Button } from '~/components/Button';
import { ButtonLink } from '~/components/ButtonLink';
import Footer from '~/components/Footer';
import PageMeta from '~/components/PageMeta';
import { Text } from '~/components/Text';
import { styled, theme } from '~/stitches/stitches.config';

const Container = styled('main', {
	displayFlex: 'column',
	flex: '1 0 auto',
	gap: theme.space.lg,
	justifyContent: 'center',
});

function NotFound404() {
	return (
		<>
			<PageMeta title="404 Not Found" />
			<Container>
				<Text kind="big" weight="bold" color="primary">
					404
				</Text>
				<Button as={ButtonLink} buttonType="callToAction" href="/">
					Go home
				</Button>
			</Container>
			<Footer />
		</>
	);
}

export default NotFound404;
