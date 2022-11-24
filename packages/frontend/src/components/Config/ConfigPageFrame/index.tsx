import { css, Global } from '@emotion/react';
import type { ReactNode } from 'react';
import * as Styles from './style';
import ConfigSidebar from '~/components/Config/ConfigSidebar';
import Footer from '~/components/Footer';
import ScrollArea from '~/components/ScrollArea';

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

					#content {
						height: 100vh;
					}
				`}
			/>
			<Styles.Frame>
				<ConfigSidebar />
				<Styles.Container>
					<ScrollArea rootClassName={Styles.Content}>
						<Styles.ContentContainer>{children}</Styles.ContentContainer>
					</ScrollArea>
					<Styles.DirtyBarSlot id="dirty-bar" />
				</Styles.Container>
			</Styles.Frame>
			<Footer hasMargin={false} />
		</>
	);
}

export default ConfigPageFrame;
