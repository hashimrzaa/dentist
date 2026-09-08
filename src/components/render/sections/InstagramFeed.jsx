import { flatModules } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import SmartLink from '../../ui/SmartLink.jsx'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal.jsx'
import { Instagram, Play } from '../../ui/Icons.jsx'

/**
 * "Follow Us @mydeardentist" — reel captions + links from the live feed.
 * The live widget's thumbnails are placeholders, so cards use brand gradients.
 * TODO: swap in real thumbnails via the Instagram Graph API.
 */
export default function InstagramFeed({ section }) {
  const mods = flatModules(section)
  const heading = mods.find((m) => m.type === 'text')
  const feed = mods.find((m) => m.type === 'code' && m.kind === 'instagram')
  const posts = feed?.links || []
  const tones = ['from-peach to-coral', 'from-sky to-forest', 'from-forest to-forest-soft', 'from-coral to-peach', 'from-peach-light to-sky-light']
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <Prose html={heading?.html} className="ig-heading" />
          <Instagram className="h-8 w-8 text-coral" />
        </Reveal>
        <RevealGroup as="ul" stagger={0.06} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {posts.map((p, i) => (
            <RevealItem as="li" key={p.href}>
              <SmartLink href={p.href} className={`group relative block aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-gradient-to-br ${tones[i % tones.length]} p-4 text-cream`}>
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:scale-110"><Play className="h-4 w-4" /></span>
                <span className="absolute inset-x-4 bottom-4 text-sm font-medium leading-snug drop-shadow">{p.label}</span>
              </SmartLink>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
      <style>{`.ig-heading h2,.ig-heading h3{font-size:1.9rem}.ig-heading a{font-family:var(--font-sans);font-size:1rem;text-decoration:none;color:var(--color-coral-deep)}`}</style>
    </section>
  )
}
