import { flatModules } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import HeartPulse from '../../ui/HeartPulse.jsx'
import { Reveal } from '../../ui/Reveal.jsx'
import { Heart } from '../../ui/Icons.jsx'

/** The doctors' quote + "Smiles made with heart" — the brand's emotional core. */
export default function Quote({ section }) {
  const texts = flatModules(section).filter((m) => m.type === 'text')
  const [quote, author, title, sub] = texts
  return (
    <section className="relative isolate overflow-hidden bg-forest py-20 text-cream lg:py-28">
      <HeartPulse className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size="40rem" tone="coral" />
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <Heart className="h-8 w-8 text-coral animate-heartbeat" filled />
          <Prose html={quote?.html} className="prose-light quote-body mt-6" />
          <Prose html={author?.html} className="prose-light mt-5 text-peach" />
        </Reveal>
        <Reveal delay={0.1} className="lg:pl-10">
          <Prose html={title?.html} className="prose-light quote-title" />
          <Prose html={sub?.html} className="prose-light mt-3" />
        </Reveal>
      </Container>
      <style>{`.quote-body p{font-family:var(--font-display);font-size:clamp(1.15rem,2vw,1.5rem);line-height:1.5;color:var(--color-cream)}.quote-title h2,.quote-title h3{font-size:clamp(2.2rem,5vw,4rem);line-height:1.05}.quote-title em{color:var(--color-peach)}`}</style>
    </section>
  )
}
