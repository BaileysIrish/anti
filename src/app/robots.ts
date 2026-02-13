import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = getSiteUrl();

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/_next/', '/private/'],
            },
            // Google의 AI 학습 봇 (Bard/Gemini 등) 허용
            {
                userAgent: 'Google-Extended',
                allow: '/',
            },
            // OpenAI의 ChatGPT 봇 허용
            {
                userAgent: 'GPTBot',
                allow: '/',
            },
            // 일반 검색 엔진 명시적 허용
            {
                userAgent: ['Googlebot', 'Yeti', 'Bingbot', 'Mediapartners-Google'],
                allow: '/',
            }
        ],
        host: baseUrl,
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
