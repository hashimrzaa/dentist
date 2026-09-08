import { motion } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { riseIn, staggerParent } from '../../lib/motion.js'

/*
 * Scroll reveals. Under prefers-reduced-motion the elements render in their
 * final state immediately (no observer dependency at all); otherwise a soft
 * rise-in fires once ~10% of the element is on screen.
 */
const VIEWPORT = { once: true, amount: 0.1, margin: '0px 0px -4% 0px' }

export function Reveal({ as = 'div', className = '', children, delay = 0, y = 18, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  if (reduce) {
    const Plain = as
    return <Plain className={className} {...rest}>{children}</Plain>
  }
  const v = riseIn(false, y)
  if (delay) v.show.transition.delay = delay
  return (
    <Tag variants={v} initial="hidden" whileInView="show" viewport={VIEWPORT} className={className} {...rest}>
      {children}
    </Tag>
  )
}

export function RevealGroup({ as = 'div', className = '', children, stagger = 0.07, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  if (reduce) {
    const Plain = as
    return <Plain className={className} {...rest}>{children}</Plain>
  }
  return (
    <Tag variants={staggerParent(false, stagger)} initial="hidden" whileInView="show" viewport={VIEWPORT} className={className} {...rest}>
      {children}
    </Tag>
  )
}

export function RevealItem({ as = 'div', className = '', children, y = 18, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  if (reduce) {
    const Plain = as
    return <Plain className={className} {...rest}>{children}</Plain>
  }
  return (
    <Tag variants={riseIn(false, y)} className={className} {...rest}>
      {children}
    </Tag>
  )
}
