import { personalInfo, servicesData } from '../../data/portfolioData'
import AnimatedSection from '../ui/AnimatedSection'

function ServicesSection() {
  return (
    <section id="services" className="section-padding services-section" aria-labelledby="services-heading">
      <div className="container-custom">
        <AnimatedSection animation="fadeUp" className="services-heading">
          <p className="services-eyebrow"><span /> How I can contribute</p>
          <h2 id="services-heading">
            Backend engineering, <span>grounded in real projects.</span>
          </h2>
          <p className="services-intro">
            Areas I&apos;ve worked with through backend projects and software testing experience.
          </p>
        </AnimatedSection>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <AnimatedSection
              key={service.id}
              animation="fadeUp"
              delay={index * 100}
              className="services-card-wrap"
            >
              <article className="service-card">
                <div className="service-card-topline">
                  <span className="service-icon">
                    <i className={`uil ${service.icon}`} aria-hidden="true"></i>
                  </span>
                  <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                </div>

                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-scope">
                  <span className="service-scope-label">Tools &amp; focus</span>
                  <ul>
                    {service.features.map((feature) => (
                      <li key={feature}>
                        <i className="uil uil-check" aria-hidden="true"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fadeUp" delay={300} className="services-cta">
          <p>Have a backend project in mind?</p>
          <a href={`mailto:${personalInfo.email}`}>
            Let&apos;s talk <i className="uil uil-arrow-up-right" aria-hidden="true"></i>
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default ServicesSection
