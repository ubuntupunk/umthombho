import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { glob } from 'glob';

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

async function buildBlog() {
    const contentDir = './content/blog';
    const outputFile = './blog-data.json';

    if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
    }

    const files = await glob(`${contentDir}/*.md`);
    const posts = files.map(file => {
        const content = fs.readFileSync(file, 'utf8');
        const { data, content: body } = matter(content);
        const slug = path.basename(file, '.md');
        
        let title, date, description, image, postBody;
        
        if (data.en) {
            title = data.en.title || 'Untitled';
            date = data.en.date || new Date().toISOString();
            description = data.en.description || '';
            image = data.en.image || null;
            postBody = data.en.body || body || '';
        } else {
            title = data.title || 'Untitled';
            date = data.date || new Date().toISOString();
            description = data.description || '';
            image = data.image || null;
            postBody = body || '';
        }
        
        return {
            slug,
            title,
            date,
            description,
            image,
            html: md.render(postBody),
            excerpt: postBody.substring(0, 200) + '...'
        };
    });

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
    console.log(`Built ${posts.length} blog posts`);
}

buildBlog().catch(console.error);
