import site from '../../content/site.json'
import { flatModules } from '../../lib/content.js'
import SmartLink from '../ui/SmartLink.jsx'
import { Calendar, Phone, Pin } from '../ui/Icons.jsx'

const ICONS = { Phone, 'Book Online': Calendar, Directions: Pin }

/**
 * Sticky mobile action bar — mirrors the live site's Phone / Book Online /
 * Directions blurbs (footer row 3).
 */
export default function MobileBar() {
  const blurbs = site.footer.flatMap((s) => flatModules(s)).filter((m) => m.type === 'blurb' && m.title)
  const hrefFor = (title) => {
    if (title === 'Phone') return site.header_links.find((l) => l.href.startsWith('tel:'))?.href
    if (title === 'Book Online') return site.header_links.find((l) => !l.href.startsWith('tel:'))?.href
    return site.topbar?.links?.find((l) => l.label)?.href
  }
  if (!blurbs.length) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <ul className="grid grid-cols-3 border-t border-forest/10 bg-cream/95 backdrop-blur">
        {blurbs.map((b) => {
          const Icon = ICONS[b.title] || Calendar
          const primary = b.title === 'Book Online'
          return (
            <li key={b.title}>
              <SmartLink href={hrefFor(b.title) || '#'} className={`flex flex-col items-center gap-1 py-2.5 text-[0.7rem] font-semibold ${primary ? 'bg-coral text-ink' : 'text-forest'}`}>
                <Icon className="h-5 w-5" />
                {b.title}
              </SmartLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
