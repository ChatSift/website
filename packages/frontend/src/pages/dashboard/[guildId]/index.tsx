import { Global, css } from '@emotion/react';
import Link from 'next/link';
import * as Button from '~/components/Button';
import ConfigGuildCard from '~/components/Config/ConfigGuildCard';
import ConfigOption from '~/components/Config/ConfigOption';
import { ConfigOptionCollection } from '~/components/Config/ConfigOptionCollection';
import ConfigPageFrame from '~/components/Config/ConfigPageFrame';
import ConfigSection from '~/components/Config/ConfigSection';
import PageMeta from '~/components/PageMeta';
import * as Text from '~/components/Text';
import useConfigGuild from '~/hooks/useConfigGuild';
import SvgAma from '~/svg/SvgAma';
import SvgArrowRight from '~/svg/SvgArrowRight';
import SvgAutoModerator from '~/svg/SvgAutoModerator';
import SvgCog from '~/svg/SvgCog';
import SvgModmail from '~/svg/SvgModmail';
import * as Urls from '~/utils/urls';

const CtaLink = Button.Cta.withComponent('a');
const GhostLink = Button.Ghost.withComponent('a');

type ManageButtonProps = {
	botId: string;
	guildId: string | undefined;
	isInvited: boolean;
	isLoading: boolean;
};

function BotButton({ isLoading, isInvited, guildId, botId }: ManageButtonProps) {
	const url = guildId ? Urls.dashboard.bot(guildId, botId) : 'loading';

	if (!isInvited) {
		return (
			<Link href={Urls.botInvite(botId)}>
				<GhostLink disabled={isLoading} href={Urls.botInvite(botId)} hasBorder>
					<SvgArrowRight themeColor={(theme) => theme.colors.text.secondary} />
					Invite
				</GhostLink>
			</Link>
		);
	}

	return (
		<Link href={url}>
			<CtaLink disabled={isLoading} href={url}>
				<SvgCog themeColor={(theme) => theme.colors.text.onAccent} /> Manage
			</CtaLink>
		</Link>
	);
}

function GuildDashboard() {
	const { guild, isLoading } = useConfigGuild();

	return (
		<>
			<Global
				styles={css`
					#__next {
						height: 100vh;
						overflow-y: hidden;
					}
				`}
			/>
			<PageMeta title="Server Settings" />
			<ConfigPageFrame>
				<Text.Heading3>Server Settings</Text.Heading3>
				<ConfigGuildCard wide />
				<ConfigSection title="Bots" description="Choose a bot to manage, or something. Idk I'm not the copywriter.">
					<ConfigOptionCollection>
						<ConfigOption
							isLoading={isLoading}
							icon={<SvgAutoModerator width={26} height={29} />}
							name="AutoModerator"
							caption={guild?.hasAutomoderator ? 'Invited' : 'Not invited'}
							input={
								<BotButton
									isLoading={isLoading}
									isInvited={guild?.hasAutomoderator ?? false}
									guildId={guild?.id}
									botId="automoderator"
								/>
							}
						/>
						<ConfigOption
							isLoading={isLoading}
							icon={<SvgAma width={26} height={29} />}
							name="AMA"
							caption={guild?.hasAma ? 'Invited' : 'Not invited'}
							input={
								<BotButton isLoading={isLoading} isInvited={guild?.hasAma ?? false} guildId={guild?.id} botId="ama" />
							}
						/>
						<ConfigOption
							isLoading={isLoading}
							icon={<SvgModmail width={26} height={29} />}
							name="Modmail"
							caption={guild?.hasModmail ? 'Invited' : 'Not invited'}
							input={
								<BotButton
									isLoading={isLoading}
									isInvited={guild?.hasModmail ?? false}
									guildId={guild?.id}
									botId="modmail"
								/>
							}
						/>
					</ConfigOptionCollection>
				</ConfigSection>
			</ConfigPageFrame>
		</>
	);
}

export default GuildDashboard;
