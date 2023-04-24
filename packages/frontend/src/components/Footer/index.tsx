import { useEffect, useState } from 'react';
import * as Styles from './style';
import { buttonPadding } from './style';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { theme } from '~/stitches/stitches.config';
import { setThemeWrapper } from '~/stitches/switchTheme';
import SvgDarkTheme from '~/svg/SvgDarkTheme';
import SvgDiscord from '~/svg/SvgDiscord';
import SvgGitHub from '~/svg/SvgGitHub';
import SvgLightTheme from '~/svg/SvgLightTheme';
import { loadSettings } from '~/utils/localUserSettings';

type FooterProps = {
	hasMargin?: boolean;
};

function Footer({ hasMargin = true }: FooterProps) {
	const [currentThemeName, setCurrentThemeName] = useState('dark');

	useEffect(() => {
		setCurrentThemeName(loadSettings().theme);
	}, []);

	return (
		<Styles.Footer
			hasMargin={hasMargin}
			mobile={{
				'@initial': false,
				'@small': true,
			}}
		>
			<noscript>
				<style>
					{`
						#theme-settings {
							display: none;
						}
					`}
				</style>
			</noscript>
			<Styles.CopyrightNotice>© ChatSift, 2022 - Present</Styles.CopyrightNotice>
			<Styles.ButtonsAndLinks>
				<Styles.List>
					<Styles.IconLink href="/github">
						<SvgGitHub themeColor={theme.colors.textDisabled.toString()} />
					</Styles.IconLink>
					<Styles.IconLink href="/support">
						<SvgDiscord themeColor={theme.colors.textDisabled.toString()} />
					</Styles.IconLink>
				</Styles.List>
				<Styles.SecondGroup id="theme-settings">
					<Text>Theme:</Text>
					<Button
						buttonType="ghost"
						form="extraSmall"
						paddingOverride={{ x: buttonPadding, y: buttonPadding }}
						onPress={() => {
							setThemeWrapper(currentThemeName === 'dark' ? 'light' : 'dark');
							setCurrentThemeName(currentThemeName === 'dark' ? 'light' : 'dark');
						}}
					>
						{currentThemeName === 'dark' ? (
							<SvgDarkTheme themeColor={theme.colors.textPrimary.toString()} />
						) : (
							<SvgLightTheme themeColor={theme.colors.textPrimary.toString()} />
						)}
					</Button>
				</Styles.SecondGroup>
			</Styles.ButtonsAndLinks>
		</Styles.Footer>
	);
}

export default Footer;
