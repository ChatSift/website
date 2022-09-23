import { useContext } from 'react';
import { buttonPadding, ButtonsAndLinks, CopyrightNotice, FooterBase, IconLink, List, SecondGroup } from './style';
import { ThemeContext } from '../../pages/_app';
import dark from '../../themes/dark';
import light from '../../themes/light';
import * as Button from '../Button';
import SvgDarkTheme from '~/svg/SvgDarkTheme';
import SvgDiscord from '~/svg/SvgDiscord';
import SvgGitHub from '~/svg/SvgGitHub';
import SvgLightTheme from '~/svg/SvgLightTheme';
import SvgThemeSeparator from '~/svg/SvgThemeSeparator';

function Footer() {
	const theme = useContext(ThemeContext);

	return (
		<FooterBase>
			<CopyrightNotice>© Chatsift, 2022 - Present</CopyrightNotice>
			<ButtonsAndLinks>
				<List>
					<IconLink href="/github">
						<SvgGitHub />
					</IconLink>
					<IconLink href="/support">
						<SvgDiscord />
					</IconLink>
				</List>
				<SecondGroup>
					<Button.Ghost paddingOverride={{ x: buttonPadding, y: buttonPadding }} onPress={() => theme.update(light)}>
						<SvgLightTheme />
					</Button.Ghost>
					<SvgThemeSeparator />
					<Button.Ghost paddingOverride={{ x: buttonPadding, y: buttonPadding }} onPress={() => theme.update(dark)}>
						<SvgDarkTheme />
					</Button.Ghost>
				</SecondGroup>
			</ButtonsAndLinks>
		</FooterBase>
	);
}

export default Footer;
