import { flatModules } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import Button from '../../ui/Button.jsx'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal.jsx'

/**
 * "Excellence at every step": icon_list title + text pairs become a numbered
 * journey. Titles/bodies are verbatim.
 */
export default function Steps({ section }) {
  const mods = flatModules(section)
  const heading = mods.find((m) => m.type === 'text' && /<h2[\s>]/.test(m.html))
  const button = mods.find((m) => m.type === 'button')
  const steps = []
  mods.forEach((m, i) => {
    if (m.type === 'icon_list') {
      const body = mods[i + 1]?.type === 'text' ? mods[i + 1] : null
      steps.push({ title: m.items.map((x) => x.text).join(' '), body })
    }
  })
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Prose html={heading?.html} />
          {button && <Button href={button.href} label={button.label} variant="forest" className="mt-8" arrow />}
        </Reveal>
        <RevealGroup as="ol" className="relative space-y-4">
          <span aria-hidden="true" className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-peach via-coral to-sky" />
          {steps.map((s, i) => (
            <RevealItem as="li" key={i} className="card relative ml-0 flex gap-5 p-6">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest font-display text-lg text-peach" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-xl text-forest">{s.title}</h3>
                <Prose html={s.body?.html} className="prose-sm mt-2" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
