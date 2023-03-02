import React from 'react';
import * as HeaderStyles from '../style';
import SvgChatSift from '~/svg/SvgChatsift';

function Logo() {
	return (
		<HeaderStyles.Logo href="/">
			<SvgChatSift />
			<HeaderStyles.LogoText tabIndex={0}>ChatSift</HeaderStyles.LogoText>
		</HeaderStyles.Logo>
	);
}

export default Logo;
