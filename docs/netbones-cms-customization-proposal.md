# NetBones SPA CMS - Custom Decap CMS Build Proposal

## Executive Summary

This document outlines options for customizing the Decap CMS admin interface to create a white-label, branded CMS for NetBones' SPA offering. The goal is to provide a generic, reusable CMS template that can be quickly customized for different clients.

---

## Current State (Default Decap CMS)

The current setup uses the CDN-hosted Decap CMS with basic configuration:
- Logo customization via `config.yml`
- Basic i18n support (English, isiXhosa)
- Git-based content management
- Netlify Identity for authentication

**Limitations:**
- No custom header/footer
- Limited branding options
- No custom themes
- CSS overrides only (fragile)

---

## Option 1: Fork-Based Custom Build

### Description
Fork the Decap CMS GitHub repository and build a custom version with your own branding, components, and features.

### What's Possible

#### Branding & UI
- Custom logo on login and header
- Custom app title and branding colors
- Custom login page design
- Custom footer with company info/links
- Custom CSS themes (dark mode, custom accent colors)
- Custom fonts

#### Features
- Custom dashboard with quick actions
- Custom widget types for specific client needs
- Custom preview templates
- Pre-installed locales
- Custom roles with branded names

#### Technical
- Remove unused dependencies
- Add custom authentication providers
- Integrate with other services
- Custom media library adapters

### Implementation Approach

```bash
git clone https://github.com/decaporg/decap-cms.git
cd decap-cms
npm install
npm run build
```

### Pros
- Full control over UI
- Can add custom features
- Can remove bloat
- Professional result

### Cons
- High maintenance (keeping up with upstream)
- Complex build process
- Requires React expertise
- Single codebase to maintain

---

## Option 2: Custom React App Wrapper

### Description
Build a custom React application that wraps or embeds Decap CMS functionality, providing your own UI while using Decap's core.

### What's Possible
- Complete UI customization
- Custom routing
- Multiple CMS instances (different content types)
- Custom onboarding flows
- Client-specific branding via config
- Custom analytics
- Integrated help/docs

### Implementation

```jsx
const customConfig = {
  ...baseConfig,
  branding: {
    logo_url: process.env.LOGO_URL,
    app_name: process.env.APP_NAME,
    accent_color: process.env.ACCENT_COLOR,
  }
};

export default function CustomAdmin() {
  return (
    <div className="custom-admin">
      <CustomHeader />
      <div className="admin-content">
        <CMS config={customConfig} />
      </div>
      <CustomFooter />
    </div>
  );
}
```

### Pros
- More flexible than fork
- Can use modern React patterns
- Easier to maintain than fork

### Cons
- Requires React development
- Decap CMS API may change
- More complex initial setup

---

## Option 3: CSS/JS Injection (Current+)

### Description
Maximize the current Decap CMS capabilities through extensive CSS overrides and JavaScript injection.

### What's Available

#### JavaScript APIs
- `registerLocale()` - Custom translations
- `registerPreviewTemplate()` - Custom previews
- `registerPreviewStyle()` - Custom styles

#### CSS Overrides
```css
.login-container {
  background: linear-gradient(135deg, #primary, #secondary);
}

.header {
  background: var(--accent-color);
}
```

### Limitations
- Cannot add new UI components
- CSS classes may change with updates
- Limited to existing functionality

### Pros
- No build process
- Easy to update Decap version
- Low maintenance

### Cons
- Fragile (breaks with updates)
- Limited customization
- Professional result difficult

---

## Recommended Approach

### Phase 1: Quick Wins (CSS/JS Injection)
- Document all CSS override patterns
- Create CSS theme templates
- Add custom JavaScript for common features

### Phase 2: Light Customization
- Custom login page HTML
- Custom preview templates
- Custom locale translations

### Phase 3: Full Custom Build (For Premium Tier)
- Fork Decap CMS
- Add custom branding
- Add NetBones-specific features
- Create build pipeline for client-specific builds

---

## Feature Comparison Matrix

| Feature | Current | CSS/JS | Fork | Wrapper |
|---------|---------|--------|------|---------|
| Custom Logo | ✓ | ✓ | ✓ | ✓ |
| Custom Colors | ✗ | ✓ | ✓ | ✓ |
| Custom Fonts | ✗ | ✓ | ✓ | ✓ |
| Custom Header | ✗ | ✓* | ✓ | ✓ |
| Custom Footer | ✗ | ✗ | ✓ | ✓ |
| Custom Dashboard | ✗ | ✗ | ✓ | ✓ |
| Custom Widgets | ✗ | ✗ | ✓ | ✓ |
| Multi-tenant | ✗ | ✗ | ✓* | ✓ |
| Maintenance | Low | Low | High | Medium |

*Via configuration or build process

---

## Implementation Roadmap

### Week 1: CSS Theming System
- Document all overridable CSS classes
- Create theme templates (light, dark, custom)
- Build theme generator tool

### Week 2: JavaScript Extensions
- Custom preview templates
- Custom locale bundles
- Common widget patterns

### Week 3-4: Build Pipeline (Optional)
- Set up fork repo
- Create build scripts
- Test client-specific builds

---

## Technical Considerations

### Upkeep
- Decap CMS updates monthly
- Test updates before deploying
- Subscribe to Decap CMS changelog

### Security
- CDN-hosted CMS is secure
- Custom builds need security audit
- Netlify Identity is mature

### Performance
- Default bundle: ~2MB
- Custom builds can be optimized
- Lazy loading available

---

## Next Steps

1. Review this proposal with stakeholders
2. Prioritize features for MVP vs. Premium
3. Prototype CSS theming system
4. Decide on long-term build strategy
5. Plan maintenance process

---

## References

- Decap CMS Docs: https://decapcms.org/docs/
- Decap CMS GitHub: https://github.com/decaporg/decap-cms
- Theming PR: https://github.com/decaporg/decap-cms/pull/7138
- Custom Previews: https://decapcms.org/docs/customization/

---

*Document prepared for NetBones SPA CMS Offering Discussion*
*Version 1.0 - March 2026*
