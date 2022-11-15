import type { GuildSettings } from '@chatsift/modmail-api';
import styled from '@emotion/styled';
import type { APIChannel, APIDMChannel, APIGroupDMChannel } from 'discord-api-types/v10';
import { useEffect, useMemo, useState } from 'react';
import ConfigOption from '~/components/Config/ConfigOption';
import { ConfigOptionCollection } from '~/components/Config/ConfigOptionCollection';
import ConfigPageFrame from '~/components/Config/ConfigPageFrame';
import { TextArea } from '~/components/Config/TextArea';
import type { DropdownGroupedOptions } from '~/components/Dropdown';
import Dropdown from '~/components/Dropdown';
import PageMeta from '~/components/PageMeta';
import * as Text from '~/components/Text';
import useGuildInfo from '~/hooks/useGuildInfo';
import useModmailSettings from '~/hooks/useModmailSettings';

const Code = styled.code`
	color: ${(props) => props.theme.colors.text.primary};
`;

const allowedChannelTypes = [
	0, // GUILD_TEXT
	15, // GUILD_FORUM
];

const withIcons = false;
type WithIcons = typeof withIcons;
type ApplicableChannel = Exclude<APIChannel, APIDMChannel | APIGroupDMChannel>;
type GroupedChannels = (DropdownGroupedOptions<WithIcons> & { position: number })[];

function addToCategoryIfExists(
	acc: GroupedChannels,
	channel: ApplicableChannel,
	channels: ApplicableChannel[],
): GroupedChannels {
	if (!acc.some(({ id }) => id === (channel.parent_id ?? '0'))) {
		const category = channels.find(({ id }) => id === channel.parent_id);

		return [
			...acc,
			{
				id: channel.parent_id ?? '0',
				label: category?.name?.toUpperCase() ?? 'UNCATEGORIZED',
				position: category?.position ?? -1,
				options: [
					{
						value: channel.id,
						label: channel.name ?? 'Unknown Channel',
					},
				],
			},
		];
	}

	acc
		.find(({ id }) => id === (channel.parent_id ?? '0'))!
		.options.push({
			value: channel.id,
			label: channel.name ?? 'Unknown Channel',
		});
	return acc;
}

function ModMailSettings() {
	const { data: modmailSettings, isLoading: areSettingsLoading } = useModmailSettings();
	const { data: guildInfo, isLoading: isGuildDataLoading } = useGuildInfo();
	const [newSettings, setNewSettings] = useState<GuildSettings | null>(null);

	useEffect(() => {
		if (!areSettingsLoading && modmailSettings && !newSettings) {
			setNewSettings(modmailSettings);
		}
	}, [areSettingsLoading, modmailSettings, newSettings]);

	function changeModmailChannel(channelId: string) {
		console.log(channelId);

		setNewSettings((prev) => ({ ...prev!, modmailChannelId: channelId }));
	}

	const channelOptions = useMemo(() => {
		const channels = (guildInfo?.channels as ApplicableChannel[]) ?? [];

		return (
			channels
				// @ts-expect-error TS2339: docs: "may be missing for some channel objects received over gateway guild dispatches", not applicable to us
				?.sort((a, b) => a.position - b.position)
				.filter((channel) => allowedChannelTypes.includes(channel.type))
				.reduce<(DropdownGroupedOptions<false> & { position: number })[]>((acc, channel) => {
					return addToCategoryIfExists(acc, channel, channels);
				}, [])
				.sort((a, b) => a.position - b.position)
		);
	}, [guildInfo?.channels]);

	return (
		<>
			<PageMeta title="ModMail ― Server Settings" />
			<ConfigPageFrame>
				<Text.Heading3>ModMail Settings</Text.Heading3>
				<ConfigOptionCollection>
					<ConfigOption name="Greeting message" caption="The message new tickets are greeted with.">
						<TextArea style={{ width: '100%' }} />
					</ConfigOption>
					<ConfigOption name="Farewell message" caption="The message tickets are closed with.">
						<TextArea style={{ width: '100%' }} />
					</ConfigOption>
					<ConfigOption name="Modmail channel" caption="The channel new modmails go into? I think?">
						<Dropdown
							hasIcons={false}
							options={channelOptions ?? [{ value: 'loading', label: 'Loading...' }]}
							setSelectedValue={changeModmailChannel}
							selectedValue={newSettings?.modmailChannelId ?? 'loading'}
							disabled={isGuildDataLoading}
						/>
					</ConfigOption>
					<ConfigOption name="Simple mode" caption="No embeds." input={<input type="checkbox" />} />
				</ConfigOptionCollection>
				<Code>
					<pre>{JSON.stringify(modmailSettings, null, 2)}</pre>
				</Code>
			</ConfigPageFrame>
		</>
	);
}

export default ModMailSettings;
