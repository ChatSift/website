export const skeletonDuration = 1.5;
export const guildCardWidthMobile = 156;
export const guildCardGap = 16;
export const guildCardsPerPage = 4;

export const dashboardPadding = 16;
export const dashboardMaxWidth = 912;
export const guildCardWidthDesktop =
	(dashboardMaxWidth - (guildCardsPerPage - 1) * guildCardGap - 2 * dashboardPadding) / guildCardsPerPage;
export const smallestDashboardWidth = guildCardWidthDesktop * 2 + guildCardGap * (2 - 1) + dashboardPadding * 4;

export const dialogOverlayColor = 'rgba(0, 0, 0, 0.75)';
export const snippetNameLength = 32;
export const snippetContentLength = 1_900;
