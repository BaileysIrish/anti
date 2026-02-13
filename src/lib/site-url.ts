const DEFAULT_SITE_URL = "https://fin-guide.kr";
let hasWarnedForFallback = false;

function warnFallback(reason: string): void {
    if (hasWarnedForFallback) {
        return;
    }

    hasWarnedForFallback = true;
    console.warn(`[site-url] ${reason} Falling back to ${DEFAULT_SITE_URL}.`);
}

function normalizeSiteUrl(candidate: string): string | null {
    try {
        const parsed = new URL(candidate);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
            return null;
        }

        // Normalize trailing slash for consistent URL joins.
        return parsed.toString().replace(/\/+$/, "");
    } catch {
        return null;
    }
}

export function getSiteUrl(): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (!siteUrl) {
        warnFallback("NEXT_PUBLIC_SITE_URL is not set.");
        return DEFAULT_SITE_URL;
    }

    const normalized = normalizeSiteUrl(siteUrl);
    if (!normalized) {
        warnFallback(`NEXT_PUBLIC_SITE_URL is invalid: "${siteUrl}".`);
        return DEFAULT_SITE_URL;
    }

    return normalized;
}
