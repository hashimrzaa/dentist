/**
 * Shared motion vocabulary. Interaction/entrance animations stay ≤ 600ms;
 * only ambient loops (heartbeat, float, marquee) run longer.
 */
export const DUR = { micro: 0.2, fast: 0.3, base: 0.45, max: 0.6 }
export const EASE = { out: [0.22, 1, 0.36, 1], heart: [0.37, 0, 0.63, 1] }

export const riseIn = (reduce = false, y = 18) => ({
  hidden: { opacity: 0, y: reduce ? 0 : y },
  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : DUR.max, ease: EASE.out } },
})

export const staggerParent = (reduce = false, stagger = 0.07) => ({
  hidden: {},
  show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : 0.05 } },
})

export const viewportOnce = { once: true, amount: 0.2 }
