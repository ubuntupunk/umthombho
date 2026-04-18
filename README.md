# Awomi Umthombho Feeding Scheme


[![GitHub](https://img.shields.io/badge/GitHub-ubuntupunk/umthombhu-blue)](https://github.com/ubuntupunk/umthombhu)
[![License](https://img.shields.io/badge/License-GPL-green.svg)](LICENSE)

<a href="https://github.com/pedromxavier/flag-badges">
    <img src="https://raw.githubusercontent.com/pedromxavier/flag-badges/main/badges/ZA.svg" alt="made in za">
</a>

A vanilla JavaScript single-page application for a community feeding scheme in Khayelitsha, Cape Town. Built with Decap CMS for content management.

## Features

- Vanilla JS SPA with hash-based routing
- Decap CMS integration for journal content management
- Netlify deployment ready
- Responsive design

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Generate journal data from markdown files
npm run prebuild

# Serve the site (any static server works)
npx serve .
# or
python -m http.server 8000
```

### Development Workflow

```bash
# After making changes to content/journal/*.md files, regenerate journal data
npm run prebuild
```

The site will be available at `http://localhost:8000` (or port shown by your server).

### Adding journal Posts

Create markdown files in `content/journal/` with frontmatter:

```markdown
---
title: "Your Post Title"
date: 2026-03-22
description: "A brief description"
image: "/images/uploads/your-image.jpg"
---

Your markdown content here...
```

## Deployment

### Netlify

1. Push your code to a Git repository (GitHub/GitLab/Bitbucket)
2. Connect your repository to Netlify
3. Netlify will automatically detect the settings from `netlify.toml`
4. Build command: `npm install && npm run prebuild`
5. Publish directory: `.`

### Setting Up Decap CMS

After deploying to Netlify:

1. **Enable Identity**: Go to Site Settings → Identity → Enable Identity
2. **Enable Git Gateway**: Go to Site Settings → Identity → Services → Enable Git Gateway
3. **Invite Users**: Go to Identity → Invite users

### Accessing the CMS

Visit `/admin/` on your deployed site (e.g., `yoursite.netlify.app/admin/`) to manage journal posts.

## Project Structure

```
.
├── content/
│   └── journal/           # journal markdown files
├── public/
│   ├── admin/           # Decap CMS files
│   │   ├── index.html
│   │   └── config.yml
│   ├── images/
│   │   └── uploads/    # CMS media uploads
│   └── journal-data.json  # Generated from markdown
├── scripts/
│   └── build-journal.js   # Converts markdown to JSON
├── css/
│   └── styles.css
├── js/
│   └── app.js          # SPA router and views
├── index.html
├── netlify.toml
└── package.json
```

## Technologies

- Vanilla JavaScript (no framework)
- Decap CMS (formerly Netlify CMS)
- Netlify for hosting and identity
