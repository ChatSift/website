import { Frame } from '~/components/Config/ConfigPageFrame/style';
import { styled, theme } from '~/stitches/stitches.config';

export const Base = styled(Frame, {
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	gap: theme.space.lg,
});

export const Title = styled('span', {
	color: theme.colors.textPrimary,
	fontSize: theme.fontSizes.five,
});

export const Description = styled('span', {
	color: theme.colors.textSecondary,
	fontSize: theme.fontSizes.four,
});

export const Buttons = styled('div', {
	displayFlex: 'row',
	gap: theme.space.lg,
	marginTop: theme.space.lg,
	alignItems: 'center',
	flexWrap: 'wrap',
});
