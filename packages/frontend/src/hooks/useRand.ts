import { useEffect, useState } from 'react';

function useRand(min: number, max: number): number {
	const [rand, setRand] = useState(0);

	useEffect(() => {
		setRand(Math.floor(Math.random() * (max - min + 1)) + min);
	}, [min, max]);

	return rand;
}

export default useRand;
