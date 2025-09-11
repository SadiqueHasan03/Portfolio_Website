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
                  instagram: 'uil-instagram'
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
                      <i className={`uil ${icons[platform]} text-lg`}></i>
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