import { useState } from 'react'
import { personalInfo } from '../../data/portfolioData'
import Button from '../ui/Button'
import ImageWithFallback from '../ui/ImageWithFallback'
import AnimatedSection from '../ui/AnimatedSection'

const CV_PATH = '/assets/documents/Sadique_Hasan_CV.pdf'

const highlights = [
  { value: '200+', label: 'DSA problems', icon: 'uil-brackets-curly' },
  { value: 'Java', label: 'Core focus', icon: 'uil-server-network' },
  { value: '3+', label: 'major projects', icon: 'uil-apps' }
]

const focusAreas = ['Java', 'Spring Boot', 'REST APIs', 'SQL', 'React']

function AboutSection() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadCV = async () => {
    setIsDownloading(true)

    try {
      const response = await fetch(CV_PATH, { method: 'HEAD', cache: 'no-store' })
      if (!response.ok && response.status !== 405) {
        throw new Error(`File not accessible: ${response.status}`)
      }

      const link = document.createElement('a')
      link.href = CV_PATH
      link.download = 'Sadique_Hasan_CV.pdf'
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'noopener noreferrer')

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('CV download failed:', error)

      window.open(CV_PATH, '_blank', 'noopener,noreferrer')
      alert('The CV is temporarily unavailable to download directly, so it was opened in a new tab instead.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section id="about" className="section-padding about-section" aria-labelledby="about-heading">
      <div className="container-custom">
        <AnimatedSection animation="fadeUp" className="about-section-heading">
          <p className="about-eyebrow"><span /> A little about me</p>
          <h2 id="about-heading">
            Engineering thoughtful solutions, <span>one problem at a time.</span>
          </h2>
        </AnimatedSection>

        <div className="about-layout">
          <AnimatedSection animation="fadeLeft" className="about-visual-column">
            <div className="about-photo-wrap">
              <div className="about-photo-accent" aria-hidden="true" />
              <div className="about-photo-frame">
                <ImageWithFallback
                  src={personalInfo.images?.about?.src}
                  alt={personalInfo.images?.about?.alt || `${personalInfo.name} - About Picture`}
                  className="about-photo"
                  fallback="/images/placeholders/user-placeholder.svg"
                />
              </div>
              <div className="about-photo-caption">
                <span className="about-photo-caption-icon">
                  <i className="uil uil-map-marker" aria-hidden="true"></i>
                </span>
                <span>
                  <strong>{personalInfo.location}</strong>
                  <small>Curious by nature. Engineer by craft.</small>
                </span>
              </div>
              <span className="about-photo-index" aria-hidden="true">01 / ABOUT</span>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeRight" delay={150} className="about-copy-column">
            <div className="about-copy">
              <p>
                I&apos;m Sadique Hasan, a Software Engineer focused on building backend systems and full-stack products that are scalable, maintainable, and business-ready.
              </p>
              <p>
                My experience spans Java, Spring Boot, SQL, React, and problem solving with a strong emphasis on clean architecture, efficient APIs, and real-world impact. I bring together technical depth and product thinking to solve problems that matter.
              </p>
            </div>

            <div className="about-highlights" aria-label="Career highlights">
              {highlights.map((highlight) => (
                <div className="about-highlight" key={highlight.label}>
                  <span className="about-highlight-icon">
                    <i className={`uil ${highlight.icon}`} aria-hidden="true"></i>
                  </span>
                  <span>
                    <strong>{highlight.value}</strong>
                    <small>{highlight.label}</small>
                  </span>
                </div>
              ))}
            </div>

            <div className="about-focus">
              <span className="about-focus-label">What I work with</span>
              <ul>
                {focusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>

            <div className="about-actions">
              <Button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className="about-download-button"
              >
                {isDownloading ? 'Preparing CV...' : 'Download CV'}
                <i className={`uil ${isDownloading ? 'uil-spinner animate-spin' : 'uil-download-alt'} ml-2`} aria-hidden="true"></i>
              </Button>
              <a className="about-email-link" href={`mailto:${personalInfo.email}`}>
                Get in touch <i className="uil uil-arrow-up-right" aria-hidden="true"></i>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
