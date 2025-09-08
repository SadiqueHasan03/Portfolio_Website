import { Link } from 'react-router-dom'
import { personalInfo } from '../../data/portfolioData'

function Footer() {
  const currentYear = new Date().getFullYear()

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
                <Link
                  to="/#about"
                  className="text-primary-100 hover:text-white transition-colors duration-300"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-primary-100 hover:text-white transition-colors duration-300"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-primary-100 hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/resume"
                  className="text-primary-100 hover:text-white transition-colors duration-300"
                >
                  Resume
                </Link>
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