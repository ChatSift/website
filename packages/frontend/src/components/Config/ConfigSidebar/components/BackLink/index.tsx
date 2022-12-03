import type { ReactNode } from 'react';
import * as Styles from './style';
import SvgArrowLeft from '~/svg/SvgArrowLeft';

type BackLinkProps = { children: ReactNode; href: string };

function BackLink({ href, children }: BackLinkProps) {
	return (
		<Styles.BackLink>
			<Styles.Anchor href={href}>
				<SvgArrowLeft themeColor={(theme) => theme.colors.text.currentColor} />
				<span>{children}</span>
			</Styles.Anchor>
		</Styles.BackLink>
	);
}

export default BackLink;
