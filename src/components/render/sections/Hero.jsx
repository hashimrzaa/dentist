import { useRef } from 'react'
import { motion } from 'framer-motion'
import { flatModules, stripTags } from '../../../lib/content.js'
import useReducedMotion from '../../../hooks/useReducedMotion.js'
import useGsap from '../../../hooks/useGsap.js'
import { riseIn, staggerParent } from '../../../lib/motion.js'
import Container from '../../ui/Container.jsx'
import Prose from '../../ui/Prose.jsx'
import Button from '../../ui/Button.jsx'
import HeartPulse from '../../ui/HeartPulse.jsx'
import SmileArc from '../../ui/SmileArc.jsx'
import { Phone } from '../../ui/Icons.jsx'
import { Figure } from '../ModuleRenderer.jsx'

/**
 * Page hero. Content = the section's own modules (eyebrow, h1, lead, call
 * link, button). Home gets the live site's full-bleed office photo; inner
 * pages get an editorial photo card + the animated "smile" stroke.
 */
export default function Hero({ section, bg, art, isHome }) {
  const scope = useRef(null)
  const reduce = useReducedMotion()
  const mods = flatModules(section)
  const texts = mods.filter((m) => m.type === 'text')
  const h1 = texts.find((m) => /<h1[\s>]/.test(m.html))
  const eyebrow = texts.find((m) => m !== h1 && stripTags(m.html).length < 70 && texts.indexOf(m) < texts.indexOf(h1))
  const leads = texts.filter((m) => m !== h1 && m !== eyebrow)
  const call = mods.find((m) => m.type === 'icon_list')?.items?.[0]
  const buttons = mods.filter((m) => m.type === 'button')

  useGsap(
    scope,
    (gsap) => {
      if (reduce) return
      const img = scope.current.querySelector('[data-parallax]')
      if (!img) return
      gsap.to(img, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: 0.6 } })
    },
    [reduce, bg?.src],
  )

  const light = Boolean(bg)

  return (
    <section ref={scope} className={`relative isolate overflow-hidden ${light ? 'bg-forest text-cream' : 'warm-gradient'}`} aria-labelledby="page-title">
      {bg ? (
        <>
          <div className="absolute inset-0 -z-10">
            <img data-parallax src={bg.src} alt={bg.alt || ''} fetchPriority="high" decoding="async" className="h-[115%] w-full object-cover" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/85 via-forest/60 to-forest/20" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
        </>
      ) : (
        <>
          <HeartPulse className="-left-24 -top-24" size="30rem" />
          <HeartPulse className="right-[-8rem] top-[30%]" size="22rem" tone="sky" delay="-1.2s" />
        </>
      )}

      <Container className={`grid items-center gap-10 py-16 lg:py-24 ${art ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''} ${light ? 'min-h-[min(calc(100svh-84px),52rem)]' : ''}`}>
        <motion.div variants={staggerParent(reduce, 0.08)} initial="hidden" animate="show" className="relative max-w-2xl">
          {eyebrow && (
            <motion.div variants={riseIn(reduce)}>
              <Prose html={eyebrow.html} className={`hero-eyebrow ${light ? 'prose-light' : ''}`} />
            </motion.div>
          )}
          {h1 && (
            <motion.div variants={riseIn(reduce)} className="mt-3">
              <Prose html={h1.html} className={`hero-title ${light ? 'prose-light' : ''}`} />
            </motion.div>
          )}
          {leads.map((m, i) => (
            <motion.div key={i} variants={riseIn(reduce)} className="mt-5">
              <Prose html={m.html} className={`hero-lead max-w-xl ${light ? 'prose-light' : ''}`} />
            </motion.div>
          ))}
          <motion.div variants={riseIn(reduce)} className="mt-8 flex flex-wrap items-center gap-3">
            {buttons.map((b, i) => (
              <Button key={i} href={b.href} label={b.label} external={b.external} variant={i === 0 ? 'coral' : light ? 'light' : 'ghost'} />
            ))}
            {call && (
              <a href={call.href} className={`${light ? 'btn-ghost-light' : 'btn-ghost'}`}>
                <Phone className="h-4 w-4" /> {call.text}
              </a>
            )}
          </motion.div>
          {!light && <SmileArc className="mt-10 w-52 sm:w-64" triggerRef={scope} />}
        </motion.div>

        {art && (
          <motion.div initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="relative">
            <div aria-hidden="true" className="absolute -inset-4 -z-10 rotate-[-2deg] rounded-[2.5rem] bg-peach/40" />
            <Figure src={art.src} alt={art.alt} ratio="aspect-[5/4]" priority className="animate-float [animation-duration:9s]" />
          </motion.div>
        )}
      </Container>
      <style>{`
        .hero-eyebrow :is(h1,h2,h3,h4,h5,h6,p){font-family:var(--font-sans);font-size:.78rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;line-height:1.4;color:${light ? 'var(--color-peach)' : 'var(--color-coral-deep)'}}
        .hero-title h1{font-size:clamp(2.6rem,5.8vw,4.6rem);line-height:1.02;color:${light ? 'var(--color-cream)' : 'var(--color-forest)'}}
        .hero-lead :is(h2,h3,h4,h5,h6,p){font-family:var(--font-sans);font-size:1.15rem;font-weight:400;line-height:1.6;color:${light ? 'rgba(250,250,249,.88)' : 'var(--color-ink-soft)'}}
        ${isHome ? '.hero-title h1 br{display:none}' : ''}
      `}</style>
    </section>
  )
}
