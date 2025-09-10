import { servicesData } from '../../data/portfolioData'
import Card from '../ui/Card'
import AnimatedSection from '../ui/AnimatedSection'

function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <AnimatedSection animation="fadeUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            What I offer
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <AnimatedSection 
              key={service.id}
              animation="fadeUp" 
              delay={index * 200}
            >
              <Card className="text-center h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors duration-300">
                    <i className={`${service.icon} text-2xl text-primary-600 dark:text-primary-400`}></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <i className="uil uil-check-circle text-primary-500 mr-3 text-lg"></i>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Learn More
                    <i className="uil uil-arrow-right ml-2"></i>
                  </button>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection