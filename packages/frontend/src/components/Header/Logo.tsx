import type React from 'react';
import type { ElementType } from 'react';
import * as HeaderStyles from './style';
import { LogoBase } from './style';
import SvgChatSift from '~/svg/SvgChatsift';

function Logo({ as: Tag }: { as: ElementType }) {
	return (
		<Tag className={LogoBase}>
			<SvgChatSift />
			<HeaderStyles.LogoText tabIndex={0}>Chatsift</HeaderStyles.LogoText>
		</Tag>
	);
}

export default Logo;
