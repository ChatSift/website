import * as Styles from '~/components/BotUpsellCard/style';
import { BotTag } from '~/components/BotUpsellCard/style';
import { botIcons } from '~/data/bots';
import SvgLinkExternal from '~/svg/SvgLinkExternal';
import { botPage } from '~/utils/urls';

function BotUpsellCard({ bot, pathName }: { bot: Bot; pathName: BotId }) {
	const Icon = botIcons[pathName]!;

	return (
		<Styles.Base href={botPage(pathName)}>
			<Styles.Header>
				<BotTag>
					<Icon width={24} height={24} />
					{bot.name}
				</BotTag>
				<SvgLinkExternal themeColor={(theme) => theme.colors.text.secondary} />
			</Styles.Header>
			<Styles.UpsellDescription>{bot.description.otherBotUpsell}</Styles.UpsellDescription>
		</Styles.Base>
	);
}

export default BotUpsellCard;
