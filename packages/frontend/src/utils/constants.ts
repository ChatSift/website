export const skeletonDuration = 1.5;
export const guildCardWidthDesktop = 216;
export const guildCardWidthMobile = 156;
export const guildCardGap = 16;
export const guildCardsPerPage = 4;

export const dashboardPadding = 16;
export const dashboardMaxWidth =
	guildCardWidthDesktop * guildCardsPerPage + guildCardGap * (guildCardsPerPage - 1) + dashboardPadding * 4;
export const smallestDashboardWidth = guildCardWidthDesktop * 2 + guildCardGap * (2 - 1) + dashboardPadding * 4;
