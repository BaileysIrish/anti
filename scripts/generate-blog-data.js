const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const OUTPUT_FILE = path.join(process.cwd(), 'src/lib/blog-data.json');

function generateBlogData() {
    if (!fs.existsSync(BLOG_DIR)) {
        fs.writeFileSync(OUTPUT_FILE, '[]');
        return;
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
        };
    });

    // Sort by date (descending)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`Generated blog data at ${OUTPUT_FILE}`);
}

generateBlogData();
