import { classifySection, heroImageFor } from '../../lib/content.js'
import Hero from './sections/Hero.jsx'
import Gift from './sections/Gift.jsx'
import Generic from './sections/Generic.jsx'
import Split from './sections/Split.jsx'
import Offer from './sections/Offer.jsx'
import Features from './sections/Features.jsx'
import Chips from './sections/Chips.jsx'
import Steps from './sections/Steps.jsx'
import Quote from './sections/Quote.jsx'
import Faq from './sections/Faq.jsx'
import Cta from './sections/Cta.jsx'
import Gallery from './sections/Gallery.jsx'
import Office from './sections/Office.jsx'
import Affiliations from './sections/Affiliations.jsx'
import InstagramFeed from './sections/InstagramFeed.jsx'
import Marquee from './sections/Marquee.jsx'
import ContactForm from './sections/ContactForm.jsx'
import Join from './sections/Join.jsx'
import Plans from './sections/Plans.jsx'
import Logos from './sections/Logos.jsx'

const RECIPES = {
  hero: Hero, gift: Gift, generic: Generic, split: Split, offer: Offer, features: Features, chips: Chips,
  steps: Steps, quote: Quote, faq: Faq, cta: Cta, gallery: Gallery, office: Office, affiliations: Affiliations,
  instagram: InstagramFeed, marquee: Marquee, form: ContactForm, join: Join, plans: Plans, logos: Logos,
}

/**
 * Walks the page's Divi sections (verbatim content) and renders each with the
 * matching redesign recipe. Section order is the live site's order.
 */
export default function PageRenderer({ page }) {
  const sections = page.sections.map((s) => ({ ...s, recipe: classifySection(s) }))

  // Home: the first section is just a full-bleed image; fold it into the hero.
  let heroBg = null
  if (sections[0]?.recipe === 'hero-image') {
    const code = sections[0].rows[0].columns[0].modules.find((m) => m.type === 'code')
    heroBg = code?.images?.[0] || null
    sections.shift()
  }
  const heroArt = heroBg ? null : heroImageFor(page)

  let tone = 0
  return (
    <>
      {sections.map((s, i) => {
        const Comp = RECIPES[s.recipe] || Generic
        const props = { section: s, index: i, page, tone: tone++ }
        if (s.recipe === 'hero') Object.assign(props, { bg: heroBg, art: heroArt, isHome: page.slug === 'home' })
        return <Comp key={s.id || i} {...props} />
      })}
    </>
  )
}
