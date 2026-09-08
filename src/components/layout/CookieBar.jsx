import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import site from '../../content/site.json'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { DUR, EASE } from '../../lib/motion.js'
import SmartLink from '../ui/SmartLink.jsx'

/** Cookie notice — copy and link verbatim from the live site. */
export default function CookieBar() {
  const extra = site.extras?.[0]
  const [show, setShow] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    try {
      if (!localStorage.getItem('mdd-cookies-ok')) setShow(true)
    } catch {
      setShow(true)
    }
  }, [])

  if (!extra) return null
  const [sentence, linkLabel, period, accept] = extra.text
  const link = extra.links?.[0]

  const close = () => {
    try { localStorage.setItem('mdd-cookies-ok', '1') } catch { /* ignore */ }
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="region"
          aria-label="Cookie notice"
          className="fixed inset-x-3 bottom-[5.5rem] z-40 md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 24 }}
          transition={{ duration: reduce ? 0 : DUR.base, ease: EASE.out }}
        >
          <div className="card flex flex-col gap-3 p-4 text-sm text-ink-soft sm:flex-row sm:items-center">
            <p>
              {sentence}{' '}
              {link && <SmartLink href={link.href} className="font-medium text-coral-deep underline underline-offset-4">{linkLabel}</SmartLink>}
              {period}
            </p>
            <button type="button" onClick={close} className="btn-forest shrink-0 px-4 py-2 text-xs">
              {accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
