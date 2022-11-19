import type { APIGuildTextChannel, GuildTextChannelType } from 'discord-api-types/v10';
import { ChannelType } from 'discord-api-types/v10';
import { useMemo } from 'react';
import ConfigForm from '~/components/Config/ConfigForm';
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

const allowedChannelTypes: GuildTextChannelType[] = [ChannelType.GuildText, ChannelType.GuildForum];

const withIcons = false;
type WithIcons = typeof withIcons;
type ApplicableChannel = APIGuildTextChannel<ChannelType.GuildForum> | APIGuildTextChannel<ChannelType.GuildText>;
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
	const { data: guildInfo, isLoading: isGuildDataLoading } = useGuildInfo();

	const channelOptions = useMemo(() => {
		const channels = (guildInfo?.channels as ApplicableChannel[]) ?? [];

		return channels
			?.sort((a, b) => a.position! - b.position!)
			.filter((channel) => allowedChannelTypes.includes(channel.type))
			.reduce<(DropdownGroupedOptions<false> & { position: number })[]>((acc, channel) => {
				return addToCategoryIfExists(acc, channel, channels);
			}, [])
			.sort((a, b) => a.position - b.position);
	}, [guildInfo?.channels]);

	return (
		<>
			<PageMeta title="ModMail ― Server Settings" />
			<ConfigPageFrame>
				<ConfigForm settingsApiHook={useModmailSettings} onSaveRequested={() => {}}>
					{({ currentValue, setFields }) => (
						<>
							<Text.Heading3>ModMail Settings</Text.Heading3>
							<ConfigOptionCollection>
								<ConfigOption name="Greeting message" caption="The message new tickets are greeted with.">
									<TextArea
										style={{ width: '100%' }}
										value={currentValue?.greetingMessage ?? ''}
										onChange={(event) =>
											setFields({
												greetingMessage: event.target.value,
											})
										}
									/>
								</ConfigOption>
								<ConfigOption name="Farewell message" caption="The message tickets are closed with.">
									<TextArea
										style={{ width: '100%' }}
										value={currentValue?.farewellMessage ?? ''}
										onChange={(event) =>
											setFields({
												farewellMessage: event.target.value,
											})
										}
									/>
								</ConfigOption>
								<ConfigOption name="Modmail channel" caption="The channel new modmails go into? I think?">
									<Dropdown
										hasIcons={false}
										options={channelOptions ?? [{ value: 'loading', label: 'Loading...' }]}
										setSelectedValue={(newModmailChannelId) => setFields({ modmailChannelId: newModmailChannelId })}
										selectedValue={currentValue?.modmailChannelId ?? 'loading'}
										disabled={isGuildDataLoading}
									/>
								</ConfigOption>
								<ConfigOption name="Simple mode" caption="No embeds." input={<input type="checkbox" />} />
							</ConfigOptionCollection>
						</>
					)}
				</ConfigForm>
			</ConfigPageFrame>
		</>
	);
}

export default ModMailSettings;
