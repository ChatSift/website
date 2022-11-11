import type { ReactNode } from 'react';
import { NavMenu } from '~/components/Sidebar/Desktop/style';

type SidebarDesktopProps = {
	children: ReactNode;
	className?: string;
};

function SidebarDesktop({ children, className }: SidebarDesktopProps) {
	return <NavMenu className={className}>{children}</NavMenu>;
}

export default SidebarDesktop;
