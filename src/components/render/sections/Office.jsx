import { useEffect, useRef, useState } from 'react'
import { flatModules, stripTags } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import { Reveal } from '../../ui/Reveal.jsx'
import { Clock, Mail, Phone, Pin } from '../../ui/Icons.jsx'

/**
 * "Our Office" block: intro, address, phone, email, hours (verbatim) beside a
 * lazy Google Maps embed (the live site's code module is a map embed).
 */
export default function Office({ section }) {
  const texts = flatModules(section).filter((m) => m.type === 'text')
  const intro = texts.find((m) => /Our Office/.test(m.html))
  const address = texts.find((m) => /Houston, TX/.test(m.html) && m !== intro)
  const phone = texts.find((m) => /tel:/.test(m.html))
  const email = texts.find((m) => /mailto:/.test(m.html))
  const hours = texts.find((m) => /hours of operation/i.test(m.html))
  const q = encodeURIComponent(stripTags(address?.html || 'My Dear Dentist Houston'))
  const ref = useRef(null)
  const [showMap, setShowMap] = useState(false)
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return setShowMap(true)
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShowMap(true), io.disconnect()), { rootMargin: '300px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section className="bg-cream py-16 lg:py-24" aria-labelledby={`office-${section.id}`}>
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
        <Reveal className="card p-7 sm:p-9">
          <Prose html={intro?.html} className="office-intro" />
          <ul className="mt-6 space-y-4">
            {address && <Row icon={Pin}><Prose html={address.html} className="office-line" /></Row>}
            {phone && <Row icon={Phone}><Prose html={phone.html} className="office-line" /></Row>}
            {email && <Row icon={Mail}><Prose html={email.html} className="office-line" /></Row>}
            {hours && <Row icon={Clock}><Prose html={hours.html} className="office-hours" /></Row>}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-forest/10 bg-forest-mist" ref={ref}>
          {showMap ? (
            <iframe title="Map to My Dear Dentist" src={`https://www.google.com/maps?q=${q}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 grayscale-[0.3] contrast-[1.05]" allowFullScreen />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-sm text-forest/60">Map</div>
          )}
        </Reveal>
      </Container>
      <style>{`.office-intro h2,.office-intro h3,.office-intro p:first-child strong{font-family:var(--font-display);font-size:1.7rem;color:var(--color-forest);display:block;margin-bottom:.4rem;font-weight:400}.office-line p{margin:0}.office-line a{text-decoration:none;color:var(--color-ink);font-weight:500}.office-line a:hover{color:var(--color-coral-deep)}.office-hours p{margin:0;font-size:.95rem}.office-hours p:first-child{font-weight:600;color:var(--color-forest);margin-bottom:.25rem}`}</style>
    </section>
  )
}

function Row({ icon: Icon, children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-peach-soft text-coral-deep" aria-hidden="true">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </li>
  )
}
