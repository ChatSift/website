import type { Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';
import type { AriaSearchFieldProps } from 'react-aria';
import { useSearchField } from 'react-aria';
import * as Styles from './style';

function SearchBar({
	className,
	state,
	...props
}: AriaSearchFieldProps & { className?: string; state: [string, Dispatch<SetStateAction<string>>] }) {
	const ref = useRef(null);
	const [value, setValue] = state;
	const { inputProps } = useSearchField(props, { value, setValue }, ref);

	return (
		<Styles.SearchContainer className={className}>
			<Styles.SearchField {...inputProps} ref={ref} />
			<Styles.Icon />
		</Styles.SearchContainer>
	);
}

export default SearchBar;
