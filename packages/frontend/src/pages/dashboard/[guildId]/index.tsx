import styled from '@emotion/styled';
import Link from 'next/link';
import ButtonLink from '~/components/ButtonLink';
import ConfigGuildCard from '~/components/Config/ConfigGuildCard';
import ConfigOption from '~/components/Config/ConfigOption';
import { ConfigOptionCollection } from '~/components/Config/ConfigOptionCollection';
import ConfigPageFrame from '~/components/Config/ConfigPageFrame';
import ConfigSection from '~/components/Config/ConfigSection';
import PageMeta from '~/components/PageMeta';
import { Text } from '~/components/Text';
import useConfigGuild from '~/hooks/useConfigGuild';
import { theme } from '~/stitches/stitches.config';
import SvgAma from '~/svg/SvgAma';
import SvgAutoModerator from '~/svg/SvgAutoModerator';
import SvgCog from '~/svg/SvgCog';
import SvgModmail from '~/svg/SvgModmail';
import * as Urls from '~/utils/urls';

const ComingSoonTag = styled.span`
	padding: 2px 8px;
	background-color: ${(props) => props.theme.colors.onBackground.tertiary};
	border: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
	border-radius: 400px;
	color: ${(props) => props.theme.colors.text.secondary};
`;

type ManageButtonProps = {
	botId: BotId;
	guildId: string | undefined;
	isComingSoon?: boolean;
	isInvited: boolean;
	isLoading: boolean;
	page: string;
};

function BotButton({ isLoading, isComingSoon, isInvited, guildId, botId, page }: ManageButtonProps) {
	const url = guildId ? Urls.dashboard.botPage(guildId, botId, page) : 'loading';

	if (!isInvited) {
		return (
			<Link href={Urls.botInvite(botId)}>
				<ButtonLink.Ghost disabled={isLoading} href={Urls.botInvite(botId)} hasBorder external>
					Invite
				</ButtonLink.Ghost>
			</Link>
		);
	}

	if (isComingSoon) {
		return <ComingSoonTag>Coming soon</ComingSoonTag>;
	}

	return (
		<Link href={url}>
			<ButtonLink.Cta disabled={isLoading} href={url}>
				<SvgCog themeColor={theme.colors.textOnAccent.toString()} /> Manage
			</ButtonLink.Cta>
		</Link>
	);
}

function GuildDashboard() {
	const { guild, isLoading } = useConfigGuild();

	return (
		<>
			<PageMeta title="Server Settings" />
			<ConfigPageFrame>
				<Text kind="heading3" color="primary" weight="bold">
					Server Settings
				</Text>
				<ConfigGuildCard wide />
				<ConfigSection title="Bots" description="Configure the settings of supported bots for this community.">
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
									page="settings"
									isComingSoon
								/>
							}
						/>
						<ConfigOption
							isLoading={isLoading}
							icon={<SvgAma width={26} height={29} />}
							name="AMA"
							caption={guild?.hasAma ? 'Invited' : 'Not invited'}
							input={
								<BotButton
									isLoading={isLoading}
									isInvited={guild?.hasAma ?? false}
									guildId={guild?.id}
									botId="ama"
									page="settings"
									isComingSoon
								/>
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
									page="settings"
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
