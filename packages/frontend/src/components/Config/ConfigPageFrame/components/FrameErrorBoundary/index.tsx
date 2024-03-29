import type { ReactNode } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import * as Styles from './style';
import { Button } from '~/components/Button';
import { ButtonLink } from '~/components/ButtonLink';
import SvgRefresh from '~/svg/SvgRefresh';
import { APIError } from '~/utils/fetch';

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
				<Button buttonType="callToAction" onPress={resetErrorBoundary}>
					<SvgRefresh /> Try again
				</Button>
				<Button as={ButtonLink} buttonType="ghost" href="/support" external ghostHasBorder>
					Support
				</Button>
				<Button as={ButtonLink} buttonType="ghost" href="/dashboard">
					Dashboard
				</Button>
			</Styles.Buttons>
		</Styles.Base>
	);
}

function FrameErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	if (error instanceof APIError) {
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

	return (
		<BaseFallback
			description="It seems we ran into an error. Care to try again?"
			resetErrorBoundary={resetErrorBoundary}
			title="Something went wrong"
		/>
	);
}

export default FrameErrorFallback;
