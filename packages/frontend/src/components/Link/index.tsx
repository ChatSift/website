import type { HTMLProps } from 'react';
import React, { useRef } from 'react';
import { useLink } from 'react-aria';
import useCheckedRouter from '~/hooks/useCheckedRouter';

function Link(props: HTMLProps<Element>) {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const { linkProps } = useLink(props, ref);

	return <a {...props} {...linkProps} ref={ref} />;
}

export function RouterLink(props: HTMLProps<Element> & { href: string }) {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const router = useCheckedRouter();

	const effectiveProps = {
		...props,
		onClick: (event: React.MouseEvent) => {
			event.preventDefault();
			void router.push(props.href);
			return props.onClick?.(event);
		},
	};

	const { linkProps } = useLink(effectiveProps, ref);

	return <a {...props} {...linkProps} ref={ref} />;
}

export default Link;
