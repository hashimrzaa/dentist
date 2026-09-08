import { flatModules } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal.jsx'
import { Heart } from '../../ui/Icons.jsx'

/** "Our Services" list of headings → animated pill grid. */
export default function Chips({ section }) {
  const mods = flatModules(section)
  const heading = mods.find((m) => m.type === 'text')
  const chips = mods.filter((m) => m.type === 'heading')
  return (
    <section className="relative overflow-hidden bg-peach-soft/60 py-16 lg:py-24">
      <Container>
        {heading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <Prose html={heading.html} className="prose-center" />
          </Reveal>
        )}
        <RevealGroup as="ul" stagger={0.04} className="mt-10 flex flex-wrap justify-center gap-3">
          {chips.map((c, i) => (
            <RevealItem as="li" key={i} y={10}>
              <span className="chip px-5 py-3 text-base">
                <Heart className="h-4 w-4 text-coral" filled />
                {c.text}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
