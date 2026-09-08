import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Scoped GSAP effect; everything created inside is reverted on unmount. */
export default function useGsap(scopeRef, setup, deps = []) {
  useLayoutEffect(() => {
    if (!scopeRef.current) return undefined
    const ctx = gsap.context(() => setup(gsap, ScrollTrigger), scopeRef)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { gsap, ScrollTrigger }
