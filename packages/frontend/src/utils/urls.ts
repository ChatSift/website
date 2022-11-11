// NEXT_PUBLIC_SITE_URL is a variable we set both in prod and in dev
// We only rely on NEXT_PUBLIC_VERCEL_URL in previews
const Host = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${process.env.NEXT_PUBLIC_VERCEL_URL!}`;

// TODO: Redirect to /dashboard
export const LogIn = `${process.env.NEXT_PUBLIC_API_URL!}/auth/v1/discord?redirect_uri=${Host}` as const;

export const LogOut = `${process.env.NEXT_PUBLIC_API_URL!}/auth/v1/logout?redirect_uri=${Host}` as const;

export const botPage = (bot: string): string => `${Host}/bot/${bot}`;
export const dashboard = {
	index: (guildId: string) => `${Host}/dashboard/${guildId}`,
};
