import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import useAppStore from '../../stores/useAppStore'
import { navigationItems } from '../../data/portfolioData'
import { smoothScrollTo } from '../../utils/helpers'

function Navigation({ mobile = false }) {
  const { activeSection, setActiveSection, closeMobileMenu } = useAppStore()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const handleNavClick = (item) => {
    if (mobile) {
      closeMobileMenu()
    }

    if (isHomePage && item.href.startsWith('#')) {
      // Smooth scroll to section on home page
      const sectionId = item.href.substring(1)
      smoothScrollTo(sectionId, 80)
      setActiveSection(sectionId)
    }
  }

  const isActive = (item) => {
    if (isHomePage && item.href.startsWith('#')) {
      return activeSection === item.id
    }
    return location.pathname === item.href
  }

  const navItemClass = `
    group flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
    ${
      mobile
        ? 'w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800'
        : 'hover:bg-white/10'
    }
  `

  const activeClass = 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
  const inactiveClass = 'text-gray-700 dark:text-gray-300 hover:text-primary-500'

  return (
    <ul className={`
      ${mobile ? 'flex flex-col space-y-2' : 'flex items-center space-x-1'}
    `}>
      {navigationItems.map((item) => {
        const linkContent = (
          <>
            <i className={`${item.icon} text-lg`}></i>
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
              to={item.href}
              onClick={() => handleNavClick(item)}
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