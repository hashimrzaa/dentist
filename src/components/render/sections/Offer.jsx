import { flatModules, stripTags } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import Button from '../../ui/Button.jsx'
import HeartPulse from '../../ui/HeartPulse.jsx'
import { Reveal } from '../../ui/Reveal.jsx'

/** The "$99 First Visit" offer — intro, price card, and footnote, verbatim. */
export default function Offer({ section }) {
  const mods = flatModules(section)
  const texts = mods.filter((m) => m.type === 'text')
  const priceIdx = texts.findIndex((m) => stripTags(m.html) === '$99')
  const label = texts[priceIdx - 1]
  const price = texts[priceIdx]
  const intro = texts.slice(0, Math.max(priceIdx - 1, 0))
  const after = texts.slice(priceIdx + 1)
  const desc = after[0]
  const notes = after.slice(1)
  const button = mods.find((m) => m.type === 'button')

  return (
    <section className="relative isolate overflow-hidden bg-forest py-16 text-cream lg:py-24">
      <HeartPulse className="-left-20 top-[-10%]" size="26rem" tone="peach" />
      <HeartPulse className="right-[-10%] bottom-[-30%]" size="30rem" tone="sky" delay="-1.5s" />
      <Container>
        {intro.map((m, i) => (
          <Reveal key={i} className="mx-auto max-w-2xl text-center">
            <Prose html={m.html} className="prose-light prose-center offer-intro" />
          </Reveal>
        ))}
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-cream p-8 text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] sm:p-10">
            <span aria-hidden="true" className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-peach/40 blur-2xl animate-glow" />
            <div className="relative grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="text-center sm:text-left">
                {label && <p className="eyebrow">{stripTags(label.html)}</p>}
                {price && <p className="mt-2 font-display text-6xl leading-none text-forest sm:text-7xl">{stripTags(price.html)}</p>}
              </div>
              <div>
                {desc && <Prose html={desc.html} className="offer-desc" />}
                {button && <Button href={button.href} label={button.label} external={button.external} className="mt-6" />}
              </div>
            </div>
          </div>
        </Reveal>
        {notes.map((m, i) => (
          <Reveal key={i} className="mx-auto mt-8 max-w-2xl text-center">
            <Prose html={m.html} className="prose-light prose-center prose-sm" />
          </Reveal>
        ))}
      </Container>
      <style>{`.offer-intro h2{font-size:clamp(1.9rem,4vw,2.9rem)}.offer-desc p+p{font-size:.9rem;color:var(--color-ink-soft)}`}</style>
    </section>
  )
}
