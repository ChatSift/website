import * as Styles from '~/components/BotUpsellCard/style';
import { BotTag } from '~/components/BotUpsellCard/style';
import { Text } from '~/components/Text';
import { botIcons } from '~/data/bots';
import { theme } from '~/stitches/stitches.config';
import SvgLinkExternal from '~/svg/SvgLinkExternal';
import { botPage } from '~/utils/urls';

function BotUpsellCard({ bot, pathName }: { bot: Bot; pathName: BotId }) {
	const Icon = botIcons[pathName]!;

	return (
		<Styles.Card
			href={botPage(pathName)}
			cardWidth={{
				'@initial': 'full',
				'@dashboardMaxWidth': 'fixed',
			}}
		>
			<Styles.Header>
				<BotTag kind="heading4" color="primary" weight="bold">
					<Icon width={24} height={24} />
					{bot.name}
				</BotTag>
				<SvgLinkExternal themeColor={theme.colors.textSecondary.toString()} />
			</Styles.Header>
			<Text>{bot.description.otherBotUpsell}</Text>
		</Styles.Card>
	);
}

export default BotUpsellCard;
