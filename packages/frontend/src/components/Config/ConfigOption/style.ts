import { styled, theme } from '~/stitches/stitches.config';

export const Option = styled('li', {
	displayFlex: 'column',
	paddingX: theme.space.lg,
	paddingY: theme.space.md,
	gap: theme.space.lg,
});

export const OptionHeader = styled('div', {
	displayFlex: 'row',
	flexWrap: 'wrap',
	gap: theme.space.lg,
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const IconAndTag = styled('div', {
	displayFlex: 'row',
	gap: theme.space.lg,
	alignItems: 'center',
	flex: '1 1 auto',
	minWidth: 0,
});

export const Tag = styled('div', {
	displayFlex: 'column',
	justifyContent: 'center',
	flex: '1 1 auto',
	minWidth: 0,
});

export const Content = styled('div', {
	displayFlex: 'column',
	alignItems: 'flex-start',
});
