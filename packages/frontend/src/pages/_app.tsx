import { injectGlobal } from '@emotion/css';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRef } from 'react';
import '~/styles/global.scss';
import Header from '../components/Header';
import dark from '../themes/dark';

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
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<Header />
				<main>
					<Component {...pageProps} />
				</main>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
