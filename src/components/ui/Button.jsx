import SmartLink from './SmartLink.jsx'
import { ArrowRight } from './Icons.jsx'

const VARIANTS = {
  coral: 'btn-coral',
  forest: 'btn-forest',
  ghost: 'btn-ghost',
  light: 'btn-ghost-light',
}

/** Link styled as a button. Coral is the primary "Book Online" action. */
export default function Button({ href, label, children, variant = 'coral', arrow = false, className = '', external, ...rest }) {
  return (
    <SmartLink href={href} external={external} className={`${VARIANTS[variant] || VARIANTS.coral} ${className}`} {...rest}>
      {children || label}
      {arrow && <ArrowRight />}
    </SmartLink>
  )
}
