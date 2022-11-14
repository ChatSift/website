import Link from 'next/link';
import type { ReactNode } from 'react';
import * as Styles from './style';
import SvgArrowLeft from '~/svg/SvgArrowLeft';

type BackLinkProps = { children: ReactNode; href: string };

function BackLink({ href, children }: BackLinkProps) {
	return (
		<Styles.BackLink>
			<Link href={href}>
				<Styles.Anchor href={href}>
					<SvgArrowLeft />
					<span>{children}</span>
				</Styles.Anchor>
			</Link>
		</Styles.BackLink>
	);
}

export default BackLink;
