import * as Styles from '~/components/DashBotUpsell/style';
import bots, { botIcons } from '~/data/bots';
import SvgLinkExternal from '~/svg/SvgLinkExternal';
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
				<Styles.Description>{bot.description.card}</Styles.Description>
			</Styles.Main>
			<Styles.Buttons>
				<Styles.GhostLink href={Urls.botPage(botId)} hasBorder>
					Learn more
				</Styles.GhostLink>
				<Styles.CtaLink href={Urls.botInvite(botId)}>
					<SvgLinkExternal themeColor={(theme) => theme.colors.text.currentColor} /> Add to server
				</Styles.CtaLink>
			</Styles.Buttons>
		</Styles.Upsell>
	);
}

export default DashBotUpsell;
