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
