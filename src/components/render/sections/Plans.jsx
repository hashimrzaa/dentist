import { flatModules, stripTags } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal.jsx'

/** Membership plans: each plan text ("Child Membership — $25/month …") becomes a pricing card. */
export default function Plans({ section }) {
  const mods = flatModules(section)
  const texts = mods.filter((m) => m.type === 'text')
  const plans = texts.filter((m) => /Membership — \$\d+\/month/.test(stripTags(m.html)))
  const heading = texts.find((m) => !plans.includes(m) && /<h2[\s>]/.test(m.html)) || texts[0]
  const notes = texts.filter((m) => m !== heading && !plans.includes(m))
  return (
    <section className="bg-forest-mist py-16 lg:py-24">
      <Container>
        {heading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <Prose html={heading.html} className="prose-center" />
          </Reveal>
        )}
        <RevealGroup as="ul" className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => {
            const plain = stripTags(p.html)
            const m = plain.match(/^(.*?Membership)\s—\s(\$\d+\/month)\s*(.*)$/)
            const featured = i === 1
            return (
              <RevealItem as="li" key={i} className={`relative rounded-[1.75rem] p-7 sm:p-8 ${featured ? 'bg-forest text-cream shadow-[0_40px_80px_-40px_rgba(2,47,46,0.7)]' : 'card'}`}>
                {m ? (
                  <>
                    <p className={`eyebrow ${featured ? 'text-peach' : ''}`}>{m[1]}</p>
                    <p className={`mt-3 font-display text-4xl ${featured ? 'text-cream' : 'text-forest'}`}>{m[2]}</p>
                    <p className={`mt-4 text-[0.95rem] leading-relaxed ${featured ? 'text-cream/80' : 'text-ink-soft'}`}>{m[3]}</p>
                  </>
                ) : (
                  <Prose html={p.html} className={featured ? 'prose-light' : ''} />
                )}
              </RevealItem>
            )
          })}
        </RevealGroup>
        {notes.map((n, i) => (
          <Reveal key={i} className="mx-auto mt-8 max-w-2xl text-center">
            <Prose html={n.html} className="prose-center prose-sm" />
          </Reveal>
        ))}
      </Container>
    </section>
  )
}
