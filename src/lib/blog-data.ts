import 'server-only';
import blogData from './blog-data.json';

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    category: "지원금" | "가이드" | "금융" | "환급금" | "부동산";
    emoji: string;
    date: string;
    content: string; // Raw MDX content
}

/**
 * 모든 블로그 포스트의 메타데이터를 가져옵니다.
 * 날짜 기준 내림차순 정렬됩니다.
 */
export function getAllPosts(): BlogPost[] {
    // JSON 데이터는 이미 정렬되어 있다고 가정하거나 여기서 다시 정렬
    return (blogData as BlogPost[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 특정 slug의 블로그 포스트를 가져옵니다.
 */
export function getPostBySlug(slug: string): BlogPost | null {
    const post = (blogData as BlogPost[]).find(p => p.slug === slug);
    return post || null;
}

/**
 * 모든 블로그 포스트의 slug 목록을 가져옵니다.
 * 정적 생성(generateStaticParams)에 사용됩니다.
 */
export function getAllPostSlugs(): string[] {
    return (blogData as BlogPost[]).map(p => p.slug);
}
