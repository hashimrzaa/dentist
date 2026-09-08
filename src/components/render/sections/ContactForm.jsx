import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { flatModules } from '../../../lib/content.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import { Reveal } from '../../ui/Reveal.jsx'
import { Figure } from '../ModuleRenderer.jsx'

/**
 * Contact form with the live site's field labels. Prototype: no backend —
 * submitting routes to the site's own /thank-you/ page.
 * TODO: wire to the practice's form handler / CRM.
 */
export default function ContactForm({ section }) {
  const mods = flatModules(section)
  const texts = mods.filter((m) => m.type === 'text')
  const image = mods.find((m) => m.type === 'image')
  const form = mods.find((m) => m.type === 'code' && m.kind === 'form')
  const navigate = useNavigate()
  const [sending, setSending] = useState(false)
  const fields = (form?.fields || []).filter((f) => f.label !== 'Company')

  const onSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => navigate('/thank-you/'), 500)
  }

  return (
    <section className="bg-sand py-16 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <Reveal className="space-y-6">
          {texts.map((t, i) => <Prose key={i} html={t.html} />)}
          {image && <Figure src={image.src} alt={image.alt} ratio="aspect-[4/3]" />}
        </Reveal>
        <Reveal delay={0.1} className="card p-7 sm:p-9">
          <form onSubmit={onSubmit} className="grid gap-4">
            {fields.map((f) => {
              const id = `f-${f.label.toLowerCase()}`
              const isMsg = /message/i.test(f.label)
              const type = /email/i.test(f.label) ? 'email' : /phone/i.test(f.label) ? 'tel' : 'text'
              return (
                <div key={f.label} className={isMsg ? 'sm:col-span-2' : ''}>
                  <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-forest">
                    {f.label}
                    {f.required && <span className="text-coral-deep"> *</span>}
                  </label>
                  {isMsg ? (
                    <textarea id={id} name={f.label} required={f.required} rows={5} className="w-full rounded-2xl border border-forest/15 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-coral" />
                  ) : (
                    <input id={id} name={f.label} type={type} required={f.required} autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'name'} className="w-full rounded-full border border-forest/15 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-coral" />
                  )}
                </div>
              )
            })}
            <button type="submit" disabled={sending} className="btn-coral mt-2 disabled:opacity-60">
              {form?.submit || 'Submit'}
            </button>
          </form>
        </Reveal>
      </Container>
    </section>
  )
}
