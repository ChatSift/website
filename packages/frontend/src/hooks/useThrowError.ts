import { useCallback, useState } from 'react';

/*
 * We can't throw errors in events, callbacks or useEffects, so this hook is used to fix that.
 */
function useThrowError() {
	// eslint-disable-next-line react/hook-use-state
	const [_, setError] = useState<Error | null>(null);

	return useCallback(
		(error: Error) => {
			setError(() => {
				throw error;
			});
		},
		[setError],
	);
}

export default useThrowError;
