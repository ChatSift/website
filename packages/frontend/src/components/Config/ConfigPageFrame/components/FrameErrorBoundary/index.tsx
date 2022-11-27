import type { ReactNode } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import * as Styles from './style';
import * as Button from '~/components/Button';
import { APIError } from '~/utils/fetch';

const GhostLink = Button.Ghost.withComponent('a');

type BaseFallbackProps = {
	description: ReactNode;
	resetErrorBoundary: FallbackProps['resetErrorBoundary'];
	title: ReactNode;
};

function BaseFallback({ title, description, resetErrorBoundary }: BaseFallbackProps) {
	return (
		<Styles.Base>
			<Styles.Title>{title}</Styles.Title>
			<Styles.Description>{description}</Styles.Description>
			<Styles.Buttons>
				<Button.Cta onPress={resetErrorBoundary}>Try again</Button.Cta>
				<GhostLink href="/support" hasBorder>
					Support
				</GhostLink>
				<GhostLink href="/dashboard">Dashboard</GhostLink>
			</Styles.Buttons>
		</Styles.Base>
	);
}

function FrameErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	if (error instanceof APIError) {
		if (error.method === 'GET') {
			const {
				payload: { statusCode },
			} = error;

			return (
				<BaseFallback
					description="We've run into an error whilst trying to fetch your server's config."
					resetErrorBoundary={resetErrorBoundary}
					title={<>Error fetching config (HTTP {statusCode})</>}
				/>
			);
		}

		const {
			payload: { statusCode },
		} = error;

		return (
			<BaseFallback
				description="We couldn't save your config due to an error; if this persists, please contact support."
				resetErrorBoundary={resetErrorBoundary}
				title={<>Couldn't save config (HTTP {statusCode})</>}
			/>
		);
	}

	return (
		<BaseFallback
			description="It seems we ran into an error. Care to try again?"
			resetErrorBoundary={resetErrorBoundary}
			title="Something went wrong"
		/>
	);
}

export default FrameErrorFallback;
