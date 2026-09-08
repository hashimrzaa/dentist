import { flatModules } from '../../../lib/content.js'

/** Professional affiliations (ADA, TDA, …) → slow marquee of badges. */
export default function Affiliations({ section }) {
  const mod = flatModules(section).find((m) => m.type === 'card_carousel')
  const items = mod?.items || []
  if (!items.length) return null
  const Row = ({ hidden }) => (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden || undefined}>
      {items.map((it) => (
        <li key={it.title} className="grid h-20 w-40 shrink-0 place-items-center rounded-2xl border border-forest/10 bg-white">
          {it.image ? <img src={it.image} alt={it.alt || it.title} loading="lazy" className="max-h-10 object-contain" /> : <span className="font-display text-xl tracking-wide text-forest">{it.title}</span>}
        </li>
      ))}
    </ul>
  )
  return (
    <section className="border-y border-forest/10 bg-sand py-8" aria-label="Professional affiliations">
      <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee__track flex w-max animate-marquee-slow">
          <Row />
          <Row hidden />
          <Row hidden />
        </div>
      </div>
    </section>
  )
}
