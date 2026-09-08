import { flatModules } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import Button from '../../ui/Button.jsx'
import { Reveal } from '../../ui/Reveal.jsx'
import { Heart } from '../../ui/Icons.jsx'

/** Closing band: "Join the patients who found their dear dentist". */
export default function Join({ section }) {
  const mods = flatModules(section)
  const text = mods.find((m) => m.type === 'text')
  const button = mods.find((m) => m.type === 'button')
  return (
    <section className="bg-peach-soft py-16 lg:py-20">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-center gap-4">
            <Heart className="hidden h-10 w-10 shrink-0 text-coral animate-heartbeat sm:block" filled />
            <Prose html={text?.html} className="join-copy" />
          </div>
          {button && <Button href={button.href} label={button.label} external={button.external} variant="forest" arrow />}
        </Reveal>
      </Container>
      <style>{`.join-copy h2,.join-copy h3,.join-copy p{font-family:var(--font-display);font-size:clamp(1.5rem,3vw,2.2rem);color:var(--color-forest);line-height:1.2}`}</style>
    </section>
  )
}
