import type { ReactNode } from 'react';
import * as Styles from './style';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';

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
		<Styles.BotCard>
			<Styles.Title kind="heading3" weight="bold" color="primary">
				{bot.icon} {bot.name}
			</Styles.Title>
			<Text>{bot.description}</Text>
			<Styles.Buttons>
				<Button buttonType="callToAction">Add to server</Button>
				<Button buttonType="ghost" ghostHasBorder>
					Learn more
				</Button>
			</Styles.Buttons>
		</Styles.BotCard>
	);
}

export default BotCard;
