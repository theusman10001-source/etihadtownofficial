const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://etihadtownofficial.com";

/** The public origin used for canonical URLs, metadata, and structured data. */
export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export const siteName = "Etihad Town Lahore";

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}
