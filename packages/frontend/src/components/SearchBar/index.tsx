import type { Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';
import type { AriaSearchFieldProps } from 'react-aria';
import { useSearchField } from 'react-aria';
import { SearchField } from './style';

function SearchBar({
	className,
	state,
	...props
}: AriaSearchFieldProps & { className?: string; state: [string, Dispatch<SetStateAction<string>>] }) {
	const ref = useRef(null);
	const [value, setValue] = state;
	const { inputProps } = useSearchField(props, { value, setValue }, ref);

	return <SearchField className={className} {...inputProps} ref={ref} />;
}

export default SearchBar;
