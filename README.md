# My Dear Dentist — Full-Site Redesign Prototype

A multi-page redesign of [mydeardentist.net](https://mydeardentist.net/) (Montrose, Houston).
**Every page, every word and every asset is the live site's own. Only the design, layout, motion and interaction are new.**

## Stack

| Layer | Choice |
| --- | --- |
| Framework | React 18 + Vite 6 (JavaScript / JSX) + React Router 6 |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/index.css`) |
| Scroll animation | GSAP 3 + ScrollTrigger (hero parallax, "smile" stroke draw) |
| Micro-interactions | Framer Motion (reveals, menus, accordions, cookie bar) |
| Fonts | Libre Baskerville (display) + Red Hat Text (body) — the brand's own pairing |
| Hosting | Vercel (`vercel.json` with SPA rewrites + asset caching) |

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # -> dist/
npm run preview   # http://localhost:4173
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

`vercel.json` rewrites every route to `index.html` (client-side routing), caches hashed assets immutably and adds basic security headers. Zero-config import from the Vercel dashboard also works.

## How the content works (verbatim guarantee)

The live site is built on Divi. Its pages were downloaded and parsed module-by-module
(text, blurbs, FAQ toggles, buttons, images, carousels, icon lists, forms, code blocks) into
JSON — **no copy was retyped, rewritten or summarised**:

```
src/content/
  index.json          # route → page title + meta description (live values)
  site.json           # top bar, logo, navigation, header CTAs, footer, cookie notice
  pages/*.json        # one file per live page — 23 pages, sections → rows → columns → modules
```

At runtime `src/lib/content.js` classifies each Divi section into a redesign "recipe"
(hero, gift strip, image/copy split, $99 offer, feature cards, service chips, steps journey,
doctors' quote, FAQ accordion, CTA, office gallery, office + map, affiliations marquee,
Instagram feed, text marquee, contact form, membership plans, insurance logos, closing band)
and `src/components/render/` renders it. Section order per page is the live order.

Pages covered: Home · About · Services (index) · 13 service pages · New Patients · Contact ·
Thank You · Privacy Policy · Accessibility Statement · HIPAA Notice · 404 (the live site's
"areas we serve" link resolves to its 404 page, so that page is reproduced with its own text).

Assets (logo, gift-bag illustration, office photos, doctor headshots, insurance logos, favicon)
load straight from the live site's URLs.

### Prototype notes / TODOs

- Contact form has no backend; submit routes to the site's own `/thank-you/` page.
- Instagram cards use the live feed's captions and reel links; thumbnails are brand gradients
  (the live widget serves placeholder images). Swap in the Graph API for real thumbnails.
- Map is a keyless Google Maps embed for the practice address.
- Google Fonts are loaded from the CDN; self-host for the last few Lighthouse points.

## Accessibility & motion

- Landmarks, skip link, keyboard-operable menus (Esc closes), accordions (`aria-expanded`),
  carousel controls, labelled form fields.
- `prefers-reduced-motion` disables the heartbeat / float / marquee loops, the typing headline,
  GSAP parallax and Framer transitions.
- Coral is used on buttons with charcoal text; `coral-deep` is the AA-safe text variant.

## Project layout

```
src/
  App.jsx / main.jsx            # router + scroll restoration
  index.css                     # tokens, utilities, prose styles
  content/                      # verbatim site content (generated)
  lib/content.js                # loaders, section classifier, helpers
  lib/motion.js                 # shared durations/easings (≤600ms rule)
  hooks/                        # useGsap, useReducedMotion, useSeo
  components/layout/            # TopBar, Header (services mega-menu), Footer, CookieBar, MobileBar
  components/ui/                # Button, SmartLink, Prose, Reveal, HeartPulse, SmileArc, TypingHeadline, Icons
  components/render/            # PageRenderer, ModuleRenderer, sections/<recipe>.jsx
  pages/                        # Page (dynamic), NotFound
```
