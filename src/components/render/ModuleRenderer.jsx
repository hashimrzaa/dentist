import Prose from '../ui/Prose.jsx'
import Button from '../ui/Button.jsx'
import SmartLink from '../ui/SmartLink.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Check, Heart, Leaf, Moon, Phone, Sparkle, Tooth } from '../ui/Icons.jsx'
import { colSpan } from '../../lib/content.js'

const ICON_CYCLE = [Heart, Tooth, Moon, Sparkle, Leaf]

export function IconBadge({ index = 0, tone = 'peach', className = '' }) {
  const Icon = ICON_CYCLE[index % ICON_CYCLE.length]
  const tones = {
    peach: 'bg-peach-soft text-coral-deep',
    forest: 'bg-forest text-peach',
    sky: 'bg-sky-light text-sky',
  }
  return (
    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tones[tone]} ${className}`} aria-hidden="true">
      <Icon className="h-6 w-6" />
    </span>
  )
}

export function Figure({ src, alt = '', href, className = '', ratio = 'aspect-[4/3]', priority = false, sizes = '(min-width:1024px) 50vw, 100vw' }) {
  if (!src) return null
  const img = (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
      className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
    />
  )
  const inner = (
    <figure className={`group relative overflow-hidden rounded-[1.75rem] bg-sand ${ratio} ${className}`}>
      {img}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-forest/10" />
    </figure>
  )
  return href ? <SmartLink href={href} className="block">{inner}</SmartLink> : inner
}

export function Checklist({ items, className = '' }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-ink-soft">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-peach-soft text-coral-deep" aria-hidden="true">
            <Check className="h-3 w-3" />
          </span>
          {it.href ? (
            <SmartLink href={it.href} className="font-medium text-forest underline-offset-4 hover:underline">{it.text}</SmartLink>
          ) : (
            <span>{it.text}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function BlurbCard({ m, index = 0 }) {
  return (
    <div className="card h-full p-6 sm:p-7">
      {m.image ? (
        <img src={m.image} alt={m.alt || ''} width={96} height={96} loading="lazy" decoding="async" className="mb-5 h-16 w-16 object-contain" />
      ) : (
        <IconBadge index={index} className="mb-5" />
      )}
      {m.title && (
        <h3 className="text-xl text-forest">
          {m.href ? <SmartLink href={m.href} className="hover:text-coral-deep">{m.title}</SmartLink> : m.title}
        </h3>
      )}
      <Prose html={m.html} className="prose-sm mt-3" />
    </div>
  )
}

/** Generic module → component mapping used by the default section recipes. */
export default function ModuleRenderer({ m, index = 0, ctx = {} }) {
  switch (m.type) {
    case 'text':
      return <Prose html={m.html} className={ctx.light ? 'prose-light' : ''} />
    case 'typing_effect': {
      // handled specially in the split recipe; fallback renders the full heading
      return <Prose html={m.html || `<h2>${m.text}</h2>`} />
    }
    case 'image':
      return <Figure src={m.src} alt={m.alt} href={m.href} ratio={ctx.imageRatio || 'aspect-[4/3]'} />
    case 'button':
      return <Button href={m.href} label={m.label} external={m.external} variant={ctx.buttonVariant || (index > 0 ? 'ghost' : 'coral')} />
    case 'icon_list': {
      const items = m.items || []
      if (items.length === 1 && items[0].href?.startsWith('tel:')) {
        return (
          <a href={items[0].href} className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/70 px-4 py-2 text-sm font-semibold text-forest hover:border-coral">
            <Phone className="h-4 w-4 text-coral-deep" /> {items[0].text}
          </a>
        )
      }
      return <Checklist items={items} />
    }
    case 'blurb':
      return <BlurbCard m={m} index={index} />
    case 'heading':
      return <span className="chip">{m.text}</span>
    case 'icon':
      return null
    case 'card':
      return <BlurbCard m={m} index={index} />
    case 'row':
      return (
        <div className="grid gap-6" style={{ gridTemplateColumns: m.columns.map((c) => `${colSpan(c.width)}fr`).join(' ') }}>
          {m.columns.map((c, ci) => (
            <div key={ci} className="space-y-5">
              {c.modules.map((x, xi) => <ModuleRenderer key={xi} m={x} index={xi} ctx={ctx} />)}
            </div>
          ))}
        </div>
      )
    case 'masonry_gallery':
      return (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {m.images.filter((i) => i.src).map((i) => (
            <li key={i.src} className="grid h-20 place-items-center rounded-2xl border border-forest/10 bg-white p-4">
              <img src={i.src} alt={i.alt || i.title || ''} loading="lazy" decoding="async" className="max-h-10 w-auto object-contain" />
            </li>
          ))}
        </ul>
      )
    case 'code':
      if (m.kind === 'hero-image' && m.images?.[0]) return <Figure src={m.images[0].src} alt={m.images[0].alt} />
      return null
    default:
      return m.html ? <Prose html={m.html} /> : null
  }
}

export function ModuleList({ modules, ctx = {}, className = '' }) {
  return (
    <div className={`space-y-5 ${className}`}>
      {modules.map((m, i) => (
        <Reveal key={i} delay={Math.min(i * 0.05, 0.25)}>
          <ModuleRenderer m={m} index={i} ctx={ctx} />
        </Reveal>
      ))}
    </div>
  )
}
