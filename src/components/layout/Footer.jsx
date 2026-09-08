import site from '../../content/site.json'
import { flatModules } from '../../lib/content.js'
import SmartLink from '../ui/SmartLink.jsx'
import Prose from '../ui/Prose.jsx'
import { Facebook, Instagram, TikTok, Google } from '../ui/Icons.jsx'

const SOCIAL_ICONS = { facebook: Facebook, instagram: Instagram, tiktok: TikTok }

/** Pulls the footer modules parsed from the live site's footer layout. */
function useFooterParts() {
  const mods = site.footer.flatMap((s) => flatModules(s))
  const icon = mods.find((m) => m.type === 'image')
  const menus = mods.filter((m) => m.type === 'menu')
  const texts = mods.filter((m) => m.type === 'text')
  const office = texts.find((m) => /Office/.test(m.html))
  const socialLabel = texts.find((m) => /^<p>Social<\/p>$|>Social</.test(m.html))
  const follow = mods.find((m) => m.type === 'social_media_follow')
  const copyright = texts.find((m) => /©/.test(m.html))
  const socialLinks = follow ? [...(follow.html || '').matchAll(/href="([^"]+)"/g)].map((m) => m[1]) : []
  return { icon, menus, office, socialLabel, socialLinks, copyright }
}

export default function Footer() {
  const { icon, menus, office, socialLabel, socialLinks, copyright } = useFooterParts()
  return (
    <footer className="relative overflow-hidden bg-forest pb-24 pt-16 text-cream md:pb-16" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">{site.logo.alt}</h2>
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-peach/20 blur-3xl" />
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.3fr_0.8fr]">
          <div className="lg:col-span-5">
            {icon?.src && (
              <SmartLink href="/" aria-label={site.logo.alt} className="inline-block">
                <img src={icon.src} alt={site.logo.alt} width={82} height={86} loading="lazy" decoding="async" className="h-14 w-auto brightness-0 invert" />
              </SmartLink>
            )}
          </div>
          {menus.map((m) => (
            <nav key={m.title} aria-label={m.title}>
              <p className="font-display text-lg text-peach">{m.title}</p>
              <ul className="mt-4 space-y-2.5">
                {m.items.map((it) => (
                  <li key={it.href + it.label}>
                    <SmartLink href={it.href} className="inline-flex items-center gap-2 text-[0.95rem] text-cream/85 transition-colors hover:text-peach">
                      {m.title === 'Review Us' && <Google className="h-4 w-4" />}
                      {it.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          {office && (
            <div>
              <Prose html={office.html} className="prose-light prose-sm footer-office" />
            </div>
          )}
          <div>
            {socialLabel && <p className="font-display text-lg text-peach">Social</p>}
            <ul className="mt-4 flex gap-2">
              {socialLinks.map((href) => {
                const key = Object.keys(SOCIAL_ICONS).find((k) => href.includes(k)) || 'instagram'
                const Icon = SOCIAL_ICONS[key]
                return (
                  <li key={href}>
                    <SmartLink href={href} aria-label={`Follow on ${key[0].toUpperCase() + key.slice(1)}`} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-cream/85 transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-white/10 hover:text-peach">
                      <Icon className="h-5 w-5" />
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        {copyright && (
          <div className="mt-14 border-t border-white/10 pt-6 text-sm text-cream/70">
            <Prose html={copyright.html} className="prose-light prose-sm footer-legal" />
          </div>
        )}
      </div>
      <style>{`
        .footer-office h1,.footer-office h2,.footer-office h3,.footer-office p:first-child{font-family:var(--font-display);font-size:1.125rem;color:var(--color-peach);margin-bottom:.5rem}
        .footer-office a{color:rgba(250,250,249,.85);text-decoration:none}
        .footer-office a:hover{color:var(--color-peach)}
        .footer-legal a{color:rgba(250,250,249,.85);text-decoration:none;margin:0 .15rem}
        .footer-legal a:hover{color:var(--color-peach)}
      `}</style>
    </footer>
  )
}
