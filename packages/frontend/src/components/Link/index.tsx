import type { HTMLProps} from 'react';
import { useRef } from 'react';
import { useLink } from 'react-aria';

function Link(props: HTMLProps<Element>) {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const { linkProps } = useLink(props, ref);

	return <a {...props} {...linkProps} ref={ref} />;
}

export default Link;
