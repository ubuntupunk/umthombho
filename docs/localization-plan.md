# Xhosa Localization Plan

## Overview
Add Xhosa (isiXhosa) language support to Awomi Umthombho website using i18next.

## Strategy

### 1. Library
- **i18next** - Lightweight, flexible internationalization library
- No heavy framework needed - works with vanilla JS

### 2. Translation Files
Create `locales/` directory with:
- `en.json` - English translations
- `xhh.json` - Xhosa translations

### 3. Translations Required

| Key | English | Xhosa |
|-----|---------|-------|
| nav.home | Home | IKhaya |
| nav.mission | Mission | Umsebenzi |
| nav.governance | Governance | iPalamente |
| nav.biography | Biography | IBhayografi |
| nav.journal | Journal | Ijenali |
| nav.contact | Contact | uXhumano |
| hero.title | Nourishing Lives, Building Community | Ukondla iMoya, ukwakha iCommunity |
| hero.cta | Get Involved | Yibandakanye |
| mission.title | Our Mission | Umsebenzi wethu |
| ... | ... | ... |

### 4. Implementation Steps

1. **Setup i18next** in `js/app.js`
2. **Add language toggle button** in header
3. **Create translation files** with all site content
4. **Update render functions** to use translations
5. **Persist preference** in localStorage

### 5. UI Components

**Language Toggle:**
- Button in header nav
- Shows current language flag/text
- Toggles between EN/XH

**Implementation Pattern:**
```javascript
import i18next from 'i18next';

i18next.init({
  lng: localStorage.getItem('language') || 'en',
  resources: {
    en: { translation: enTranslations },
    xh: { translation: xhTranslations }
  }
});

// Usage in JSX/templates
t('nav.home') // returns "Home" or "IKhaya"
```

### 6. Note
Cannot install npm packages due to disk space. Manual CDN approach:
```html
<script src="https://unpkg.com/i18next/dist/umd/i18next.min.js"></script>
```

## Blockers
- Disk space issue prevents npm install
- Use CDN approach instead

## Next Steps
1. Approve plan
2. Provide Xhosa translations for all content
3. Implement with CDN i18next
