import type { ReactNode } from 'react';
import * as Styles from './style';
import ConfigSidebar from '~/components/Config/ConfigSidebar';
import Footer from '~/components/Footer';

type ConfigPageFrameProps = {
	children: ReactNode;
};

function ConfigPageFrame({ children }: ConfigPageFrameProps) {
	return (
		<>
			<Styles.Frame>
				<ConfigSidebar />
				<Styles.Content>{children}</Styles.Content>
			</Styles.Frame>
			<Footer hasMargin={false} />
		</>
	);
}

export default ConfigPageFrame;
