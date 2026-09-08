/* Minimal inline icon set — 1.6px strokes, currentColor. */
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' }

export const ArrowRight = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const Chevron = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="m6 9 6 6 6-6" /></svg>
)
export const Pin = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" /><circle cx="12" cy="9" r="2.5" /></svg>
)
export const Phone = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
)
export const Mail = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>
)
export const Clock = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)
export const Calendar = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
)
export const Check = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.2}><path d="m5 12 5 5L20 7" /></svg>
)
export const Close = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const Menu = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const Heart = ({ className = 'h-5 w-5', filled = false }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 21s-7.5-4.6-9.6-9.1C.7 8.1 3 4.5 6.6 4.5c2 0 3.4 1 4.4 2.4 1-1.4 2.4-2.4 4.4-2.4 3.6 0 5.9 3.6 4.2 7.4C19.5 16.4 12 21 12 21z" />
  </svg>
)
export const Tooth = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M7.5 3C5 3 3.5 5 3.5 7.5c0 2 .8 3 1.3 4.6.6 2.3.7 8.9 2.7 8.9 1.7 0 1.7-5 4.5-5s2.8 5 4.5 5c2 0 2.1-6.6 2.7-8.9.5-1.6 1.3-2.6 1.3-4.6C20.5 5 19 3 16.5 3c-1.8 0-3 1.2-4.5 1.2S9.3 3 7.5 3Z" />
  </svg>
)
export const Moon = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" /></svg>
)
export const Sparkle = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8" /></svg>
)
export const Leaf = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16Z" /><path d="M4 20c4-4 8-8 12-12" /></svg>
)
export const Play = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z" /></svg>
)
export const Facebook = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.5V14h2.7v8h3.3Z" /></svg>
)
export const Instagram = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg>
)
export const TikTok = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor"><path d="M14 3c.4 2.4 1.9 4 4.2 4.2v3c-1.6 0-3-.5-4.2-1.3v6.4A5.6 5.6 0 1 1 8.4 9.7c.4 0 .8 0 1.2.1v3.1a2.6 2.6 0 1 0 1.7 2.4V3H14Z" /></svg>
)
export const Google = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor"><path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4Z" opacity=".9" /><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" opacity=".7" /><path d="M6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9L6.4 14Z" opacity=".5" /><path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.5L6.4 10C7.2 7.8 9.4 6 12 6Z" opacity=".8" /></svg>
)
