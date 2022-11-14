import styled from '@emotion/styled';
import ConfigPageFrame from '~/components/Config/ConfigPageFrame';
import PageMeta from '~/components/PageMeta';
import * as Text from '~/components/Text';
import useModmailSettings from '~/hooks/useModmailSettings';

const Code = styled.code`
	color: ${(props) => props.theme.colors.text.primary};
`;

function ModMailSettings() {
	const modmailSettings = useModmailSettings();

	return (
		<>
			<PageMeta title="ModMail ― Server Settings" />
			<ConfigPageFrame>
				<Text.Heading3>ModMail Settings</Text.Heading3>
				<Code>
					<pre>{JSON.stringify(modmailSettings, null, 2)}</pre>
				</Code>
			</ConfigPageFrame>
		</>
	);
}

export default ModMailSettings;
