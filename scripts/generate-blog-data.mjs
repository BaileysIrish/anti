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

function assertRequiredString(data, key, slug) {
    const value = data[key];
    if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(`[${slug}] Missing required string field: ${key}`);
    }
    return value.trim();
}

function assertQualitySignals(data, sources, slug) {
    const qs = data.qualitySignals;
    if (!qs || typeof qs !== 'object') {
        throw new Error(`[${slug}] Missing required object field: qualitySignals`);
    }
    if (typeof qs.hasChecklist !== 'boolean') {
        throw new Error(`[${slug}] qualitySignals.hasChecklist must be boolean`);
    }
    if (typeof qs.hasCaseStudy !== 'boolean') {
        throw new Error(`[${slug}] qualitySignals.hasCaseStudy must be boolean`);
    }
    if (typeof qs.sourceCount !== 'number' || !Number.isFinite(qs.sourceCount)) {
        throw new Error(`[${slug}] qualitySignals.sourceCount must be number`);
    }
    if (qs.sourceCount !== sources.length) {
        throw new Error(`[${slug}] qualitySignals.sourceCount(${qs.sourceCount}) does not match sources.length(${sources.length})`);
    }
    return {
        hasChecklist: qs.hasChecklist,
        hasCaseStudy: qs.hasCaseStudy,
        sourceCount: qs.sourceCount,
    };
}

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

        const indexable = data.indexable !== false;
        const sources = Array.isArray(data.sources) ? data.sources : [];

        if (indexable && sources.length === 0) {
            throw new Error(`[${slug}] indexable post must include at least one source`);
        }

        const title = assertRequiredString(data, 'title', slug);
        const description = assertRequiredString(data, 'description', slug);
        const category = assertRequiredString(data, 'category', slug);
        const date = assertRequiredString(data, 'date', slug);
        const reviewedAt = assertRequiredString(data, 'reviewedAt', slug);
        const updatedAt = assertRequiredString(data, 'updatedAt', slug);
        const author = assertRequiredString(data, 'author', slug);
        const authorId = assertRequiredString(data, 'authorId', slug);
        const qualitySignals = assertQualitySignals(data, sources, slug);

        return {
            slug,
            title,
            description,
            category,
            emoji: data.emoji || '📝',
            date,
            indexable,
            author,
            authorId,
            reviewedAt,
            updatedAt,
            qualitySignals,
            sources,
            content: contentHtml, // HTML content
        };
    }));

    // Sort by date (descending)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`Generated blog data at ${OUTPUT_FILE}`);
}

generateBlogData();
