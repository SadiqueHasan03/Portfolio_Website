import PropTypes from 'prop-types'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAppStore from '../../stores/useAppStore'
import { navigationItems } from '../../data/portfolioData'
import { navigateToSection } from '../../utils/navigation'

function Navigation({ mobile = false }) {
  const { activeSection, setActiveSection, closeMobileMenu } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

  const handleNavClick = async (item, event) => {
    if (mobile) {
      closeMobileMenu()
    }

    if (item.href.startsWith('#')) {
      if (!isHomePage) {
        event?.preventDefault()
      }

      const sectionId = item.href.substring(1)
      
      try {
        const targetUrl = isHomePage ? item.href : `/${item.href}`
        const success = await navigateToSection(targetUrl, navigate, {
          offset: 80,
          delay: 100,
          fallbackToTop: sectionId === 'home'
        })
        
        if (success) {
          setActiveSection(sectionId)
        } else {
          console.warn(`Navigation target "${sectionId}" not found on page`)
          // Fallback for home section
          if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setActiveSection('home')
          }
        }
      } catch (error) {
        console.error('Navigation error:', error)
      }
    }
  }

  const isActive = (item) => {
    if (isHomePage && item.href.startsWith('#')) {
      return activeSection === item.id
    }
    return location.pathname === item.href
  }

  const navItemClass = `
    group flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 lg:px-3
    ${
      mobile
        ? 'w-full justify-start hover:bg-white dark:hover:bg-gray-800'
        : 'hover:bg-white/10'
    }
  `

  const activeClass = 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20'
  const inactiveClass = 'text-gray-700 dark:text-gray-300 hover:text-primary-500'

  return (
    <ul className={`
      ${mobile ? 'grid grid-cols-2 gap-2' : 'flex items-center space-x-1'}
    `}>
      {navigationItems.map((item) => {
        const linkContent = (
          <>
            <i className={`${item.icon} text-lg ${mobile ? 'text-primary-500' : ''}`} aria-hidden="true"></i>
            <span>{item.label}</span>
          </>
        )

        const className = `
          ${navItemClass}
          ${isActive(item) ? activeClass : inactiveClass}
        `

        if (isHomePage && item.href.startsWith('#')) {
          return (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item)}
                className={className}
              >
                {linkContent}
              </button>
            </li>
          )
        }

        return (
          <li key={item.id}>
            <Link
              to={item.href.startsWith('#') ? `/${item.href}` : item.href}
              onClick={(event) => handleNavClick(item, event)}
              className={className}
            >
              {linkContent}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

Navigation.propTypes = {
  mobile: PropTypes.bool
}

export default Navigation;