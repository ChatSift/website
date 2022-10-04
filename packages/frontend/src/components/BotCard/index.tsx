import type { ReactNode } from 'react';
import * as Button from '../Button';
import { BotCardBase, Buttons, Description, Title } from './style';

export type Bot = {
	description: string;
	icon: ReactNode;
	name: string;
};

type BotCardProps = {
	bot: Bot;
};

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
