import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import type { APIGuildTextChannel } from 'discord-api-types/v10';
import { ChannelType } from 'discord-api-types/v10';
import { useMemo } from 'react';
import ConfigForm from '~/components/Config/ConfigForm';
import ConfigOption from '~/components/Config/ConfigOption';
import { ConfigOptionCollection } from '~/components/Config/ConfigOptionCollection';
import ConfigPageFrame from '~/components/Config/ConfigPageFrame';
import { TextArea } from '~/components/Config/TextArea';
import type { DropdownGroupedOptions } from '~/components/Dropdown';
import Dropdown from '~/components/Dropdown';
import { itemIcon } from '~/components/Dropdown/style';
import PageMeta from '~/components/PageMeta';
import * as Text from '~/components/Text';
import useGuildInfo from '~/hooks/useGuildInfo';
import useModmailSettings from '~/hooks/useModmailSettings';
import SvgForumChannel from '~/svg/SvgForumChannel';
import SvgTextChannel from '~/svg/SvgTextChannel';

const allowedChannelTypes = [ChannelType.GuildText, ChannelType.GuildForum] as const;

const channelIcons: Record<typeof allowedChannelTypes[number], EmotionJSX.Element> = {
	[ChannelType.GuildText]: (
		<SvgTextChannel themeColor={(theme) => theme.colors.text.currentColor} className={itemIcon} />
	),
	[ChannelType.GuildForum]: (
		<SvgForumChannel themeColor={(theme) => theme.colors.text.currentColor} className={itemIcon} />
	),
};

const withIcons = true;
type WithIcons = typeof withIcons;
type ApplicableChannel = APIGuildTextChannel<typeof allowedChannelTypes[number]>;
type GroupedChannels = (DropdownGroupedOptions<WithIcons> & { position: number })[];

const optionsFallback = [{ value: 'loading', label: 'Loading...' }];

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
						icon: channelIcons[channel.type],
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
			icon: channelIcons[channel.type],
		});
	return acc;
}

function ModMailSettings() {
	const { data: guildInfo, isLoading: isGuildDataLoading } = useGuildInfo();

	const roleOptions = useMemo(
		() =>
			guildInfo?.roles
				.filter(({ name, managed }) => name !== '@everyone' && !managed)
				.sort((a, b) => a.position + b.position)
				.map(({ id, name }) => ({ value: id, label: name })) ?? optionsFallback,
		[guildInfo?.roles],
	);

	const channelOptions = useMemo(() => {
		const channels = (guildInfo?.channels as ApplicableChannel[]) ?? [];

		return (
			channels
				?.sort((a, b) => a.position! - b.position!)
				.filter((channel) => allowedChannelTypes.includes(channel.type))
				.reduce<(DropdownGroupedOptions<WithIcons> & { position: number })[]>((acc, channel) => {
					return addToCategoryIfExists(acc, channel, channels);
				}, [])
				.sort((a, b) => a.position - b.position) ?? optionsFallback
		);
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
										hasIcons={true}
										hasNoneOption={true}
										options={channelOptions}
										setSelectedValue={(modmailChannelId) => setFields({ modmailChannelId })}
										selectedValue={currentValue?.modmailChannelId ?? undefined}
										disabled={isGuildDataLoading}
									/>
								</ConfigOption>
								<ConfigOption
									name="Alert role"
									caption="The role that gets alerted on new modmails, or something of the sort."
								>
									<Dropdown
										hasIcons={false}
										hasNoneOption={true}
										options={roleOptions}
										setSelectedValue={(alertRoleId) => setFields({ alertRoleId })}
										selectedValue={currentValue?.alertRoleId ?? undefined}
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
