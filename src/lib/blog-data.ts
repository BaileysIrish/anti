import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    category: "지원금" | "가이드" | "금융" | "환급금" | "부동산";
    emoji: string;
    date: string;
    content: string; // Raw MDX content
}

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

/**
 * 모든 블로그 포스트의 메타데이터를 가져옵니다.
 * 날짜 기준 내림차순 정렬됩니다.
 */
export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(BLOG_DIR)) {
        return [];
    }

    const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));

    const posts = files.map((filename) => {
        const slug = filename.replace('.mdx', '');
        const filePath = path.join(BLOG_DIR, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || '',
            description: data.description || '',
            category: data.category || '가이드',
            emoji: data.emoji || '📝',
            date: data.date || '',
            content,
        } as BlogPost;
    });

    // 날짜 기준 내림차순 정렬
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 특정 slug의 블로그 포스트를 가져옵니다.
 */
export function getPostBySlug(slug: string): BlogPost | null {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title || '',
        description: data.description || '',
        category: data.category || '가이드',
        emoji: data.emoji || '📝',
        date: data.date || '',
        content,
    } as BlogPost;
}

/**
 * 모든 블로그 포스트의 slug 목록을 가져옵니다.
 * 정적 생성(generateStaticParams)에 사용됩니다.
 */
export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(BLOG_DIR)) {
        return [];
    }

    return fs.readdirSync(BLOG_DIR)
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace('.mdx', ''));
}
