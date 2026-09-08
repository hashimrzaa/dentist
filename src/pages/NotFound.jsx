import { useEffect, useState } from 'react'
import { loadPage, flatModules } from '../lib/content.js'
import useSeo from '../hooks/useSeo.js'
import Container from '../components/ui/Container.jsx'
import Prose from '../components/ui/Prose.jsx'
import Button from '../components/ui/Button.jsx'
import HeartPulse from '../components/ui/HeartPulse.jsx'
import site from '../content/site.json'

/**
 * The live site's own 404 (its "areas we serve" link resolves to this page),
 * rendered with its exact text and icon.
 */
export default function NotFound() {
  const [mods, setMods] = useState([])
  useSeo('Page not found - My Dear Dentist', '')
  useEffect(() => {
    loadPage('areas-we-serve').then((p) => p && setMods(p.sections.flatMap(flatModules)))
  }, [])
  const text = mods.find((m) => m.type === 'text')
  const image = mods.find((m) => m.type === 'image')
  const book = site.header_links.find((l) => !l.href.startsWith('tel:'))
  return (
    <section className="warm-gradient relative isolate overflow-hidden py-24 lg:py-36">
      <HeartPulse className="-right-20 -top-20" size="24rem" />
      <Container className="relative text-center">
        {image?.src && <img src={image.src} alt="" width={82} height={86} className="mx-auto mb-6 h-16 w-auto" />}
        <Prose html={text?.html} className="prose-center mx-auto max-w-xl" />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="forest" label="Home" />
          {book && <Button href={book.href} label={book.label} />}
        </div>
      </Container>
    </section>
  )
}
