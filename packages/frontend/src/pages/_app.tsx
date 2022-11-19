import type { Theme } from '@emotion/react';
import { Global, ThemeProvider, css } from '@emotion/react';
import styled from '@emotion/styled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { createContext, useRef, useState } from 'react';
import '~/styles/global.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { SSRProvider } from 'react-aria';
import { SkeletonTheme } from 'react-loading-skeleton';
import Header from '../components/Header';
import dark from '../themes/dark';
import { RouterLinkControllerProvider } from '~/RouterLinkControllerContext';
import ScrollArea from '~/components/ScrollArea';
import { skeletonDuration } from '~/utils/constants';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	min-height: 0;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const AppScrollViewPort = styled(ScrollArea)`
	max-height: 100vh; ;
`;

export const ThemeContext = createContext<{ current: Theme; update(newTheme: Theme): void }>({
	current: dark,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	update: () => {},
});

function App({ Component, pageProps }: AppProps) {
	const queryClient = useRef(new QueryClient());
	const [theme, setTheme] = useState(dark);

	return (
		<ThemeContext.Provider value={{ current: theme, update: setTheme }}>
			<ThemeProvider theme={theme}>
				<RouterLinkControllerProvider>
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
								<link rel="icon" href="/assets/favicon.ico" />
							</Head>
							<AppScrollViewPort>
								<Content>
									<Header />
									<SSRProvider>
										<Container>
											<Component {...pageProps} />
										</Container>
									</SSRProvider>
								</Content>
							</AppScrollViewPort>
						</SkeletonTheme>
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</RouterLinkControllerProvider>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}

export default App;
