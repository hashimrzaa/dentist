import { colSpan } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import Button from '../../ui/Button.jsx'
import TypingHeadline from '../../ui/TypingHeadline.jsx'
import HeartPulse from '../../ui/HeartPulse.jsx'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal.jsx'
import ModuleRenderer, { Figure, BlurbCard, Checklist } from '../ModuleRenderer.jsx'

const TONES = ['bg-cream', 'bg-sand', 'bg-peach-soft/60', 'bg-forest-mist']

/**
 * Image + copy split (the site's most common layout). Image side keeps the
 * live site's order; copy gets the editorial treatment.
 */
export default function Split({ section, tone = 0 }) {
  return (
    <section className={`relative overflow-hidden py-16 lg:py-24 ${TONES[tone % TONES.length]}`}>
      {tone % 3 === 2 && <HeartPulse className="-right-24 -bottom-24" size="22rem" />}
      <Container className="space-y-16">
        {section.rows.map((row, ri) => {
          const cols = row.columns.filter((c) => c.modules.length)
          const imageCol = cols.findIndex((c) => c.modules.some((m) => m.type === 'image'))
          const isSplit = cols.length === 2
          const template = cols.map((c) => `minmax(0,${colSpan(c.width)}fr)`).join(' ')
          return (
            <div key={ri} className="grid items-center gap-8 lg:gap-14" style={{ '--tpl': template }}>
              {cols.map((c, ci) => (
                <div key={ci} className="min-w-0">
                  {ci === imageCol && isSplit ? (
                    <Reveal>
                      {c.modules.map((m, mi) =>
                        m.type === 'image' ? (
                          <div key={mi} className="relative">
                            <div aria-hidden="true" className={`absolute -inset-3 -z-10 rounded-[2.25rem] ${ci === 0 ? 'rotate-[-1.5deg] bg-peach/35' : 'rotate-[1.5deg] bg-sky-light'}`} />
                            <Figure src={m.src} alt={m.alt} href={m.href} ratio="aspect-[4/3] lg:aspect-[5/4]" />
                          </div>
                        ) : (
                          <ModuleRenderer key={mi} m={m} index={mi} />
                        ),
                      )}
                    </Reveal>
                  ) : (
                    <RevealGroup className="space-y-6">
                      {groupModules(c.modules).map((g, gi) => (
                        <RevealItem key={gi}>{renderGroup(g)}</RevealItem>
                      ))}
                    </RevealGroup>
                  )}
                </div>
              ))}
              <style>{`@media (min-width:1024px){[style*="--tpl"]{grid-template-columns:var(--tpl)}}`}</style>
            </div>
          )
        })}
      </Container>
    </section>
  )
}

/** Merge consecutive icon_lists into one checklist, blurbs into a card grid, buttons into a row. */
function groupModules(mods) {
  const out = []
  mods.forEach((m) => {
    const last = out[out.length - 1]
    if (m.type === 'icon_list' && last?.kind === 'list') last.items.push(...m.items)
    else if (m.type === 'icon_list') out.push({ kind: 'list', items: [...m.items] })
    else if (m.type === 'blurb' && last?.kind === 'blurbs') last.items.push(m)
    else if (m.type === 'blurb') out.push({ kind: 'blurbs', items: [m] })
    else if (m.type === 'button' && last?.kind === 'buttons') last.items.push(m)
    else if (m.type === 'button') out.push({ kind: 'buttons', items: [m] })
    else out.push({ kind: 'one', m })
  })
  return out
}

function renderGroup(g) {
  if (g.kind === 'list') return <Checklist items={g.items} />
  if (g.kind === 'blurbs') return <div className="grid gap-4 sm:grid-cols-2">{g.items.map((b, i) => <BlurbCard key={i} m={b} index={i} />)}</div>
  if (g.kind === 'buttons') return <div className="flex flex-wrap gap-3">{g.items.map((b, i) => <Button key={i} href={b.href} label={b.label} external={b.external} variant={i === 0 ? 'coral' : 'ghost'} />)}</div>
  const m = g.m
  if (m.type === 'typing_effect') return <TypingHeadline before={m.before} words={m.words} after={m.after} level={m.level || 'h2'} className="text-balance text-[1.9rem] leading-[1.12] text-forest sm:text-[2.4rem] lg:text-[2.9rem]" />
  if (m.type === 'text') return <Prose html={m.html} />
  return <ModuleRenderer m={m} />
}
