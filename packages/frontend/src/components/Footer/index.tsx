import { useContext } from 'react';
import * as Button from '../Button';
import * as Styles from './style';
import { buttonPadding } from './style';
import { ThemeContext } from '~/pages/_app';
import SvgDarkTheme from '~/svg/SvgDarkTheme';
import SvgDiscord from '~/svg/SvgDiscord';
import SvgGitHub from '~/svg/SvgGitHub';
import SvgLightTheme from '~/svg/SvgLightTheme';
import SvgThemeSeparator from '~/svg/SvgThemeSeparator';
import dark from '~/themes/dark';
import light from '~/themes/light';

type FooterProps = {
	hasMargin?: boolean;
};

function Footer({ hasMargin = true }: FooterProps) {
	const theme = useContext(ThemeContext);

	return (
		<Styles.Footer data-has-margin={hasMargin}>
			<Styles.CopyrightNotice>© Chatsift, 2022 - Present</Styles.CopyrightNotice>
			<Styles.ButtonsAndLinks>
				<Styles.List>
					<Styles.IconLink href="/github">
						<SvgGitHub />
					</Styles.IconLink>
					<Styles.IconLink href="/support">
						<SvgDiscord />
					</Styles.IconLink>
				</Styles.List>
				<Styles.SecondGroup>
					<Button.Ghost paddingOverride={{ x: buttonPadding, y: buttonPadding }} onPress={() => theme.update(light)}>
						<SvgLightTheme />
					</Button.Ghost>
					<SvgThemeSeparator />
					<Button.Ghost paddingOverride={{ x: buttonPadding, y: buttonPadding }} onPress={() => theme.update(dark)}>
						<SvgDarkTheme />
					</Button.Ghost>
				</Styles.SecondGroup>
			</Styles.ButtonsAndLinks>
		</Styles.Footer>
	);
}

export default Footer;
