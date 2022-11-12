import { default as NextLink } from 'next/link';
import type { HTMLProps } from 'react';
import { useRef } from 'react';
import { useLink } from 'react-aria';

function Link(props: HTMLProps<Element>) {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const { linkProps } = useLink(props, ref);

	return <a {...props} {...linkProps} ref={ref} />;
}

export function RouterLink(props: HTMLProps<Element> & { href: string }) {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const { linkProps } = useLink(props, ref);

	return (
		<NextLink href={props.href}>
			<a {...props} {...linkProps} ref={ref} />
		</NextLink>
	);
}

export default Link;
