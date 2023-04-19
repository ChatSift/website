import type { ReactNode } from 'react';
import { mobileThreshold } from '~/components/Sidebar';
import * as Styles from '~/components/Sidebar/Desktop/style';

type SidebarDesktopProps = {
	children: ReactNode;
	className?: string;
};

function SidebarDesktop({ children, className }: SidebarDesktopProps) {
	return (
		<Styles.NavMenu
			className={className}
			visible={{
				'@initial': false,
				[mobileThreshold]: true,
			}}
		>
			{children}
		</Styles.NavMenu>
	);
}

export default SidebarDesktop;
