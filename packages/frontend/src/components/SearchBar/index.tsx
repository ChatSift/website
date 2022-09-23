import { Dispatch, SetStateAction, useRef } from 'react';
import { AriaSearchFieldProps, useSearchField } from 'react-aria';
import { SearchField } from './style';

function SearchBar({
	className,
	state,
	...props
}: { className?: string; state: [string, Dispatch<SetStateAction<string>>] } & AriaSearchFieldProps) {
	const ref = useRef(null);
	const [value, setValue] = state;
	const { inputProps } = useSearchField(props, { value, setValue }, ref);

	return <SearchField className={className} {...inputProps} ref={ref} />;
}

export default SearchBar;
