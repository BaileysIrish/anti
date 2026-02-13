export function getSiteUrl(): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!siteUrl) {
        throw new Error("NEXT_PUBLIC_SITE_URL is required.");
    }

    // Normalize trailing slash for consistent URL joins.
    return siteUrl.replace(/\/+$/, "");
}
