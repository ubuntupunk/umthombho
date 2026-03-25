# NetBones White-Label SPA Template

## A Reusable Template for Rapid Client Onboarding

---

## Executive Summary

This document outlines how to transform the current Umthombho project into a reusable, white-label NetBones SPA template. The template will enable rapid deployment of client websites with customizable branding, optional features (including Journal/Blog), and automated Netlify deployment.

---

## 1. Template Architecture

### 1.1 Project Structure

```
netbones-spa-template/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions for deployment
├── admin/
│   ├── index.html              # CMS entry point
│   └── config.yml              # CMS configuration template
├── content/
│   └── journal/                # Journal entries (optional)
├── css/
│   └── styles.css              # Main styles (themable)
├── images/
│   ├── logo.webp               # Template logo (replaceable)
│   └── uploads/                 # User uploaded media
├── js/
│   └── app.js                  # SPA router & components
├── scripts/
│   └── build-journal.js        # Journal data generator
├── _redirects                   # SPA routing rules
├── _404.html                   # Custom 404 page
├── index.html                  # Main HTML template
├── netlify.toml                # Netlify configuration
├── package.json                # Dependencies
├── README.md                   # Template documentation
├── config.js                   # Client-specific configuration
└── theme.css                   # CSS variables for theming
```

### 1.2 Core Components

| Component | Purpose | Customizable |
|-----------|---------|--------------|
| `config.js` | Client settings (name, colors, features) | Yes |
| `theme.css` | CSS variables for branding | Yes |
| `admin/config.yml` | CMS settings & collections | Yes |
| `index.html` | HTML template with client placeholders | Yes |
| `images/logo.webp` | Client logo | Yes |

---

## 2. Configuration System

### 2.1 Client Configuration (`config.js`)

```javascript
// ==========================================
// CLIENT CONFIGURATION - EDIT THIS FILE
// ==========================================

export const clientConfig = {
  // CLIENT DETAILS
  organization: "Client Name",
  website: "https://client-domain.com",
  
  // BRANDING
  colors: {
    primary: "#2D5A3D",
    secondary: "#F5F0E6", 
    accent: "#E67E22",
    text: "#1A1A1A",
    muted: "#6B7B6C"
  },
  
  // LOGO
  logo: "/images/logo.webp",
  
  // CONTACT
  contact: {
    email: "info@client.com",
    phone: "+27...",
    address: "123 Street, City"
  },
  
  // FEATURES
  features: {
    journal: true,
    governance: true,
    biography: true,
    mission: true
  },
  
  // NAVIGATION
  nav: {
    order: ["home", "mission", "governance", "biography", "journal", "contact"],
    labels: {
      journal: "Journal"
    }
  },
  
  // CMS SETTINGS
  cms: {
    enabled: true,
    collections: ["journal"],
    locales: ["en", "xh"],
    defaultLocale: "en"
  },
  
  // SOCIAL
  social: {
    facebook: "",
    twitter: "",
    instagram: ""
  }
};
```

### 2.2 Theme Variables (`theme.css`)

```css
:root {
  --primary: var(--client-primary, #2D5A3D);
  --secondary: var(--client-secondary, #F5F0E6);
  --accent: var(--client-accent, #E67E22);
  --text: var(--client-text, #1A1A1A);
  --muted: var(--client-muted, #6B7B6C);
  
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Source Sans 3', sans-serif;
  
  --max-width: 1200px;
  --header-height: 70px;
  
  --shadow-sm: 0 2px 10px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 15px rgba(0,0,0,0.05);
  --shadow-lg: 0 8px 25px rgba(0,0,0,0.15);
  --radius-sm: 5px;
  --radius-md: 10px;
  --transition: 0.3s ease;
}
```

---

## 3. Feature System

### 3.1 Available Features

Each feature can be enabled/disabled via `config.js`:

```javascript
features: {
  journal: true,       // /journal - Blog/Journal/News
  governance: true,    // /governance - Team & structure
  biography: true,    // /biography - About page
  mission: true        // /mission - Mission statement
}
```

### 3.2 Adding New Features

1. Create render function in `js/app.js`
2. Add route in `routes` object
3. Add nav item if enabled
4. (Optional) Add CMS collection in `admin/config.yml`

---

## 4. Journal/Blog System

### 4.1 Enabling Journal

Set in `config.js`:
```javascript
features: {
  journal: true
}
```

### 4.2 Customizing Journal Labels

```javascript
nav: {
  labels: {
    journal: "Blog"    // or "News", "Updates", "Stories"
  }
}
```

---

## 5. Deployment Automation

### 5.1 GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install Dependencies
        run: npm ci --include=dev
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          
      - name: Build Journal Data
        run: npm run prebuild
        
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 5.2 Netlify Configuration

```toml
# netlify.toml
[build]
  publish = "."
  command = "npm install --include=dev && npm run prebuild"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 6. Client Rollout Process

### 6.1 Step-by-Step Guide

1. Clone template
2. Configure client in `config.js`
3. Add logo to `images/`
4. Configure CMS in `admin/config.yml`
5. Deploy to Netlify
6. Enable Identity

### 6.2 Automated Rollout Script

```bash
#!/bin/bash
# scripts/new-client.sh

CLIENT_NAME=$1
CLIENT_DOMAIN=$2

if [ -z "$CLIENT_NAME" ]; then
  echo "Usage: ./new-client.sh <client-name> <domain>"
  exit 1
fi

git clone https://github.com/netbones/template-spa.git $CLIENT_NAME
cd $CLIENT_NAME

sed -i "s/organization: \"Client Name\"/organization: \"$CLIENT_NAME\"/" config.js
sed -i "s|website: \"https://client-domain.com\"|website: \"https://$CLIENT_DOMAIN\"|" config.js

git init
git add .
git commit -m "Initial setup for $CLIENT_NAME"

echo "Setup complete for $CLIENT_NAME"
```

---

## 7. CMS Customization

### 7.1 Logo & Branding

```yaml
# admin/config.yml
logo:
  src: "/images/logo.webp"
  show_in_header: true

display_url: "https://client-domain.com"
site_url: "https://client-domain.com"
```

### 7.2 Collections

```yaml
collections:
  - name: "journal"
    label: "Journal"
    folder: "content/journal"
```

### 7.3 Roles

```yaml
roles:
  - label: "Admin"
    name: "admin"
  - label: "Editor"
    name: "editor"
  - label: "Author"
    name: "author"
```

---

## 8. Quick Reference

### Configuration Checklist

- [ ] `config.js` - Client details & features
- [ ] `theme.css` - Brand colors
- [ ] `index.html` - Meta tags, title
- [ ] `images/logo.webp` - Client logo
- [ ] `admin/config.yml` - CMS settings

### Feature Flags

| Feature | Config Key | Route |
|---------|-----------|-------|
| Mission | `features.mission` | `/mission` |
| Governance | `features.governance` | `/governance` |
| Biography | `features.biography` | `/biography` |
| Journal | `features.journal` | `/journal` |
| Contact | Always | `/contact` |

---

*NetBones White-Label SPA Template*
*Version 1.0 - March 2026*
