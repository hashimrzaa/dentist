import { useEffect } from 'react'

/** Sets document title + meta description from the page's own (verbatim) meta. */
export default function useSeo(title, description) {
  useEffect(() => {
    if (title) document.title = title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    if (description != null) meta.setAttribute('content', description)
  }, [title, description])
}
