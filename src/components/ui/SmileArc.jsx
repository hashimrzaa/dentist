import { useRef } from 'react'
import useGsap from '../../hooks/useGsap.js'
import useReducedMotion from '../../hooks/useReducedMotion.js'

/**
 * A "smile" stroke that draws itself as the hero scrolls (GSAP scrub) —
 * the brand's Breathe. Heal. Smile. motif.
 */
export default function SmileArc({ className = '', triggerRef }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useGsap(
    ref,
    (gsap) => {
      const paths = gsap.utils.toArray('path[data-draw]')
      paths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: reduce ? 0 : len })
      })
      if (reduce) return
      gsap.to(paths, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 0.2 })
      gsap.to(ref.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: { trigger: triggerRef?.current || ref.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
    },
    [reduce],
  )

  return (
    <svg ref={ref} viewBox="0 0 400 220" className={className} aria-hidden="true" fill="none" strokeLinecap="round">
      <path data-draw d="M40 60c50 110 270 110 320 0" stroke="#f18f7e" strokeWidth="10" />
      <path data-draw d="M70 40c40 80 220 80 260 0" stroke="#f7b096" strokeWidth="6" strokeOpacity="0.7" />
      <path data-draw d="M110 22c30 55 150 55 180 0" stroke="#668bcc" strokeWidth="4" strokeOpacity="0.55" />
    </svg>
  )
}
