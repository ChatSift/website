import { styled, theme } from '~/stitches/stitches.config';

export const BaseSkipLink = styled('a', {
	position: 'fixed',
	top: -200,
	zIndex: 1_000,
	backgroundColor: theme.colors.miscAccent,
	color: theme.colors.textOnAccent,
	padding: '1rem',

	'&:focus': {
		top: 0,
	},
});
