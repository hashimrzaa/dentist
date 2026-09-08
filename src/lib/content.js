/**
 * Content helpers. All page copy lives in /src/content (generated verbatim from
 * mydeardentist.net). This module loads pages lazily and classifies Divi
 * sections into the redesign's layout "recipes".
 */
import index from '../content/index.json'

const loaders = import.meta.glob('../content/pages/*.json')

export const pageIndex = index

export function normalizePath(p) {
  if (!p) return '/'
  let s = p.split('?')[0].split('#')[0]
  if (!s.startsWith('/')) s = '/' + s
  if (!s.endsWith('/')) s += '/'
  return s
}

export function findPage(pathname) {
  const p = normalizePath(pathname)
  return index.find((x) => x.path === p) || null
}

export async function loadPage(slug) {
  const key = `../content/pages/${slug}.json`
  const load = loaders[key]
  if (!load) return null
  const mod = await load()
  return mod.default || mod
}

export const stripTags = (html = '') =>
  html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

export function flatModules(section) {
  const out = []
  const walk = (mods) => mods.forEach((m) => (m.type === 'row' ? m.columns.forEach((c) => walk(c.modules)) : out.push(m)))
  section.rows.forEach((r) => r.columns.forEach((c) => walk(c.modules)))
  return out
}

export function sectionText(section) {
  return flatModules(section)
    .map((m) => (m.type === 'text' ? stripTags(m.html) : m.title || m.text || ''))
    .join(' ')
    .trim()
}

/** Classify a Divi section into a layout recipe. Order matters. */
export function classifySection(section) {
  const mods = flatModules(section)
  const has = (t) => mods.some((m) => m.type === t)
  const code = (kind) => mods.some((m) => m.type === 'code' && m.kind === kind)
  const text = sectionText(section)

  if (code('hero-image')) return 'hero-image'
  if (mods.some((m) => m.type === 'text' && /<h1[\s>]/.test(m.html))) return 'hero'
  if (/^Claim Your New Patient Gift/.test(text)) return 'gift'
  if (has('faq')) return 'faq'
  if (has('image_carousel')) return 'gallery'
  if (has('card_carousel')) return 'affiliations'
  if (code('instagram')) return 'instagram'
  if (code('marquee')) return 'marquee'
  if (code('form')) return 'form'
  if (code('map')) return 'office'
  if (/^[“"]/.test(text)) return 'quote'
  if (/^Join the patients/.test(text)) return 'join'
  if (has('heading')) return 'chips'
  if (has('masonry_gallery')) return 'logos'
  if (mods.some((m) => m.type === 'text' && stripTags(m.html) === '$99')) return 'offer'
  if (/Membership — \$\d+\/month/.test(text)) return 'plans'
  if (has('typing_effect')) return 'split'
  if (has('icon')) return 'features'
  if (mods.filter((m) => m.type === 'icon_list').length >= 4 && mods.filter((m) => m.type === 'text').length >= 5) return 'steps'
  const cols = section.rows.reduce((n, r) => n + r.columns.filter((c) => c.modules.length).length, 0)
  if (cols === 1 && has('button') && mods.some((m) => m.type === 'text' && /<h2[\s>]/.test(m.html)) && mods.length <= 3) return 'cta'
  if (has('image') && has('text') && section.rows.length === 1) return 'split'
  return 'generic'
}

/** First useful image in the page (used as hero art on inner pages). */
export function heroImageFor(page) {
  for (const s of page.sections) {
    for (const m of flatModules(s)) {
      if (m.type === 'image' && m.src && !/asset-4a/.test(m.src)) return { src: m.src, alt: m.alt || '' }
    }
  }
  for (const s of page.sections) {
    for (const m of flatModules(s)) {
      if (m.type === 'image_carousel' && m.images?.[0]?.src) return { src: m.images[0].src, alt: m.images[0].alt || '' }
    }
  }
  return null
}

/** Map Divi column width classes to CSS grid spans out of 12. */
export function colSpan(width) {
  const map = { '4_4': 12, '1_2': 6, '1_3': 4, '2_3': 8, '1_4': 3, '3_4': 9, '1_5': 2.4, '2_5': 4.8, '3_5': 7.2, '4_5': 9.6, '1_6': 2, '5_6': 10 }
  return map[width] || 12
}
