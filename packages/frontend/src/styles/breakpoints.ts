import { dashboardMaxWidth, smallestDashboardWidth } from '~/utils/constants';

export const mediaQueriesRaw = {
	extraSmall: 320,
	small: 650,
	medium: 800,
	smallestDashboardWidth,
	dashboardMaxWidth,
} as const;

type MediaQueries = {
	[key in keyof typeof mediaQueriesRaw as `${key}Min`]: string;
} & { [key in keyof typeof mediaQueriesRaw as `${key}Max`]: string };

type StitchesMediaQueries = {
	[key in keyof typeof mediaQueriesRaw]: string;
};

const mediaQueries = Object.entries(mediaQueriesRaw)
	.map(([key, value]) => ({
		[`${key}Min`]: `@media (min-width: ${value}px)`,
		[`${key}Max`]: `@media (max-width: ${value}px)`,
	}))
	.reduce((acc, next) => ({ ...acc, ...next }), {}) as MediaQueries;

export const stitchesMediaQueries = Object.entries(mediaQueriesRaw)
	.map(([key, value]) => ({
		[key]: `(min-width: ${value}px)`,
	}))
	.reduce((acc, next) => ({ ...acc, ...next }), {}) as StitchesMediaQueries;

export default mediaQueries;
