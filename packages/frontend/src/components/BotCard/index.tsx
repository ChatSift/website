import type { ReactNode } from 'react';
import * as Styles from './style';
import { Button } from '~/components/Button';

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
		<Styles.BotCardBase>
			<Styles.Title>
				{bot.icon} {bot.name}
			</Styles.Title>
			<Styles.Description>{bot.description}</Styles.Description>
			<Styles.Buttons>
				<Button buttonType="callToAction">Add to server</Button>
				<Button buttonType="ghost" ghostHasBorder>
					Learn more
				</Button>
			</Styles.Buttons>
		</Styles.BotCardBase>
	);
}

export default BotCard;
