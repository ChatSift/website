import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useRef } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = useRef(new QueryClient());

	return (
		<QueryClientProvider client={queryClient.current}>
			<Component {...pageProps} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
