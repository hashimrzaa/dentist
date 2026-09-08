import site from '../../content/site.json'
import SmartLink from '../ui/SmartLink.jsx'
import { Facebook, Instagram, Pin, TikTok } from '../ui/Icons.jsx'

const ICONS = { facebook: Facebook, instagram: Instagram, tiktok: TikTok }

/** Slim utility bar: address (Google Maps link) + social links — same links as the live site. */
export default function TopBar() {
  const links = site.topbar?.links || []
  const address = links.find((l) => l.label)
  const socials = links.filter((l) => !l.label)
  return (
    <div className="hidden bg-forest text-cream md:block">
      <div className="container-x flex h-9 items-center justify-between text-[0.78rem]">
        {address && (
          <SmartLink href={address.href} className="inline-flex items-center gap-2 text-cream/85 transition-colors hover:text-peach">
            <Pin className="h-3.5 w-3.5" />
            {address.label}
          </SmartLink>
        )}
        <ul className="flex items-center gap-1">
          {socials.map((s) => {
            const key = Object.keys(ICONS).find((k) => s.href.includes(k)) || 'instagram'
            const Icon = ICONS[key]
            return (
              <li key={s.href}>
                <SmartLink href={s.href} aria-label={key[0].toUpperCase() + key.slice(1)} className="grid h-8 w-8 place-items-center rounded-full text-cream/80 transition-colors hover:bg-white/10 hover:text-peach">
                  <Icon className="h-4 w-4" />
                </SmartLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
