import { flatModules } from '../../../lib/content.js'

/** Full-width text marquee ("Comprehensive care for every smile ✽"). */
export default function Marquee({ section }) {
  const mod = flatModules(section).find((m) => m.type === 'code' && m.kind === 'marquee')
  const text = mod?.marquee
  if (!text) return null
  const Row = ({ hidden }) => (
    <span className="flex shrink-0 items-center gap-10 pr-10 font-display text-2xl text-peach sm:text-3xl" aria-hidden={hidden || undefined}>
      {Array.from({ length: 4 }).map((_, i) => <span key={i}>{text}</span>)}
    </span>
  )
  return (
    <section className="marquee overflow-hidden bg-forest py-5" aria-label={text}>
      <div className="marquee__track flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}
