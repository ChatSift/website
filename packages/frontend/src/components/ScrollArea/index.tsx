import type { ReactNode } from 'react';
import * as Styles from '~/components/ScrollArea/style';

type ScrollAreaProps = {
	children: ReactNode;
	className?: string;
};

function ScrollArea({ children, className }: ScrollAreaProps) {
	return (
		<Styles.Root>
			<Styles.ViewPort className={className}>{children}</Styles.ViewPort>
			<Styles.Scrollbar orientation="vertical">
				<Styles.Thumb />
			</Styles.Scrollbar>
			<Styles.Scrollbar orientation="horizontal">
				<Styles.Thumb />
			</Styles.Scrollbar>
			<Styles.Corner />
		</Styles.Root>
	);
}

export default ScrollArea;
