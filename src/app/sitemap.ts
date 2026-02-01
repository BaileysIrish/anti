import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { getAllPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

    // Static routes
    const routes = [
        '',
        '/about',
        '/privacy',
        '/contact',
        '/blog',
        '/calculators/youth-subsidy',
        '/calculators/exchange-rate',
        '/calculators/real-estate',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Dynamic blog routes
    const blogPosts = getAllPosts();
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.date, // Already in YYYY-MM-DD format from MDX
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
}
