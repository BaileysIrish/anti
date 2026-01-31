import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

    // 정적 페이지
    const staticPages = [
        "",
        "/calculators/youth-subsidy",
        "/calculators/exchange-rate",
        "/calculators/real-estate",
        "/blog",
        "/about",
        "/privacy",
        "/terms",
    ];

    const staticRoutes = staticPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" as const : "weekly" as const,
        priority: route === "" ? 1 : route.includes("calculators") ? 0.9 : 0.7,
    }));

    // 블로그 포스트 (하드코딩 - 동적 생성 시 DB 연동 필요)
    const blogSlugs = [
        "youth-subsidy-guide-2026",
        "subsidy-application-tips",
        "exchange-rate-saving-tips",
        "unclaimed-money-search",
        "first-home-loan-guide",
        "savings-comparison-2026",
    ];

    const blogRoutes = blogSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...blogRoutes];
}
