import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { flatModules } from '../../../lib/content.js'
import useReducedMotion from '../../../hooks/useReducedMotion.js'
import { DUR, EASE } from '../../../lib/motion.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import Button from '../../ui/Button.jsx'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal.jsx'
import { Chevron } from '../../ui/Icons.jsx'

function Item({ item, id, open, onToggle, reduce }) {
  const hasBody = Boolean(item.html)
  return (
    <RevealItem as="li" className="card overflow-hidden">
      <h3>
        <button
          id={`faq-b-${id}`}
          type="button"
          aria-expanded={hasBody ? open : undefined}
          aria-controls={hasBody ? `faq-p-${id}` : undefined}
          onClick={hasBody ? onToggle : undefined}
          className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg text-forest ${hasBody ? '' : 'cursor-default'}`}
        >
          {item.title}
          {hasBody && (
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-[background-color,transform] duration-300 ${open ? 'rotate-180 bg-forest text-peach' : 'bg-peach-soft text-coral-deep'}`} aria-hidden="true">
              <Chevron />
            </span>
          )}
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {hasBody && open && (
          <motion.div id={`faq-p-${id}`} role="region" aria-labelledby={`faq-b-${id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : DUR.fast, ease: EASE.out }} className="overflow-hidden">
            <Prose html={item.html} className="prose-sm px-6 pb-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </RevealItem>
  )
}

/** FAQ / service accordions (dsm_faq modules), merged across columns. */
export default function Faq({ section, tone = 0 }) {
  const reduce = useReducedMotion()
  const mods = flatModules(section)
  const heading = mods.find((m) => m.type === 'text')
  const faqs = mods.filter((m) => m.type === 'faq')
  const button = mods.find((m) => m.type === 'button')
  const items = faqs.flatMap((f) => f.items)
  const [open, setOpen] = useState(0)
  const twoCol = faqs.length > 1
  return (
    <section className={`py-16 lg:py-24 ${tone % 2 ? 'bg-sand' : 'bg-cream'}`}>
      <Container className={twoCol ? '' : 'max-w-4xl'}>
        {heading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <Prose html={heading.html} className="prose-center" />
          </Reveal>
        )}
        <RevealGroup as="ul" stagger={0.05} className={`mt-10 gap-3 ${twoCol ? 'grid md:grid-cols-2' : 'space-y-3'}`}>
          {items.map((it, i) => (
            <Item key={i} id={`${section.id}-${i}`} item={it} open={open === i} onToggle={() => setOpen((v) => (v === i ? null : i))} reduce={reduce} />
          ))}
        </RevealGroup>
        {button && (
          <div className="mt-10 text-center">
            <Button href={button.href} label={button.label} external={button.external} />
          </div>
        )}
      </Container>
    </section>
  )
}
