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
                href={personalInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary-200 transition-colors duration-300"
                aria-label="Instagram"
              >
                <i className="uil uil-instagram text-xl"></i>
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