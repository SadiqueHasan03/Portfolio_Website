import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAppStore from '../../stores/useAppStore'
import Navigation from './Navigation'
import ThemeToggle from '../ui/ThemeToggle'
import { debounce } from '../../utils/helpers'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { mobileMenuOpen, toggleMobileMenu } = useAppStore()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrolled(window.scrollY > 50)
    }, 10)

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
      scrolled || !isHomePage
        ? 'border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-xl dark:border-gray-700/70 dark:bg-gray-950/85'
        : 'border-transparent bg-transparent'
    }`}>
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold tracking-tight text-gray-950 transition-transform duration-300 hover:scale-[1.03] dark:text-white md:text-2xl"
          >
            Sadique<span className="text-emerald-500">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 text-gray-700 transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <i className={`uil text-xl ${
                mobileMenuOpen ? 'uil-times' : 'uil-apps'
              }`} aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          inert={!mobileMenuOpen}
          aria-hidden={!mobileMenuOpen}
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          mobileMenuOpen
            ? 'max-h-80 opacity-100 pb-4'
            : 'max-h-0 opacity-0'
        }`}>
          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/90 p-3 shadow-sm dark:border-gray-700/80 dark:bg-gray-900/90">
            <Navigation mobile />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;