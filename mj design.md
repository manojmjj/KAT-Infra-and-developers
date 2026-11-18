# MJ Design System & Website Blueprint
**A Complete Guide to Building Apple-Grade, High-Trust, Mobile-Perfect Web Experiences**

---

## 1. The Design Philosophy
This system is engineered for high-value B2B, real estate, civil infrastructure, engineering, or premium industrial ventures where trust, credibility, and clarity are paramount.

### Core Principles
1. **Apple Bright Clean Architecture:**
   - Stark clean white background (`#FFFFFF`) paired with subtle warm-gray surface cards (`#F5F5F7`).
   - Deep obsidian high-contrast text (`#1D1D1F`) for effortless readability.
   - Micro-borders (`rgba(0, 0, 0, 0.08)`) and gentle ambient elevation shadows (`0 4px 20px rgba(0, 0, 0, 0.06)`) instead of heavy outlines or noisy gradients.
2. **Authority & Legitimacy Over Fluff:**
   - Display real physical anchors: Headquarters address, landmark highway corridors, direct phone lines, active GSTIN / registration badges.
   - Clear technical specifications instead of generic buzzwords (e.g., excavator tonnage, Patta/Chitta titles, road width).
3. **Restrained, Fluid Motion:**
   - Snappy cubic-bezier transitions (`160ms - 280ms cubic-bezier(0.25, 1, 0.5, 1)`).
   - Full respect for `prefers-reduced-motion: reduce`.
   - Never use chaotic parallax or scroll-jacking that impairs mobile navigation.

---

## 2. Foundations, Dimensions & Spacing Scale

### Layout Constraints
- **Maximum Container Width:** `1140px` (optimal eye-tracking width).
- **Default Container Padding:** `clamp(16px, 4vw, 32px)` horizontally.
- **Header Height:** `52px` (desktop), `56px` (mobile).

### CSS Design Tokens (`:root`)
```css
:root {
  /* Surface & Background */
  --color-bg: #FFFFFF;
  --color-surface: #F5F5F7;
  --color-surface-hover: #EBEBED;
  --color-card: #FFFFFF;

  /* Typography Colors */
  --color-text-primary: #1D1D1F;      /* Deep Obsidian */
  --color-text-secondary: #515154;    /* Neutral Slate */
  --color-text-muted: #6E6E73;        /* Subtitle Gray */
  
  /* Borders & Dividers */
  --color-border: #D2D2D7;
  --color-border-subtle: rgba(0, 0, 0, 0.08);

  /* Strategic Accents */
  --color-accent: #0071E3;            /* Apple Blue (Interactive / Links) */
  --color-brand-navy: #0F284E;        /* Corporate Navy (Headlines) */
  --color-brand-gold: #D97706;        /* Amber/Gold (Kickers & Emblems) */
  --color-success: #34C759;           /* Active / Operational Status */

  /* Native Typography Stack */
  --font-display: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-body: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-mono: "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;

  /* Fluid Clamped Typography Scale */
  --text-hero: clamp(2.25rem, 5.5vw, 4.25rem);
  --text-display-l: clamp(1.75rem, 4vw, 3rem);
  --text-display-m: clamp(1.4rem, 2.5vw, 2.25rem);
  --text-heading: clamp(1.15rem, 1.8vw, 1.5rem);
  --text-body-l: 1.125rem;
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-micro: 0.75rem;

  /* Border Radii Hierarchy */
  --radius-sm: 8px;      /* Badges & Input fields */
  --radius-md: 14px;     /* Mobile cards & Dialogs */
  --radius-lg: 20px;     /* Desktop feature cards & containers */
  --radius-pill: 980px;  /* Buttons, Tags & Chips */

  /* Elevation Shadows */
  --shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.09);
}
```

---

## 3. Mobile Regulations: The Zero-Fault Mobile Standard

Mobile responsiveness is not an afterthought; it is governed by strict rules that prevent layout bugs across all phone viewports (360px, 375px, 390px, 412px, 430px).

### Rule 1: Foolproof Viewport & Horizontal Overflow Prevention
Prevent the dreaded "horizontal wiggle" or side-scrolling that cuts off text and cards:
```css
html, body {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  overflow-x: clip; /* Modern standard: halts horizontal overflow without breaking position:sticky */
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: border-box;
}
```

### Rule 2: Container Mobile Padding Lock
On mobile screens ($\le 768\text{px}$), enforce strict edge gutters:
```css
@media (max-width: 768px) {
  .container {
    padding-left: 16px !important;
    padding-right: 16px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
}
```

### Rule 3: iOS Safari Auto-Zoom Prevention
Any `<input>`, `<select>`, or `<textarea>` with a font size smaller than `16px` causes iOS Safari to auto-zoom the whole webpage on tap, breaking your layout:
```css
@media (max-width: 768px) {
  input, select, textarea,
  .form-input, .form-select, .form-textarea {
    font-size: 16px !important; /* Mandatory for iOS Safari */
    min-height: 46px;
    padding: 12px 14px;
    border-radius: 10px;
  }
}
```

