# Awomi Umthombho Feeding Scheme - Website Specification

## Project Overview

- **Project Name**: Awomi Umthombho Feeding Scheme
- **Type**: Vanilla JS Single Page Application (SPA)
- **Core Functionality**: Community feeding scheme website showcasing mission, founder biography, and contact information
- **Target Users**: Community members, potential donors, volunteers, and local residents

## UI/UX Specification

### Layout Structure

**Pages:**
1. Home - Landing page with hero, mission statement, services overview, footer
2. Biography - About the founder, vision, and story
3. Contact - Contact form, location info, OpenStreetMap embed

**Navigation:**
- Fixed header with logo and navigation links
- Mobile: hamburger menu

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Primary: `#2D5A3D` (deep forest green - growth, nourishment)
- Secondary: `#F5F0E6` (warm cream - warmth, community)
- Accent: `#E67E22` (burnt orange - energy, passion)
- Text: `#1A1A1A` (near black)
- Muted: `#6B7B6C` (sage green)

**Typography:**
- Headings: "Playfair Display", serif (elegant, trustworthy)
- Body: "Source Sans 3", sans-serif (readable, modern)
- Sizes: h1: 3rem, h2: 2rem, h3: 1.5rem, body: 1rem

**Spacing:**
- Section padding: 4rem vertical, 2rem horizontal
- Component spacing: 1.5rem
- Max content width: 1200px

**Visual Effects:**
- Subtle box shadows on cards
- Smooth hover transitions (0.3s ease)
- Fade-in animations on page load

### Components

**Header:**
- Logo (left)
- Navigation links (right): Home, Biography, Contact
- Mobile hamburger menu

**Hero Section:**
- Full-width background image
- Overlay with tagline
- CTA button

**Footer:**
- Site name, brief description
- Quick links
- Social/copyright

**Contact Page:**
- Contact form (name, email, message)
- Location card with address
- OpenStreetMap embed

## Functionality Specification

### Core Features
1. Client-side routing (hash-based SPA)
2. Dynamic page rendering
3. Responsive navigation
4. Contact form with client-side validation
5. OpenStreetMap embed showing location (Mandela Park, Khayelitsha)

### User Interactions
- Click navigation to switch pages
- Submit contact form (shows success message)
- Hover effects on buttons and links
- Mobile menu toggle

### Data Handling
- Static content (no backend)
- Form submission shows inline confirmation

## Acceptance Criteria

1. All three pages render correctly
2. Navigation works without page reload
3. Map displays at correct location
4. Form validates required fields
5. Responsive on mobile/tablet/desktop
6. All images load properly
7. Deployed to Netlify successfully