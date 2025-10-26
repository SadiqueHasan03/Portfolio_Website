import { Link, useLocation, useNavigate } from 'react-router-dom'
import { personalInfo } from '../../data/portfolioData'
import { navigateToSection } from '../../utils/navigation'
import useAppStore from '../../stores/useAppStore'

function Footer() {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  const navigate = useNavigate()
  const { setActiveSection } = useAppStore()
  const isHomePage = location.pathname === '/'

  const handleQuickLinkClick = async (e, targetUrl) => {
    e.preventDefault()
    
    try {
      const success = await navigateToSection(targetUrl, navigate, {
        offset: 80,
        delay: 150,
        fallbackToTop: true
      })
      
      if (success) {
        // Extract section ID for state management
        const sectionId = targetUrl.includes('#') ? targetUrl.split('#')[1] : null
        if (sectionId) {
          setActiveSection(sectionId)
        }
      }
    } catch (error) {
      console.error('Footer navigation error:', error)
      // Fallback to regular navigation
      navigate(targetUrl)
    }
  }

  return (
    <footer className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-primary-100 mb-4">
              {personalInfo.title}
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary-200 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <i className="uil uil-linkedin-alt text-xl"></i>
              </a>
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary-200 transition-colors duration-300"
                aria-label="GitHub"
              >
                <i className="uil uil-github-alt text-xl"></i>
              </a>
              <a
              href={personalInfo.socialLinks.LeetCode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary-200 transition-colors duration-300"
              aria-label="LeetCode"
              >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22,14.355c0-0.742-0.564-1.346-1.26-1.346H10.676c-0.696,0-1.26,0.604-1.26,1.346s0.563,1.346,1.26,1.346H20.74C21.436,15.702,22,15.098,22,14.355z"></path>
                  <path d="M3.482,18.187l4.313,4.361C8.768,23.527,10.113,24,11.598,24c1.485,0,2.83-0.512,3.805-1.494l2.588-2.637c0.51-0.514,0.492-1.365-0.039-1.9c-0.531-0.535-1.375-0.553-1.884-0.039l-2.676,2.607c-0.462,0.467-1.102,0.662-1.809,0.662s-1.346-0.195-1.81-0.662l-4.298-4.363c-0.463-0.467-0.696-1.15-0.696-1.863c0-0.713,0.233-1.357,0.696-1.824l4.285-4.38c0.463-0.467,1.116-0.645,1.822-0.645s1.346,0.195,1.809,0.662l2.676,2.606c0.51,0.515,1.354,0.497,1.885-0.038c0.531-0.536,0.549-1.387,0.039-1.901l-2.588-2.636c-0.649-0.646-1.471-1.116-2.392-1.33l-0.034-0.007l2.447-2.503c0.512-0.514,0.494-1.366-0.037-1.901c-0.531-0.535-1.376-0.552-1.887-0.038L3.482,10.476C2.509,11.458,2,12.813,2,14.311C2,15.809,2.509,17.207,3.482,18.187z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#about"
                  onClick={(e) => handleQuickLinkClick(e, '/#about')}
                  className="text-primary-100 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="/#skills"
                  onClick={(e) => handleQuickLinkClick(e, '/#skills')}
                  className="text-primary-100 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="/#qualifications"
                  onClick={(e) => handleQuickLinkClick(e, '/#qualifications')}
                  className="text-primary-100 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Qualifications
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  onClick={(e) => handleQuickLinkClick(e, '/projects')}
                  className="text-primary-100 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  onClick={(e) => handleQuickLinkClick(e, '/#contact')}
                  className="text-primary-100 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/resume"
                  onClick={(e) => handleQuickLinkClick(e, '/resume')}
                  className="text-primary-100 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2">
              <p className="text-primary-100">
                <i className="uil uil-envelope mr-2"></i>
                {personalInfo.email}
              </p>
              <p className="text-primary-100">
                <i className="uil uil-map-marker mr-2"></i>
                {personalInfo.location}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-500 pt-8 text-center">
          <p className="text-primary-100">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;