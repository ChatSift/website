import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import '~/styles/global.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { SSRProvider } from 'react-aria';
import { SkeletonTheme } from 'react-loading-skeleton';
import ErrorBoundary from '~/components/ErrorBoundary';
import Header from '~/components/Header';
import ScrollArea from '~/components/ScrollArea';
import { DialogControllerProvider } from '~/context/DialogControllerContext';
import { RouterLinkControllerProvider } from '~/context/RouterLinkControllerContext';
import { globalStyles, styled, theme } from '~/stitches/stitches.config';
import { setThemeWrapper } from '~/stitches/switchTheme';
import { skeletonDuration } from '~/utils/constants';
import { loadSettings } from '~/utils/localUserSettings';

const Container = styled('div', {
	displayFlex: 'column',
	flex: '1 1 auto',
	minHeight: 0,
});

const Content = styled('div', {
	displayFlex: 'column',
	minHeight: '100vh',
});

const AppScrollViewPort = styled(ScrollArea, {
	maxHeight: '100vh',
});

function App({ Component, pageProps }: AppProps) {
	const queryClient = useRef(new QueryClient());
	const router = useRouter();

	useEffect(() => {
		setThemeWrapper(loadSettings().theme ?? 'dark');
	}, []);

	globalStyles();

	return (
		<QueryClientProvider client={queryClient.current}>
			<noscript>
				<style>{`
							[data-radix-scroll-area-viewport] {
								overflow: auto !important;
							}
						`}</style>
			</noscript>
			<SkeletonTheme
				baseColor={theme.colors.onBgTertiary.toString()}
				highlightColor={theme.colors.onBgSecondary.toString()}
				duration={skeletonDuration}
			>
				<Analytics
					beforeSend={(event) => {
						return {
							...event,
							url: event.url.replaceAll(/(?<id>\d{17,20})/g, 'id'),
						};
					}}
				/>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/assets/favicon.ico" />
					<title>ChatSift</title>
				</Head>
				<SSRProvider>
					<RouterLinkControllerProvider>
						<ErrorBoundary>
							<DialogControllerProvider>
								<AppScrollViewPort>
									<Content id="content">
										<Header />
										<Container>
											<Component {...pageProps} key={router.asPath} />
										</Container>
									</Content>
								</AppScrollViewPort>
							</DialogControllerProvider>
						</ErrorBoundary>
					</RouterLinkControllerProvider>
				</SSRProvider>
			</SkeletonTheme>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