### Rule 4: Text Overflow & Word Wrapping
Prevent long company titles or technical terms from breaking out of cards:
```css
.hero-title, .section-title, .section-subtitle, h1, h2, h3 {
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: manual;
}
```

### Rule 5: Aspect Ratio Enforcement for Imagery
Prevent media jumping or collapsing before images finish loading:
```css
.card-media, .service-media, .hero-showcase {
  aspect-ratio: 16 / 10;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
}

.card-media img, .service-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

---

## 4. Header & Navigation Architecture

### The Problem
On mobile, trying to fit a brand logo, a long phone number (`+91 98405 09896`), and a hamburger button on one 375px bar causes text wrapping, overlapping, or displaced menus.

### The Solution: Compact Adaptive Action Bar
1. **Desktop ($> 768\text{px}$):**
   - Left: Brand Emblem + Wordmark.
   - Center: Navigation links.
   - Right: Pill button with phone icon + full phone number. Hamburger is hidden.
2. **Mobile ($\le 768\text{px}$):**
   - The phone number text is hidden.
   - The Call CTA transforms into a **38×38px circular quick-call button** with an SVG telephone icon.
   - The hamburger button is a **38×38px circular toggle**.
   - Pinned with `flex-shrink: 0` and an 8px gap (total width = 84px).
   - This leaves 260px+ of pure space for the brand logo, preventing any wrapping or overlap!
3. **Inside the Mobile Drawer:**
   - Full viewport coverage (`position: fixed; top: 56px; width: 100vw; height: calc(100dvh - 56px); background: #FFFFFF;`).
   - Features a high-contrast **Headquarters Direct Line Card** at the bottom with a 1-tap call button.

```html
<!-- Header HTML Blueprint -->
<header class="site-header">
  <div class="container nav-inner">
    <a href="#hero" class="brand-link">
      <img src="/images/emblem.png" alt="Logo" class="brand-emblem-img">
      <div class="brand-text-block">
        <span class="brand-name">BRAND</span>
        <span class="brand-sub">INFRA &amp; DEVELOPERS</span>
      </div>
    </a>

    <nav role="navigation">
      <ul class="nav-menu" id="nav-menu">
        <li><a href="#services" class="nav-link">Civil Works</a></li>
        <li><a href="#fleet" class="nav-link">Mining Fleet</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
        <!-- Mobile Drawer Contact Card -->
        <li class="nav-menu-contact-drawer">
          <div class="drawer-contact-card">
            <span class="drawer-contact-title">Headquarters Direct Line</span>
            <a href="tel:+919840509896" class="drawer-phone-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +91 98405 09896
            </a>
            <span class="drawer-address-note">Corporate Towers · South India</span>
          </div>
        </li>
      </ul>
    </nav>

    <div class="nav-actions">
      <a href="tel:+919840509896" class="nav-cta-btn" aria-label="Call Headquarters">
        <svg class="nav-cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span class="nav-cta-label">+91 98405 09896</span>
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </div>
</header>
```

---

## 5. Mobile Data Tables & Complex Grids

Wide tables (e.g., equipment inventory, pricing) must **never** be placed directly on the page without horizontal scroll isolation. Otherwise, they stretch the entire mobile document width.

### Isolation Architecture
```html
<div class="fleet-box">
  <div class="fleet-box-header">
    <h3 class="fleet-box-title">Mining &amp; Earthmoving Fleet</h3>
  </div>
  <!-- Scroll isolation wrapper -->
  <div class="fleet-table-scroll">
    <table class="apple-table">
      <thead>...</thead>
      <tbody>...</tbody>
    </table>
  </div>
</div>
```

```css
.fleet-box {
  width: 100%;
  max-width: 100%;
  overflow: hidden; /* Contains the wrapper */
  box-sizing: border-box;
}

.fleet-table-scroll {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* Momentum scrolling on iOS */
  box-sizing: border-box;
}

.apple-table {
  min-width: 540px; /* Table maintains clean tabular format */
  width: 100%;
  border-collapse: collapse;
}
```

---

## 6. Social Link Sharing & Favicon Regulations

### Favicon Tab Requirement
- In dark-themed browser tabs, a dark logo disappears completely.
- **Rule:** Provide a high-contrast white emblem (`kat-emblem-white.png`) with an ambient dark halo and subtle orange accent.
```html
<link rel="icon" type="image/png" href="/images/kat-emblem-white.png?v=3">
<link rel="shortcut icon" href="/favicon.ico?v=3">
<link rel="apple-touch-icon" href="/images/kat-emblem-white.png?v=3">
```

