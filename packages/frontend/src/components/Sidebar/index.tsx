import type { ReactNode } from 'react';
import { MobileHeaderOverride } from '~/components/Header';
import SidebarDesktop from '~/components/Sidebar/Desktop/desktop';
import SidebarMobile from '~/components/Sidebar/Mobile/mobile';

type SidebarProps = {
	children: ReactNode;
	className?: string;
};

export const mobileThreshold = '@medium';

function Sidebar({ children, className }: SidebarProps) {
	return (
		<>
			<SidebarDesktop className={className}>{children}</SidebarDesktop>
			<MobileHeaderOverride>
				<SidebarMobile className={className}>{children}</SidebarMobile>
			</MobileHeaderOverride>
		</>
	);
}

export default Sidebar;
