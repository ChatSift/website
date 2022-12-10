// NEXT_PUBLIC_SITE_URL is a variable we set both in prod and in dev
// We only rely on NEXT_PUBLIC_VERCEL_URL in previews
const host = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${process.env.NEXT_PUBLIC_VERCEL_URL!}`;

// TODO: Redirect to /dashboard
export const logIn = `${process.env.NEXT_PUBLIC_API_URL!}/auth/v1/discord?redirect_uri=${host}` as const;

export const logOut = `${process.env.NEXT_PUBLIC_API_URL!}/auth/v1/logout?redirect_uri=${host}` as const;

export const botPage = (bot: BotId): string => `/bot/${bot}`;
export const dashboard = {
	index: (guildId: string) => `/dashboard/${guildId}`,
	bot: (guildId: string, bot: string) => `/dashboard/${guildId}/${bot}`,
	botPage: (guildId: string, bot: string, page: string) => `/dashboard/${guildId}/${bot}/${page}`,
};

export const botInvite = (bot: BotId): string => `/invites/${bot}`;
