import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const OUTPUT_FILE = path.join(process.cwd(), 'src/lib/blog-data.json');

async function markdownToHtml(markdown) {
    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(markdown);
    return result.toString();
}

async function generateBlogData() {
    if (!fs.existsSync(BLOG_DIR)) {
        fs.writeFileSync(OUTPUT_FILE, '[]');
        return;
    }

    const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));

    const posts = await Promise.all(files.map(async (filename) => {
        const slug = filename.replace('.mdx', '');
        const filePath = path.join(BLOG_DIR, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Compile MDX/Markdown to HTML at build time
        const contentHtml = await markdownToHtml(content);

        return {
            slug,
            title: data.title || '',
            description: data.description || '',
            category: data.category || '가이드',
            emoji: data.emoji || '📝',
            date: data.date || '',
            content: contentHtml, // HTML content
        };
    }));

    // Sort by date (descending)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`Generated blog data at ${OUTPUT_FILE}`);
}

generateBlogData();
