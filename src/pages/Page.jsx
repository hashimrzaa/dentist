import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { findPage, loadPage } from '../lib/content.js'
import useSeo from '../hooks/useSeo.js'
import PageRenderer from '../components/render/PageRenderer.jsx'
import NotFound from './NotFound.jsx'

/**
 * Resolves the current URL against the live site's page index and renders
 * that page's (verbatim) content through the redesign renderer.
 */
export default function Page() {
  const { pathname } = useLocation()
  const entry = findPage(pathname)
  const [page, setPage] = useState(null)
  const [status, setStatus] = useState('loading')

  useSeo(entry?.title, entry?.description)

  useEffect(() => {
    let alive = true
    if (!entry) {
      setStatus('missing')
      return undefined
    }
    setStatus('loading')
    loadPage(entry.slug).then((p) => {
      if (!alive) return
      setPage(p)
      setStatus(p ? 'ready' : 'missing')
    })
    return () => {
      alive = false
    }
  }, [entry?.slug]) // eslint-disable-line react-hooks/exhaustive-deps

  if (status === 'missing') return <NotFound />
  if (status !== 'ready' || !page) {
    return (
      <div aria-busy="true" className="container-x py-24">
        <div className="h-8 w-48 animate-pulse rounded-full bg-sand" />
        <div className="mt-6 h-16 w-3/4 animate-pulse rounded-2xl bg-sand" />
        <div className="mt-4 h-5 w-1/2 animate-pulse rounded-full bg-sand" />
      </div>
    )
  }
  return <PageRenderer key={page.slug} page={page} />
}
