import type { ReactNode } from 'react';
import type { ErrorBoundaryPropsWithRender, FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import * as Styles from './style';
import { Button } from '~/components/Button';
import { ButtonLink } from '~/components/ButtonLink';
import { APIError } from '~/utils/fetch';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	if (error instanceof APIError) {
		return (
			<Styles.ErrorBoundary>
				<Styles.Title>API Error {error.payload.statusCode}</Styles.Title>
				<Styles.Buttons>
					<Button buttonType="callToAction" onPress={resetErrorBoundary}>
						Reload
					</Button>
					<Button as={ButtonLink} buttonType="ghost" href="/github/issues" external ghostHasBorder>
						Open an Issue
					</Button>
					<Button as={ButtonLink} buttonType="ghost" href="/dashboard" ghostHasBorder>
						Back to Dashboard
					</Button>
				</Styles.Buttons>
			</Styles.ErrorBoundary>
		);
	}

	return (
		<Styles.ErrorBoundary>
			<Styles.Title>Something went wrong</Styles.Title>
			<Styles.Buttons>
				<Button buttonType="callToAction" onPress={resetErrorBoundary}>
					Reload
				</Button>
				<Button as={ButtonLink} buttonType="ghost" href="/github/issues" external ghostHasBorder>
					Open an Issue
				</Button>
			</Styles.Buttons>
		</Styles.ErrorBoundary>
	);
}

type ErrorBoundaryProps = {
	children: ReactNode;
	errorFallback?: ErrorBoundaryPropsWithRender['fallbackRender'];
};

function ErrorBoundary({ children, errorFallback = ErrorFallback }: ErrorBoundaryProps) {
	return <ReactErrorBoundary fallbackRender={errorFallback}>{children}</ReactErrorBoundary>;
}

export default ErrorBoundary;
