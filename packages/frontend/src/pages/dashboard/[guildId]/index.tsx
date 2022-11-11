import { Global, css } from '@emotion/react';
import ConfigPageFrame from '~/components/ConfigPageFrame';

function GuildDashboard() {
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
			<ConfigPageFrame>
				<></>
			</ConfigPageFrame>
		</>
	);
}

export default GuildDashboard;
