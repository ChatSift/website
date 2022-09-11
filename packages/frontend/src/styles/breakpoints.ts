export const mediaQueriesRaw = {
	extraSmall: 320,
	small: 650,
	medium: 800,
} as const;

type MediaQueries = {
	[key in keyof typeof mediaQueriesRaw as `${key}Min`]: string;
} & { [key in keyof typeof mediaQueriesRaw as `${key}Max`]: string };

const mediaQueries = Object.entries(mediaQueriesRaw)
	.map(([k, v]) => ({ [`${k}Min`]: `@media (min-width: ${v}px)`, [`${k}Max`]: `@media (max-width: ${v}px)` }))
	.reduce((acc, next) => ({ ...acc, ...next }), {}) as MediaQueries;

export default mediaQueries;
