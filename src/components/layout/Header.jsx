import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import site from '../../content/site.json'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { DUR, EASE } from '../../lib/motion.js'
import SmartLink from '../ui/SmartLink.jsx'
import { Chevron, Close, Menu, Phone } from '../ui/Icons.jsx'

const { logo, header_links: headerLinks } = site
const phone = headerLinks.find((l) => l.href.startsWith('tel:'))
const book = headerLinks.find((l) => !l.href.startsWith('tel:'))
// The live menu repeats the phone + Book Online as menu items; they render as dedicated CTAs instead.
const nav = site.nav.filter((i) => !i.href.startsWith('tel:') && !/flexbook/.test(i.href))

function Dropdown({ item }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const half = Math.ceil(item.children.length / 2)
  const cols = [item.children.slice(0, half), item.children.slice(half)]

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="flex items-center">
        <NavLink to={item.href} className={({ isActive }) => `whitespace-nowrap rounded-full py-2 pl-3 pr-1 text-[0.9rem] font-semibold text-cream/90 transition-colors hover:text-peach ${isActive ? 'text-peach' : ''}`}>
          {item.label}
        </NavLink>
        <button type="button" aria-expanded={open} aria-haspopup="true" aria-label={`${item.label} menu`} onClick={() => setOpen((v) => !v)} className="grid h-8 w-7 place-items-center rounded-full text-cream/70 hover:text-peach">
          <Chevron className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 6 }}
            transition={{ duration: reduce ? 0 : DUR.fast, ease: EASE.out }}
            className="absolute left-0 top-full z-40 mt-2 w-[34rem] rounded-3xl border border-forest/10 bg-white/95 p-4 shadow-[0_30px_80px_-30px_rgba(2,47,46,0.4)] backdrop-blur"
          >
            <div className="grid grid-cols-2 gap-2">
              {cols.map((c, i) => (
                <ul key={i} className="space-y-0.5">
                  {c.map((ch) => (
                    <li key={ch.href}>
                      <NavLink to={ch.href} className={({ isActive }) => `block rounded-xl px-3 py-2 text-[0.92rem] transition-colors hover:bg-peach-soft hover:text-forest ${isActive ? 'bg-peach-soft text-forest' : 'text-ink'}`}>
                        {ch.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const reduce = useReducedMotion()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setMenuOpen(false), [location.pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <header className={`sticky top-0 z-50 bg-forest text-cream transition-[box-shadow] duration-300 ${scrolled ? 'shadow-[0_10px_40px_-25px_rgba(2,47,46,0.8)]' : ''}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-4 lg:h-[84px]">
        <SmartLink href={logo.href} className="shrink-0" aria-label={logo.alt}>
          {/* Logo pulled directly from the live site (white artwork, hence the dark band) */}
          <img src={logo.src} alt={logo.alt} width={640} height={200} className="h-11 w-auto lg:h-13" decoding="async" fetchPriority="high" />
        </SmartLink>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <Dropdown key={item.href} item={item} />
            ) : (
              <NavLink key={item.href} to={item.href} className={({ isActive }) => `whitespace-nowrap rounded-full px-3 py-2 text-[0.9rem] font-semibold text-cream/90 transition-colors hover:text-peach ${isActive ? 'text-peach' : ''}`}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          {phone && (
            <a href={phone.href} className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[0.9rem] font-semibold text-cream/90 hover:text-peach md:inline-flex">
              <Phone className="h-4 w-4" /> {phone.label}
            </a>
          )}
          {book && (
            <SmartLink href={book.href} className="btn-coral hidden whitespace-nowrap px-5 py-2.5 text-sm sm:inline-flex">
              {book.label}
            </SmartLink>
          )}
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-cream lg:hidden" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(true)}>
            <Menu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-forest text-cream"
            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : 24 }}
            transition={{ duration: reduce ? 0 : DUR.fast, ease: EASE.out }}
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <img src={logo.src} alt={logo.alt} width={640} height={200} className="h-10 w-auto" />
              <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <Close />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-32">
              {nav.map((item) => (
                <div key={item.href} className="border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <NavLink to={item.href} className="block py-4 font-display text-xl">
                      {item.label}
                    </NavLink>
                    {item.children && (
                      <button type="button" aria-expanded={servicesOpen} aria-controls="m-services" aria-label={`${item.label} submenu`} onClick={() => setServicesOpen((v) => !v)} className="grid h-11 w-11 place-items-center">
                        <Chevron className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {item.children && (
                    <ul id="m-services" hidden={!servicesOpen} className="grid grid-cols-1 gap-1 pb-4 sm:grid-cols-2">
                      {item.children.map((ch) => (
                        <li key={ch.href}>
                          <NavLink to={ch.href} className="block rounded-xl px-3 py-2 text-[0.95rem] text-cream/85 hover:bg-white/10">
                            {ch.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              {phone && (
                <a href={phone.href} className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-peach">
                  <Phone /> {phone.label}
                </a>
              )}
            </nav>
            {book && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest via-forest to-transparent p-5">
                <SmartLink href={book.href} className="btn-coral w-full">{book.label}</SmartLink>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
