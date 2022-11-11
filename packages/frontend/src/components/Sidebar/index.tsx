import type { ReactNode } from 'react';
import SidebarDesktop from '~/components/Sidebar/Desktop/desktop';
import SidebarMobile from '~/components/Sidebar/Mobile/mobile';

type SidebarProps = {
	children: ReactNode;
	className?: string;
	open: boolean;
	setOpen(open: boolean): void;
};

function Sidebar({ children, className, open, setOpen }: SidebarProps) {
	return (
		<>
			<SidebarDesktop className={className}>{children}</SidebarDesktop>
			<SidebarMobile className={className} open={open} setOpen={setOpen}>
				{children}
			</SidebarMobile>
		</>
	);
}

export default Sidebar;
