import { useEffect, useState } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion.js'

/**
 * Recreates the live site's typing headline ("Root-cause dentistry for better
 * sleep / health / comfort"). Words are the site's exact strings.
 */
export default function TypingHeadline({ before, words = [], after = '', level = 'h2', className = '' }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState(reduce ? words[0] || '' : '')
  const [phase, setPhase] = useState('type')
  const Tag = level

  useEffect(() => {
    if (reduce || !words.length) return undefined
    const word = words[i]
    let t
    if (phase === 'type') {
      if (txt.length < word.length) t = setTimeout(() => setTxt(word.slice(0, txt.length + 1)), 70)
      else t = setTimeout(() => setPhase('erase'), 1600)
    } else if (txt.length > 0) t = setTimeout(() => setTxt(word.slice(0, txt.length - 1)), 40)
    else {
      setI((i + 1) % words.length)
      setPhase('type')
    }
    return () => clearTimeout(t)
  }, [txt, phase, i, words, reduce])

  return (
    <Tag className={className} aria-label={`${before} ${words.join(' ')} ${after}`.trim()}>
      <span>{before} </span>
      <span className="accent-word whitespace-nowrap">
        {txt}
        {!reduce && <span aria-hidden="true" className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] bg-coral animate-blink" />}
      </span>
      {after && <span> {after}</span>}
    </Tag>
  )
}
