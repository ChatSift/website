import { Global, ThemeProvider, css } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRef, useState } from 'react';
import '~/styles/global.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import Header from '../components/Header';
import dark from '../themes/dark';
import { skeletonDuration } from '../utils/constants';

function App({ Component, pageProps }: AppProps) {
	const queryClient = useRef(new QueryClient());
	const [theme] = useState(dark);

	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient.current}>
				<Global
					styles={css`
						body {
							background-color: ${theme.colors.background.default};
						}
					`}
				/>
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
