/**
 * Ambient brand ornament: a soft peach heart that beats slowly. Pure CSS
 * (GPU transform only), disabled under prefers-reduced-motion.
 */
export default function HeartPulse({ className = '', size = '18rem', tone = 'peach', delay = '0s' }) {
  const color = { peach: 'text-peach', coral: 'text-coral', sky: 'text-sky', forest: 'text-forest', cream: 'text-cream' }[tone]
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${color} ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 animate-glow rounded-full bg-current opacity-30 blur-3xl" style={{ animationDelay: delay }} />
      <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full animate-heartbeat opacity-40" style={{ animationDelay: delay }} fill="currentColor">
        <path d="M12 21s-7.5-4.6-9.6-9.1C.7 8.1 3 4.5 6.6 4.5c2 0 3.4 1 4.4 2.4 1-1.4 2.4-2.4 4.4-2.4 3.6 0 5.9 3.6 4.2 7.4C19.5 16.4 12 21 12 21z" />
      </svg>
    </div>
  )
}
