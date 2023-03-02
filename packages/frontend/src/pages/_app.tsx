import type { Theme } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
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
import { globalStyles, styled, theme } from '~/stitches/stitches.config';
import { lightTheme } from '~/stitches/themes/light';
import dark from '~/themes/dark';
import themeMap from '~/themes/themeMap';
import { skeletonDuration } from '~/utils/constants';
import { loadSettings, saveSettings } from '~/utils/localUserSettings';

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

export const ThemeContext = createContext<{ current: Theme; update(newTheme: Theme): void }>({
	current: dark,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	update: () => {},
});

function App({ Component, pageProps }: AppProps) {
	const queryClient = useRef(new QueryClient());
	const [emotionTheme, setEmotionTheme] = useState(dark);
	const router = useRouter();

	function setThemeWrapper(theme: Theme) {
		setEmotionTheme(theme);

		if (theme.name === 'light') {
			document.body.classList.add(lightTheme);
		} else {
			document.body.classList.remove(lightTheme);
		}
	}

	useEffect(() => {
		setThemeWrapper(themeMap[loadSettings().theme ?? 'dark']);
	}, []);

	function updateTheme(newTheme: Theme) {
		setThemeWrapper(newTheme);

		saveSettings({
			theme: newTheme.name,
		});
	}

	globalStyles();

	return (
		<ThemeContext.Provider value={{ current: emotionTheme, update: updateTheme }}>
			<ThemeProvider theme={emotionTheme}>
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
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}

export default App;