### Social Media Previews (WhatsApp, LinkedIn, iMessage, Twitter/X)
1. **The Crawler Dilemma:** Link preview crawlers (WhatsApp, Telegram) often fail to unfurl images hosted on newly created domains or private repos (returning 404).
2. **The Fix:** Point social media meta tags directly to a public GitHub Raw CDN URL:
   `https://raw.githubusercontent.com/<username>/<repo>/main/public/images/og-share-card.png`
3. **Dimensions:**
   - **Horizontal Card:** `1200 × 630px` (PNG, under 300KB) for LinkedIn, X, and iMessage.
   - **Square Card:** `400 × 400px` (PNG) for WhatsApp 1:1 preview.
4. **Minimal Word Copywriting:**
   - Keep `og:title` strictly to the company name: `KAT INFRA & DEVELOPERS`
   - Keep `og:description` under 10 words: `Heavy Mining Fleet · Plotted Layouts · Civil Infrastructure`

```html
<!-- Open Graph Metadata -->
<meta property="og:type" content="website">
<meta property="og:title" content="KAT INFRA &amp; DEVELOPERS">
<meta property="og:description" content="Heavy Mining Fleet · Plotted Layouts · Civil Infrastructure">
<meta property="og:image" content="https://raw.githubusercontent.com/manojmjj/KAT-Infra-and-developers/main/public/images/og-share-card.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- WhatsApp Square Fallback -->
<meta property="og:image" content="https://raw.githubusercontent.com/manojmjj/KAT-Infra-and-developers/main/public/images/og-share-square.png">
<meta property="og:image:width" content="400">
<meta property="og:image:height" content="400">
<link rel="image_src" href="https://raw.githubusercontent.com/manojmjj/KAT-Infra-and-developers/main/public/images/og-share-square.png">
```

---

## 7. Cinematic Video Preloader Pattern

A luxury intro overlay builds high-value anticipation. It must be resilient against autoplay blocks and accessible on slow connections:

1. **Auto-Play with Soundless Mute:** `autoplay muted playsinline`.
2. **Skip Button:** Always offer a visible `#preloader-skip` button for returning visitors.
3. **Safety Timeout:** Hardcoded safety timer (`setTimeout(dismissPreloader, 9500)`) so a stalled video never traps the user.
4. **Smooth Exit:**
```css
.site-preloader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 650ms cubic-bezier(0.16, 1, 0.3, 1), visibility 650ms ease;
}
```

---

## 8. Next-Idea Execution Recipe: How to Build Your Next Site

When you start your next idea, execute in this order:

1. **Define the Foundation Token File (`styles.css`):**
   - Copy `:root` variables (Colors, typography clamp scale, radii, shadows).
   - Set up the base reset and `html, body { overflow-x: clip; }`.
2. **Scaffold Sections:**
   - **Sticky Header:** Brand + Nav Menu + Circular Call & Hamburger.
   - **Hero:** Kicker badge + Clamped Headline + Subtitle + 2 CTA buttons + 16:10 Showcase Card.
   - **Credentials Strip:** 4-column metric grid (e.g., Operating Fleet, Land Developed, GSTIN).
   - **Core Offerings (Services):** Alternating feature cards with 16:10 image on one side, specs checklist on other.
   - **Technical Table (Optional):** Wrapped in `.table-scroll-wrap`.
   - **Leadership & Credibility Card:** Founder profile, signature quote, location verification.
   - **Apple-Style Interactive Inquiry Form:** Chip pills for subject selection + 16px inputs + submit CTA.
   - **Apple Dark Footer:** Dot matrix brand band, 3-column link directory, legal registration line, Back to Top button.
3. **Create the 3 Visual Assets:**
   - White tab favicon (`kat-emblem-white.png`).
   - 1200×630 OG Banner (`og-share-card.png`).
   - 400×400 Square thumbnail (`og-share-square.png`).
4. **Run the Automated Viewport Audit:**
   - Test at 360px, 375px, 390px, 412px, 768px, 1024px.
   - Verify `scrollWidth === innerWidth` (Zero horizontal overflow).

---

## 9. Skills & Specialized Agents Involved

This architecture was built and audited using the following specialized skillsets:

| Skill / Capability | Purpose & Contribution |
|--------------------|------------------------|
| **`frontend-design`** | Masterminded the Apple-style aesthetic: SF Pro typography hierarchy, micro-borders (`rgba(0,0,0,0.08)`), clean surface cards, and restrained high-contrast palette. |
| **`modern-web-guidance`** | Enforced modern browser best practices: CSS `overflow-x: clip`, fluid KaTeX/type clamping, iOS Safari 16px auto-zoom mitigation, and accessible ARIA attributes. |
| **`impeccable`** | Polished frontend layout: spacing rhythm, 16:10 aspect ratio locking, button hover physics, and zero-defect responsive design systems. |
| **`chrome-devtools` & Headless CDP** | Executed automated headless browser audits across 6 viewports (360px to 1024px), verifying zero pixel overflow, zero element collision, and verifying drawer interactivity. |
