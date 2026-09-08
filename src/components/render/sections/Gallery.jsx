import { useRef } from 'react'
import { flatModules } from '../../../lib/content.js'
import { Chevron } from '../../ui/Icons.jsx'

/** Office photo carousel (dsm_image_carousel) → scroll-snap gallery with controls. */
export default function Gallery({ section }) {
  const mod = flatModules(section).find((m) => m.type === 'image_carousel')
  const ref = useRef(null)
  const images = (mod?.images || []).filter((i) => i.src)
  if (!images.length) return null
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.7), behavior: 'smooth' })
  return (
    <section className="relative bg-sand py-12 lg:py-16" aria-label="Office gallery">
      <div className="container-x mb-4 flex justify-end gap-2">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous photos" className="grid h-11 w-11 place-items-center rounded-full border border-forest/15 bg-white text-forest hover:border-coral">
          <Chevron className="h-4 w-4 rotate-90" />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Next photos" className="grid h-11 w-11 place-items-center rounded-full border border-forest/15 bg-white text-forest hover:border-coral">
          <Chevron className="h-4 w-4 -rotate-90" />
        </button>
      </div>
      <ul ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] sm:px-8 lg:px-12" tabIndex={0}>
        {images.map((img, i) => (
          <li key={img.src} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw]">
            <figure className="group overflow-hidden rounded-[1.5rem] bg-cream">
              <img src={img.src} alt={img.alt || img.title?.replace(/-/g, ' ') || `Office photo ${i + 1}`} loading="lazy" decoding="async" width={2000} height={1333} className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
