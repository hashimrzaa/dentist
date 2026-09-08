import { Link } from 'react-router-dom'

/**
 * Internal paths ("/about/") route client-side; everything else is a plain
 * anchor. External http(s) links open in a new tab.
 */
export default function SmartLink({ href = '#', children, className = '', external, ...rest }) {
  const isInternal = href.startsWith('/') && !href.startsWith('//')
  if (isInternal) {
    return (
      <Link to={href} className={className} {...rest}>
        {children}
      </Link>
    )
  }
  const isHttp = /^https?:/i.test(href)
  return (
    <a
      href={href}
      className={className}
      target={external || isHttp ? '_blank' : undefined}
      rel={external || isHttp ? 'noopener' : undefined}
      {...rest}
    >
      {children}
    </a>
  )
}
