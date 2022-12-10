import ButtonLink from '~/components/ButtonLink';
import * as Styles from '~/components/DashBotUpsell/style';
import * as Text from '~/components/Text';
import bots, { botIcons } from '~/data/bots';
import * as Urls from '~/utils/urls';

type DashBotUpsellProps = {
	botId: BotId;
};

function DashBotUpsell({ botId }: DashBotUpsellProps) {
	const Icon = botIcons[botId]!;
	const bot = bots[botId];

	return (
		<Styles.Upsell>
			<Styles.Main>
				<Styles.Title>
					<Icon width={24} height={24} />
					{bot.name}
				</Styles.Title>
				<Text.Body.Regular>{bot.description.card}</Text.Body.Regular>
			</Styles.Main>
			<Styles.Buttons>
				<ButtonLink.Ghost href={Urls.botPage(botId)} hasBorder external>
					Learn more
				</ButtonLink.Ghost>
				<ButtonLink.Cta href={Urls.botInvite(botId)} external>
					Add to server
				</ButtonLink.Cta>
			</Styles.Buttons>
		</Styles.Upsell>
	);
}

export default DashBotUpsell;
