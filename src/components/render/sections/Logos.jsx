import { colSpan } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import { ModuleList } from '../ModuleRenderer.jsx'

/**
 * "Payment Made Simple" section (payment options + insurance logo gallery).
 * Uses the generic column grid; the masonry gallery renders as a logo grid.
 */
export default function Logos({ section }) {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container className="space-y-12">
        {section.rows.map((row, ri) => {
          const cols = row.columns.filter((c) => c.modules.length)
          if (cols.length === 1) {
            return (
              <div key={ri} className="mx-auto max-w-3xl text-center">
                <ModuleList modules={cols[0].modules} className="logos-center" />
              </div>
            )
          }
          const template = cols.map((c) => `minmax(0,${colSpan(c.width)}fr)`).join(' ')
          return (
            <div key={ri} className="grid items-start gap-8 lg:gap-12" style={{ '--tpl': template }}>
              {cols.map((c, ci) => (
                <div key={ci} className={`min-w-0 ${ci === 1 ? 'card p-6 sm:p-8' : ''}`}>
                  <ModuleList modules={c.modules} />
                </div>
              ))}
              <style>{`@media (min-width:1024px){[style*="--tpl"]{grid-template-columns:var(--tpl)}}`}</style>
            </div>
          )
        })}
      </Container>
      <style>{`.logos-center .prose{text-align:center}`}</style>
    </section>
  )
}
