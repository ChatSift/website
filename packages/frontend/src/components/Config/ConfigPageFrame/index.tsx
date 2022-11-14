import { css, Global } from '@emotion/react';
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
			<Global
				styles={css`
					#__next {
						height: 100vh;
						overflow-y: hidden;
					}
				`}
			/>
			<Styles.Frame>
				<ConfigSidebar />
				<Styles.Content>{children}</Styles.Content>
			</Styles.Frame>
			<Footer hasMargin={false} />
		</>
	);
}

export default ConfigPageFrame;
