import { stripTags } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal.jsx'
import { IconBadge } from '../ModuleRenderer.jsx'

/**
 * Icon + text columns ("Our whole-body approach", "How we help you").
 * The Divi icon glyphs are replaced with brand line icons.
 */
export default function Features({ section, tone = 0 }) {
  const rows = section.rows
  const headingRow = rows.find((r) => r.columns.filter((c) => c.modules.length).length === 1)
  const gridRows = rows.filter((r) => r !== headingRow)
  const heading = headingRow?.columns.find((c) => c.modules.length)?.modules.find((m) => m.type === 'text')

  return (
    <section className={`py-16 lg:py-24 ${tone % 2 ? 'bg-sand' : 'bg-cream'}`}>
      <Container>
        {heading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <Prose html={heading.html} className="prose-center" />
          </Reveal>
        )}
        {gridRows.map((row, ri) => {
          const cols = row.columns.filter((c) => c.modules.length)
          const compact = cols.every((c) => c.modules.filter((m) => m.type === 'text').every((m) => stripTags(m.html).length < 40))
          return (
            <RevealGroup key={ri} as="ul" className={`mt-12 grid gap-5 ${cols.length === 3 ? 'md:grid-cols-3' : cols.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'}`}>
              {cols.map((c, ci) => {
                const text = c.modules.find((m) => m.type === 'text')
                return (
                  <RevealItem as="li" key={ci} className={`card group h-full p-7 transition-transform duration-300 hover:-translate-y-1 ${compact ? 'flex items-center gap-4' : ''}`}>
                    <IconBadge index={ci + ri * 3} tone={compact ? 'forest' : 'peach'} className={compact ? '' : 'mb-5'} />
                    <Prose html={text?.html} className={`feature-copy ${compact ? 'font-display text-lg text-forest' : ''}`} />
                  </RevealItem>
                )
              })}
            </RevealGroup>
          )
        })}
      </Container>
      <style>{`.feature-copy h3,.feature-copy h4,.feature-copy p:first-child strong{font-family:var(--font-display);font-size:1.3rem;color:var(--color-forest);display:block;margin-bottom:.4rem}.feature-copy p:first-child strong{font-weight:400}`}</style>
    </section>
  )
}
