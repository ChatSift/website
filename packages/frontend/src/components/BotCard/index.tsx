import type { ReactNode } from 'react';
import { BotCardBase, Buttons, Description, Title } from './style';
import * as Button from '../Button';

export interface Bot {
	name: string;
	description: string;
	icon: ReactNode;
}

interface BotCardProps {
	bot: Bot;
}

function BotCard({ bot }: BotCardProps) {
	return (
		<BotCardBase>
			<Title>
				{bot.icon} {bot.name}
			</Title>
			<Description>{bot.description}</Description>
			<Buttons>
				<Button.Cta paddingOverride={{ x: 14 }}>Add to server</Button.Cta>
				<Button.Ghost paddingOverride={{ x: 14 }} hasBorder>
					Learn more
				</Button.Ghost>
			</Buttons>
		</BotCardBase>
	);
}

export default BotCard;
