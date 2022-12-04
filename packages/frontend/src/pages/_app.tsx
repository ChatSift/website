import type { Theme } from '@emotion/react';
import { Global, ThemeProvider, css } from '@emotion/react';
import styled from '@emotion/styled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createContext, useEffect, useRef, useState } from 'react';
import '~/styles/global.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { SSRProvider } from 'react-aria';
import { SkeletonTheme } from 'react-loading-skeleton';
import ErrorBoundary from '~/components/ErrorBoundary';
import Header from '~/components/Header';
import ScrollArea from '~/components/ScrollArea';
import { DialogControllerProvider } from '~/context/DialogControllerContext';
import { RouterLinkControllerProvider } from '~/context/RouterLinkControllerContext';
import dark from '~/themes/dark';
import themeMap from '~/themes/themeMap';
import { skeletonDuration } from '~/utils/constants';
import { loadSettings, saveSettings } from '~/utils/localUserSettings';

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
	max-height: 100vh;
`;

export const ThemeContext = createContext<{ current: Theme; update(newTheme: Theme): void }>({
	current: dark,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	update: () => {},
});

function App({ Component, pageProps }: AppProps) {
	const queryClient = useRef(new QueryClient());
	const [theme, setTheme] = useState(dark);
	const router = useRouter();

	useEffect(() => {
		setTheme(themeMap[loadSettings().theme ?? 'dark']);
	}, []);

	function updateTheme(newTheme: Theme) {
		setTheme(newTheme);
		saveSettings({
			theme: newTheme.name,
		});
	}

	return (
		<ThemeContext.Provider value={{ current: theme, update: updateTheme }}>
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
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}

export default App;
