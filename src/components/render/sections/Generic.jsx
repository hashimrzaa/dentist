import { colSpan } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import { ModuleList } from '../ModuleRenderer.jsx'

const TONES = ['bg-cream', 'bg-sand', 'bg-cream', 'bg-forest-mist']

/**
 * Default recipe: honours the live site's row/column structure, mapping Divi
 * column widths to a 12-col grid. Empty gutter columns collapse so centred
 * content (1/5 · 3/5 · 1/5 rows) reads as a narrow measure.
 */
export default function Generic({ section, tone = 0, className = '' }) {
  return (
    <section className={`py-16 lg:py-24 ${TONES[tone % TONES.length]} ${className}`}>
      <Container className="space-y-12">
        {section.rows.map((row, ri) => {
          const cols = row.columns.filter((c) => c.modules.length)
          const centered = cols.length === 1 && row.columns.length >= 3
          if (centered) {
            return (
              <div key={ri} className="mx-auto max-w-3xl text-center">
                <ModuleList modules={cols[0].modules} className="generic-center" />
              </div>
            )
          }
          const template = cols.map((c) => `minmax(0,${colSpan(c.width)}fr)`).join(' ')
          return (
            <div key={ri} className="grid items-center gap-8 lg:gap-12" style={{ '--tpl': template }}>
              {cols.map((c, ci) => (
                <div key={ci} className="min-w-0">
                  <ModuleList modules={c.modules} />
                </div>
              ))}
              <style>{`@media (min-width:1024px){[style*="--tpl"]{grid-template-columns:var(--tpl)}}`}</style>
            </div>
          )
        })}
      </Container>
      <style>{`.generic-center .prose{text-align:center}.generic-center .prose ul{display:inline-block;text-align:left}`}</style>
    </section>
  )
}
