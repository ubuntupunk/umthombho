# Localization Documentation

## Overview

The Awomi Umthombho website supports English (en) and Xhosa (xh) languages with a toggle button in the header.

## Implementation

### Libraries
- **i18next** (v25.x) - Internationalization library loaded locally from `js/i18next.min.js`
- No external CDN dependencies

### Files Structure

```
locales/
  en.json          # English translations
  xh.json          # Xhosa translations
js/
  i18next.min.js   # i18next library (local copy)
  i18n.js          # i18n initialization and toggle logic
  app.js           # Application with t() function for translations
```

### How It Works

1. **Initialization** (`js/i18n.js`)
   - Loads translation JSON files on page load
   - Uses localStorage to persist language preference
   - Adds CSS classes to prevent flash of untranslated content

2. **Translation Function** (`js/app.js`)
   - `t('key')` function retrieves translations
   - Used in all render functions for page content
   - Static elements use `data-i18n` attribute

3. **Language Toggle**
   - Button shows target language (XH when viewing EN, EN when viewing XH)
   - Click triggers page reload with new language
   - Preference saved to localStorage

### Adding New Translations

1. Add key to both `locales/en.json` and `locales/xh.json`
2. Use `t('key.path')` in JavaScript or `data-i18n="key.path"` in HTML

### Translation Keys

| Section | Keys |
|----------|------|
| Navigation | `nav.home`, `nav.mission`, `nav.governance`, `nav.biography`, `nav.journal`, `nav.contact` |
| Hero | `hero.title`, `hero.subtitle`, `hero.cta`, `hero.missionText` |
| Mission | `mission.title`, `mission.intro`, `mission.funding`, `mission.problemTitle`, `mission.problem`, `mission.solution`, `mission.downloadBusinessProfile`, `mission.downloadButton` |
| Services | `services.title`, `services.dailyMeals.title`, `services.dailyMeals.desc`, `services.children.title`, `services.children.desc`, `services.elderly.title`, `services.elderly.desc` |
| Governance | `governance.title`, `governance.chairperson`, `governance.treasurer`, `governance.secretary`, `governance.operations`, `governance.volunteer` |
| Biography | `biography.title`, `biography.founder`, `biography.role`, `biography.story`, `biography.community`, `biography.continuation` |
| Contact | `contact.title`, `contact.form.name`, `contact.form.email`, `contact.form.message`, `contact.form.submit`, `contact.form.success`, `contact.info.title`, `contact.info.address`, `contact.info.location` |
| Journal | `journal.title`, `journal.empty` |
| Footer | `footer.brand`, `footer.copyright`, `footer.poweredBy` |

### Performance

- Local i18next reduces CDN requests
- Fade transition prevents visual flash
- Images optimized with lazy loading

### Browser Support

- Uses vanilla JavaScript (no framework)
- Compatible with all modern browsers
- localStorage for persistence
