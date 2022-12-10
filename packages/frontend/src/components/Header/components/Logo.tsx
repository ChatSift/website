import React from 'react';
import * as HeaderStyles from '../style';
import { LogoBase } from '../style';
import { RouterLink } from '~/components/Link';
import SvgChatSift from '~/svg/SvgChatsift';

function Logo() {
	return (
		<RouterLink href="/" className={LogoBase}>
			<SvgChatSift />
			<HeaderStyles.LogoText tabIndex={0}>ChatSift</HeaderStyles.LogoText>
		</RouterLink>
	);
}

export default Logo;
