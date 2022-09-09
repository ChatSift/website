import { injectGlobal } from '@emotion/css';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRef } from 'react';
import '~/styles/global.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import Header from '../components/Header';
import dark from '../themes/dark';

export const skeletonDuration = 1.5;

function App({ Component, pageProps }: AppProps) {
	const queryClient = useRef(new QueryClient());
	const theme = dark;

	injectGlobal`
		body {
			background-color: ${theme.colors.background.default};
		}
	`;

	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient.current}>
				<SkeletonTheme
					baseColor={theme.colors.onBackground.tertiary}
					highlightColor={theme.colors.onBackground.secondary}
					duration={skeletonDuration}
				>
					<Head>
						<meta name="viewport" content="width=device-width, initial-scale=1" />
					</Head>
					{/* <SkipLink /> */}
					<Header />
					<main id="#content">
						<Component {...pageProps} />
					</main>
				</SkeletonTheme>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
