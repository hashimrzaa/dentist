import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Renders verbatim HTML from the content JSON with the `.prose` styles.
 * Internal links inside the HTML are intercepted and routed client-side.
 */
export default function Prose({ html, className = '', as: Tag = 'div', ...rest }) {
  const navigate = useNavigate()
  const onClick = useCallback(
    (e) => {
      const a = e.target.closest?.('a[href]')
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (href.startsWith('/') && !href.startsWith('//') && !e.metaKey && !e.ctrlKey && a.target !== '_blank') {
        e.preventDefault()
        navigate(href)
      }
    },
    [navigate],
  )
  if (!html) return null
  return <Tag className={`prose ${className}`} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} {...rest} />
}
