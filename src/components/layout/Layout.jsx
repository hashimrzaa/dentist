import { Outlet } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CookieBar from './CookieBar.jsx'
import MobileBar from './MobileBar.jsx'

export default function Layout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-cream"
      >
        Skip to main content
      </a>
      <TopBar />
      <Header />
      <main id="main" tabIndex={-1} className="pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBar />
      <CookieBar />
    </>
  )
}
