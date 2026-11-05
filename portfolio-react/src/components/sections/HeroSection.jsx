import { Link } from 'react-router-dom'
import { personalInfo } from '../../data/portfolioData'
import { useTypewriter } from '../../hooks/useAnimations'
import Button from '../ui/Button'
import ProfileImage from '../ui/ProfileImage'
import AnimatedSection from '../ui/AnimatedSection'
import { smoothScrollTo } from '../../utils/helpers'

function HeroSection() {
  const { displayText: nameText } = useTypewriter(personalInfo.name, 150, 500)

  const handleContactClick = () => {
    smoothScrollTo('contact', 80)
  }

  return (
    <section id="home" className="hero-section relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="hero-grid-pattern absolute inset-0" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="container-custom relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <AnimatedSection className="order-2 text-center lg:order-1 lg:text-left" animation="fadeLeft">
            <p className="hero-eyebrow mx-auto mb-6 lg:mx-0">
              <span className="hero-status-dot" aria-hidden="true" />
              Open to software engineering roles
            </p>

            <h1 className="hero-title mb-5">
              Hi, I&apos;m{' '}
              <span className="hero-name text-gradient">
                {nameText}
                <span className="hero-caret" aria-hidden="true">|</span>
              </span>
            </h1>

            <p className="hero-role mb-5">
              Software Engineer <span aria-hidden="true">·</span> Java, Spring Boot &amp; full-stack
            </p>

            <p className="mx-auto mb-9 max-w-xl text-base leading-8 text-gray-600 dark:text-gray-300 lg:mx-0 md:text-lg">
              {personalInfo.description}
            </p>

            <div className="mb-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button onClick={handleContactClick} size="lg" className="hero-primary-button">
                Let&apos;s talk
                <i className="uil uil-arrow-up-right ml-2" aria-hidden="true"></i>
              </Button>
              <Link to="/projects" className="hero-secondary-button">
                Explore my work
                <i className="uil uil-arrow-right ml-2" aria-hidden="true"></i>
              </Link>
            </div>

            <div className="flex flex-col items-center gap-4 lg:items-start">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                Find me online
              </span>
              <div className="flex items-center gap-3">
                {Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
                  const labels = {
                    linkedin: 'LinkedIn',
                    github: 'GitHub',
                    leetcode: 'LeetCode'
                  }
                  const icons = {
                    linkedin: 'uil-linkedin-alt',
                    github: 'uil-github-alt',
                    leetcode: 'uil-code-branch'
                  }

                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-link"
                      aria-label={labels[platform] || platform}
                    >
                      {platform === 'leetcode' ? (
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22,14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696,0-1.26.604-1.26,1.346s.563,1.346,1.26,1.346H20.74c.696.001,1.26-.603,1.26-1.346z"></path>
                          <path d="M3.482,18.187l4.313,4.361C8.768,23.527,10.113,24,11.598,24c1.485,0,2.83-.512,3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676,2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863s.233-1.357.696-1.824l4.285-4.38c.463-.467,1.116-.645,1.822-.645s1.346.195,1.809.662l2.676,2.606c.51.515,1.354.497,1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636c-.649-.646-1.471-1.116-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038L3.482,10.476C2.509,11.458,2,12.813,2,14.311c0,1.498.509,2.896,1.482,3.876z"></path>
                        </svg>
                      ) : (
                        <i className={`uil ${icons[platform]} text-lg`} aria-hidden="true"></i>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            animation="fadeRight"
            delay={200}
            className="order-1 flex justify-center lg:order-2"
          >
            <div className="hero-portrait-wrap">
              <div className="hero-portrait-backdrop" aria-hidden="true" />
              <div className="hero-portrait-frame">
                <ProfileImage
                  src={personalInfo.images?.profile?.src}
                  alt={personalInfo.images?.profile?.alt || `${personalInfo.name} - Profile Picture`}
                  size="2xl"
                  shape="rounded"
                  className="hero-portrait"
                  showBorder={false}
                />
              </div>
              <div className="hero-portrait-ring hero-portrait-ring-glow animate-border-glow" aria-hidden="true" />
              <div className="hero-portrait-ring hero-portrait-ring-pulse animate-border-pulse" aria-hidden="true" />
              <div className="hero-float-card">
                <span className="hero-float-icon">
                  <i className="uil uil-code-branch" aria-hidden="true"></i>
                </span>
                <span>
                  <strong>Building for impact</strong>
                  <small>Backend · APIs · Web</small>
                </span>
              </div>
              <span className="hero-coordinate" aria-hidden="true">28°36&apos;N&nbsp; 77°13&apos;E</span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
