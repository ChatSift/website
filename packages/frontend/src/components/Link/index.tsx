import type { HTMLProps } from 'react';
import React, { useRef } from 'react';
import { useLink } from 'react-aria';
import useCheckedRouter from '~/hooks/useCheckedRouter';

function Link(props: HTMLProps<Element>) {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const { linkProps } = useLink(props, ref);

	return <a {...props} {...linkProps} ref={ref} />;
}

export type RouterLinkProps = HTMLProps<Element> & { hasBorder?: boolean; href: string };

export function RouterLink({ hasBorder, ...props }: RouterLinkProps) {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const router = useCheckedRouter();

	function onClick(event: React.MouseEvent) {
		// treats it as a normal link if target is _blank
		if (props.target !== '_blank') {
			event.preventDefault();
			void router.push(props.href);
		}

		return props.onClick?.(event);
	}

	return <a {...props} onClick={onClick} ref={ref} />;
}

export default Link;
