import { flatModules } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import Button from '../../ui/Button.jsx'
import HeartPulse from '../../ui/HeartPulse.jsx'
import { Reveal } from '../../ui/Reveal.jsx'

/** Centred call-to-action ("Ready to love your smile?"). */
export default function Cta({ section }) {
  const mods = flatModules(section)
  const texts = mods.filter((m) => m.type === 'text')
  const buttons = mods.filter((m) => m.type === 'button')
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <Reveal className="warm-gradient relative isolate overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-12 lg:py-24">
          <HeartPulse className="-left-16 -top-16" size="20rem" />
          <HeartPulse className="-bottom-24 -right-16" size="24rem" tone="sky" delay="-2s" />
          <div className="relative mx-auto max-w-2xl">
            {texts.map((t, i) => <Prose key={i} html={t.html} className="prose-center cta-copy" />)}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {buttons.map((b, i) => <Button key={i} href={b.href} label={b.label} external={b.external} variant={i === 0 ? 'coral' : 'ghost'} className="animate-heartbeat [animation-duration:3.6s]" />)}
            </div>
          </div>
        </Reveal>
      </Container>
      <style>{`.cta-copy h2{font-size:clamp(2.2rem,5vw,3.8rem)}.cta-copy em,.cta-copy span{color:var(--color-coral-deep);font-style:italic}`}</style>
    </section>
  )
}
