import type { ReactNode } from 'react';
import FrameErrorFallback from './components/FrameErrorBoundary';
import * as Styles from './style';
import ConfigSidebar from '~/components/Config/ConfigSidebar';
import ErrorBoundary from '~/components/ErrorBoundary';
import Footer from '~/components/Footer';
import ScrollArea from '~/components/ScrollArea';
import * as Text from '~/components/Text';

type ConfigPageFrameProps = {
	children: ReactNode;
};

function ConfigPageFrame({ children }: ConfigPageFrameProps) {
	return (
		<>
			<style>
				{`
					#__next {
						height: 100vh;
						overflow-y: hidden;
					}

					#content {
						height: 100vh;
					}
				`}
			</style>
			<noscript>
				<style>
					{`
						#frame {
							display: none;
						}
					`}
				</style>
			</noscript>
			<ErrorBoundary errorFallback={FrameErrorFallback}>
				<Styles.Frame id="frame">
					<ConfigSidebar />
					<Styles.Container
						padding={{
							'@initial': 'small',
							'@small': 'large',
						}}
					>
						<ScrollArea rootClassName={Styles.Content()}>
							<Styles.ContentContainer id="content-container">{children}</Styles.ContentContainer>
						</ScrollArea>
						<Styles.DirtyBarSlot id="dirty-bar" />
					</Styles.Container>
				</Styles.Frame>
			</ErrorBoundary>
			<Styles.NoScript>
				<Text.Body.Bold>JavaScript is required for this page to work</Text.Body.Bold>
			</Styles.NoScript>
			<Footer hasMargin={false} />
		</>
	);
}

export default ConfigPageFrame;
