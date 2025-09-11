import { personalInfo } from '../../data/portfolioData'
import Card from '../ui/Card'
import Button from '../ui/Button'
import ImageWithFallback from '../ui/ImageWithFallback'
import AnimatedSection from '../ui/AnimatedSection'
import CV from '/assets/documents/Sadique_Hasan_CV.pdf'

function AboutSection() {
  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = CV
    link.download = 'Sadique_Hasan_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <AnimatedSection animation="fadeUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            My introduction
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <AnimatedSection animation="fadeLeft" delay={200}>
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-80 h-96 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                  <ImageWithFallback
                    src={personalInfo.images?.about?.src}
                    alt={personalInfo.images?.about?.alt || `${personalInfo.name} - About Picture`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    fallback="/images/placeholders/user-placeholder.svg"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-full opacity-50 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary-200 dark:bg-secondary-800 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection animation="fadeRight" delay={400}>
            <div>
              <Card className="mb-8 hover:shadow-2xl transition-shadow duration-500">
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Hi! I'm Sadique Hasan, a final-year Bachelor of Technology (B.Tech) graduate in Computer Science, Class of 2025, with a strong academic background and a keen interest in backend development, particularly with Java technologies. My technical expertise spans Java (Core & Advanced), SQL, and JavaScript, and I am actively strengthening my skills in Spring Boot.
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    I have demonstrated strong analytical and problem-solving abilities, earning a 5-star rating in Java on HackerRank and solving 70+ algorithmic challenges on LeetCode. I am passionate about building scalable backend solutions, applying theoretical knowledge to practical projects, and writing clean, maintainable code aligned with industry best practices.
                  </p>
                </div>
              </Card>

              <AnimatedSection animation="fadeUp" delay={600}>
                <Button 
                  variant="outline" 
                  className="group hover:scale-105 transition-transform duration-300"
                  onClick={handleDownloadCV}
                >
                  Download CV 
                  <i className="uil uil-download-alt ml-2 group-hover:animate-bounce"></i>
                </Button>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default AboutSection;