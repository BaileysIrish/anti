import { MetadataRoute } from 'next';
import { getIndexablePosts } from '@/lib/blog-data';
import { getAllAuthors } from '@/lib/authors';
import { getSiteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = getSiteUrl();

    // Static routes
    const routes = [
        '',
        '/about',
        '/privacy',
        '/contact',
        '/faq',
        '/terms',
        '/editorial-policy',
        '/authors',
        '/blog',
        '/calculators/youth-subsidy',
        '/calculators/exchange-rate',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Dynamic blog routes
    const blogPosts = getIndexablePosts();
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const authorRoutes = getAllAuthors().map((author) => ({
        url: `${baseUrl}/authors/${author.id}`,
        lastModified: author.profileUpdatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }));

    return [...routes, ...blogRoutes, ...authorRoutes];
}
