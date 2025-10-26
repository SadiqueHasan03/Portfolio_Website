import { personalInfo } from '../../data/portfolioData'
import { useTypewriter } from '../../hooks/useAnimations'
import Button from '../ui/Button'
import ProfileImage from '../ui/ProfileImage'
import ParticleBackground from '../ui/ParticleBackground'
import AnimatedSection from '../ui/AnimatedSection'
import { smoothScrollTo } from '../../utils/helpers'

function HeroSection() {
  const { displayText: nameText } = useTypewriter(personalInfo.name, 150, 500)
  const { displayText: titleText } = useTypewriter(personalInfo.title, 100, 2000)

  const handleScrollToAbout = () => {
    smoothScrollTo('about', 80)
  }

  const handleContactClick = () => {
    smoothScrollTo('contact', 80)
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground className="opacity-30" />
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <AnimatedSection className="text-center lg:text-left order-2 lg:order-1" animation="fadeLeft">
            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4 mb-8">
              {Object.entries(personalInfo.socialLinks).map(([platform, url], index) => {
                const icons = {
                  linkedin: 'uil-linkedin-alt',
                  github: 'uil-github-alt',
                  LeetCode: 'uil-code-branch'
                }

                const renderIcon = (platform) => {
                  if (platform === 'LeetCode') {
                    return (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22,14.355c0-0.742-0.564-1.346-1.26-1.346H10.676c-0.696,0-1.26,0.604-1.26,1.346s0.563,1.346,1.26,1.346H20.74C21.436,15.702,22,15.098,22,14.355z"></path>
                        <path d="M3.482,18.187l4.313,4.361C8.768,23.527,10.113,24,11.598,24c1.485,0,2.83-0.512,3.805-1.494l2.588-2.637c0.51-0.514,0.492-1.365-0.039-1.9c-0.531-0.535-1.375-0.553-1.884-0.039l-2.676,2.607c-0.462,0.467-1.102,0.662-1.809,0.662s-1.346-0.195-1.81-0.662l-4.298-4.363c-0.463-0.467-0.696-1.15-0.696-1.863c0-0.713,0.233-1.357,0.696-1.824l4.285-4.38c0.463-0.467,1.116-0.645,1.822-0.645s1.346,0.195,1.809,0.662l2.676,2.606c0.51,0.515,1.354,0.497,1.885-0.038c0.531-0.536,0.549-1.387,0.039-1.901l-2.588-2.636c-0.649-0.646-1.471-1.116-2.392-1.33l-0.034-0.007l2.447-2.503c0.512-0.514,0.494-1.366-0.037-1.901c-0.531-0.535-1.376-0.552-1.887-0.038L3.482,10.476C2.509,11.458,2,12.813,2,14.311C2,15.809,2.509,17.207,3.482,18.187z"></path>
                      </svg>
                    )
                  }
                  return <i className={`uil ${icons[platform]} text-lg`}></i>
                }
                
                return (
                  <AnimatedSection
                    key={platform}
                    animation="scale"
                    delay={index * 100}
                    className="group"
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex items-center justify-center text-primary-500 hover:text-white hover:bg-primary-500 transition-all duration-300 hover:scale-110 hover:shadow-xl"
                      aria-label={platform}
                    >
                      {renderIcon(platform)}
                    </a>
                  </AnimatedSection>
                )
              })}
            </div>

            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Hi, I'm{' '}
                <span className="text-gradient min-h-[1.2em] inline-block">
                  {nameText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              
              <h3 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 min-h-[2em]">
                {titleText}
                {titleText && <span className="animate-pulse">|</span>}
              </h3>
            </div>
            
            <AnimatedSection animation="fadeUp" delay={300}>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {personalInfo.description}
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeUp" delay={500}>
              <Button 
                onClick={handleContactClick} 
                className="mb-8 hover:scale-105 transition-transform duration-300"
              >
                Contact Me <i className="uil uil-message ml-2"></i>
              </Button>
            </AnimatedSection>

            {/* Scroll indicator */}
            <AnimatedSection animation="fadeUp" delay={700}>
              <div className="hidden lg:flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <button 
                  onClick={handleScrollToAbout}
                  className="flex items-center space-x-2 hover:text-primary-500 transition-colors duration-300 group"
                >
                  <i className="uil uil-mouse-alt text-2xl group-hover:animate-bounce"></i>
                  <span className="text-sm">Scroll down</span>
                  <i className="uil uil-arrow-down group-hover:translate-y-1 transition-transform duration-300"></i>
                </button>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Profile Image */}
          <AnimatedSection 
            animation="fadeRight" 
            delay={200}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="relative group">
                <ProfileImage
                  src={personalInfo.images?.profile?.src}
                  alt={personalInfo.images?.profile?.alt || `${personalInfo.name} - Profile Picture`}
                  size="2xl"
                  className="animate-float shadow-2xl group-hover:scale-105 transition-transform duration-500 no-rotate"
                  showBorder={true}
                />
                
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border-4 border-primary-200 dark:border-primary-800 animate-pulse animate-border-glow" />
                <div className="absolute inset-4 rounded-full border-2 border-secondary-200 dark:border-secondary-800 animate-pulse animate-border-pulse" style={{ animationDelay: '1s' }} />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;