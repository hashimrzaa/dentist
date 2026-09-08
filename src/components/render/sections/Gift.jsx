import { flatModules } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import { Reveal } from '../../ui/Reveal.jsx'

/** "Claim Your New Patient Gift!" strip — copy + gift-bag image from the live site. */
export default function Gift({ section }) {
  const mods = flatModules(section)
  const text = mods.find((m) => m.type === 'text')
  const img = mods.find((m) => m.type === 'image')
  return (
    <section className="relative -mt-6 pb-6 lg:-mt-10">
      <Container>
        <Reveal className="card relative flex items-center gap-5 overflow-hidden bg-peach-soft/90 px-6 py-4 sm:gap-8 sm:px-8">
          <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-peach/50 blur-2xl animate-glow" />
          {img?.src && <img src={img.src} alt={img.alt || ''} width={240} height={216} loading="lazy" decoding="async" className="h-16 w-auto shrink-0 animate-float sm:h-20" />}
          <Prose html={text?.html} className="gift-copy relative" />
        </Reveal>
      </Container>
      <style>{`.gift-copy h2,.gift-copy h3,.gift-copy p:first-child strong{font-family:var(--font-display);font-size:1.25rem;color:var(--color-forest);margin:0}.gift-copy p{margin-top:.25rem}.gift-copy a{font-weight:700}`}</style>
    </section>
  )
}
