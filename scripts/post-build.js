const fs = require('fs');
const path = require('path');

const source = path.join(process.cwd(), '.next', 'static');
const destDir = path.join(process.cwd(), '.next', 'standalone', '.next', 'static');
const destCssDir = path.join(destDir, 'css');

// Ensure destination directories exist
if (!fs.existsSync(destCssDir)) {
    fs.mkdirSync(destCssDir, { recursive: true });
    console.log(`Created directory: ${destCssDir}`);
}

// Copy static assets
if (fs.existsSync(source)) {
    fs.cpSync(source, destDir, { recursive: true });
    console.log(`Copied static assets from ${source} to ${destDir}`);
} else {
    console.log(`Source directory not found: ${source}`);
}

// Copy content directory (for blog posts)
const contentSource = path.join(process.cwd(), 'src', 'content');
const contentDest = path.join(process.cwd(), '.next', 'standalone', 'src', 'content');

if (fs.existsSync(contentSource)) {
    // Ensure destination directory exists
    const contentDestParent = path.dirname(contentDest);
    if (!fs.existsSync(contentDestParent)) {
        fs.mkdirSync(contentDestParent, { recursive: true });
    }

    fs.cpSync(contentSource, contentDest, { recursive: true });
    console.log(`Copied content from ${contentSource} to ${contentDest}`);
} else {
    console.log(`Content directory not found: ${contentSource}`);
}
