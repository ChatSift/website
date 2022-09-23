import Link from 'next/link';
import type React from 'react';
import * as HeaderStyles from './style';
import { LogoBase } from './style';
import SvgChatSift from '~/svg/SvgChatsift';

function Logo() {
	return (
		<Link href="/">
			<a href="/" className={LogoBase}>
				<SvgChatSift />
				<HeaderStyles.LogoText tabIndex={0}>Chatsift</HeaderStyles.LogoText>
			</a>
		</Link>
	);
}

export default Logo;
