import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAppStore from '../../stores/useAppStore'
import { navigationItems } from '../../data/portfolioData'
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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || !isHomePage
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    }`}>
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300"
          >
            Sadique
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
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              <i className={`uil text-xl ${
                mobileMenuOpen ? 'uil-times' : 'uil-apps'
              }`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen
            ? 'max-h-96 opacity-100 pb-6'
            : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Navigation mobile />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;