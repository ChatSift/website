import { Button } from '~/components/Button';
import { ButtonLink } from '~/components/ButtonLink';
import * as Styles from '~/components/DashBotUpsell/style';
import { Text } from '~/components/Text';
import bots, { botIcons } from '~/data/bots';
import * as Urls from '~/utils/urls';

type DashBotUpsellProps = {
	botId: BotId;
};

function DashBotUpsell({ botId }: DashBotUpsellProps) {
	const Icon = botIcons[botId]!;
	const bot = bots[botId];

	return (
		<Styles.Upsell
			direction={{
				'@initial': 'column',
				'@dashboardMaxWidth': 'row',
			}}
		>
			<Styles.Main>
				<Styles.Title kind="heading4" color="primary" weight="bold">
					<Icon width={24} height={24} />
					{bot.name}
				</Styles.Title>
				<Text>{bot.description.card}</Text>
			</Styles.Main>
			<Styles.Buttons
				direction={{
					'@initial': 'column',
					'@small': 'row',
				}}
			>
				<Button as={ButtonLink} buttonType="ghost" href={Urls.botPage(botId)} ghostHasBorder external>
					Learn more
				</Button>
				<Button as={ButtonLink} buttonType="callToAction" href={Urls.botInvite(botId)} external>
					Add to server
				</Button>
			</Styles.Buttons>
		</Styles.Upsell>
	);
}

export default DashBotUpsell;
