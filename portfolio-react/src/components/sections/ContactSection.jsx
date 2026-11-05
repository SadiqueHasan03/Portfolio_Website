import { useForm, ValidationError } from '@formspree/react'
import { personalInfo } from '../../data/portfolioData'
import Button from '../ui/Button'
import AnimatedSection from '../ui/AnimatedSection'

const socialPlatforms = [
  { id: 'linkedin', label: 'LinkedIn', icon: 'uil-linkedin-alt' },
  { id: 'github', label: 'GitHub', icon: 'uil-github-alt' },
  { id: 'leetcode', label: 'LeetCode', icon: 'uil-brackets-curly' }
]

function ContactSection() {
  const [state, handleSubmit] = useForm('mdkpoqpw')

  if (state.succeeded) {
    return (
      <section id="contact" className="section-padding contact-section" aria-labelledby="contact-success-heading">
        <div className="container-custom">
          <div className="contact-success-card">
            <span className="contact-success-icon">
              <i className="uil uil-check" aria-hidden="true"></i>
            </span>
            <p className="contact-eyebrow"><span /> Message received</p>
            <h2 id="contact-success-heading">Thanks for reaching out.</h2>
            <p>I&apos;ll get back to you as soon as possible.</p>
            <a href={`mailto:${personalInfo.email}`} className="contact-email-link">
              {personalInfo.email}
              <i className="uil uil-arrow-up-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="section-padding contact-section" aria-labelledby="contact-heading">
      <div className="container-custom">
        <AnimatedSection animation="fadeUp" className="contact-heading">
          <p className="contact-eyebrow"><span /> Get in touch</p>
          <h2 id="contact-heading">
            Let&apos;s make something <span>meaningful.</span>
          </h2>
          <p>
            Have a role, a backend challenge, or an idea you&apos;d like to discuss? I&apos;d be glad to hear from you.
          </p>
        </AnimatedSection>

        <div className="contact-layout">
          <AnimatedSection animation="fadeLeft" className="contact-details-column">
            <div className="contact-availability">
              <span className="contact-availability-dot" aria-hidden="true" />
              <span>Open to software engineering roles</span>
            </div>

            <div className="contact-detail-card">
              <span className="contact-detail-icon">
                <i className="uil uil-envelope" aria-hidden="true"></i>
              </span>
              <div>
                <span className="contact-detail-label">Email me</span>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </div>
              <i className="uil uil-arrow-up-right contact-detail-arrow" aria-hidden="true"></i>
            </div>

            <div className="contact-detail-card">
              <span className="contact-detail-icon">
                <i className="uil uil-map-marker" aria-hidden="true"></i>
              </span>
              <div>
                <span className="contact-detail-label">Based in</span>
                <strong>{personalInfo.location}</strong>
              </div>
              <i className="uil uil-location-point contact-detail-arrow" aria-hidden="true"></i>
            </div>

            <div className="contact-social-block">
              <p>Find me around the web</p>
              <div className="contact-social-links">
                {socialPlatforms.map((platform) => (
                  <a
                    key={platform.id}
                    href={personalInfo.socialLinks[platform.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform.label}
                    title={platform.label}
                  >
                    <i className={`uil ${platform.icon}`} aria-hidden="true"></i>
                    <span>{platform.label}</span>
                    <i className="uil uil-arrow-up-right contact-social-arrow" aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-note">
              <i className="uil uil-comment-dots" aria-hidden="true"></i>
              <p>I usually respond within a couple of business days.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeRight" delay={120} className="contact-form-column">
            <div className="contact-form-card">
              <div className="contact-form-heading">
                <span className="contact-form-step">01 <span>/ 01</span></span>
                <h3>Send a message</h3>
                <p>Share a few details and I&apos;ll get back to you.</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      className="contact-input"
                    />
                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={state.errors}
                      className="contact-field-error"
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="contact-input"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="contact-field-error"
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="project">Project</label>
                  <input
                    id="project"
                    type="text"
                    name="project"
                    placeholder="What would you like to discuss?"
                    className="contact-input"
                  />
                  <ValidationError
                    prefix="Project"
                    field="project"
                    errors={state.errors}
                    className="contact-field-error"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me a little about it..."
                    className="contact-input contact-message-input"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="contact-field-error"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={state.submitting}
                  className="contact-submit-button"
                >
                  {state.submitting ? (
                    <>
                      Sending...
                      <i className="uil uil-spinner animate-spin ml-2" aria-hidden="true"></i>
                    </>
                  ) : (
                    <>
                      Send message
                      <i className="uil uil-arrow-up-right ml-2" aria-hidden="true"></i>
                    </>
                  )}
                </Button>

                <p className="contact-form-privacy">
                  <i className="uil uil-reply" aria-hidden="true"></i>
                  I&apos;ll follow up at the email address you provide.
                </p>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
