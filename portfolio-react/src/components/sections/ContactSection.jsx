import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useAppStore from '../../stores/useAppStore'
import { personalInfo } from '../../data/portfolioData'
import { emailService } from '../../services/emailService'
import Card from '../ui/Card'
import Button from '../ui/Button'

function ContactSection() {
  const { contactFormSubmitting, setContactFormSubmitting } = useAppStore()
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '', fieldErrors: {} })
  const [debugInfo, setDebugInfo] = useState(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors
  } = useForm()

  const onSubmit = async (data) => {
    setContactFormSubmitting(true)
    setSubmitStatus({ type: '', message: '', fieldErrors: {} })
    setDebugInfo(null)
    clearErrors()

    try {
      // Log form submission attempt in development
      if (import.meta.env.DEV) {
        console.log('Contact form submission started:', data)
      }
      
      const result = await emailService.sendContactEmail(data)
      
      if (import.meta.env.DEV) {
        console.log('EmailService result:', result)
        setDebugInfo(result)
      }
      
      if (result.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: result.message,
          fieldErrors: {}
        })
        reset()
      } else {
        // Handle field-specific errors if available
        if (result.fieldErrors) {
          Object.keys(result.fieldErrors).forEach(field => {
            setError(field, { 
              type: 'server', 
              message: result.fieldErrors[field] 
            })
          })
        }
        
        setSubmitStatus({ 
          type: 'error', 
          message: result.message,
          fieldErrors: result.fieldErrors || {}
        })
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Contact form submission error:', err)
      }
      
      setSubmitStatus({ 
        type: 'error', 
        message: 'An unexpected error occurred. Please try again.',
        fieldErrors: {}
      })
    } finally {
      setContactFormSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Contact Me
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
          Get in touch
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <i className="uil uil-envelope text-primary-500 text-xl"></i>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {personalInfo.email}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <i className="uil uil-map-marker text-primary-500 text-xl"></i>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card>
              <h3 className="font-semibold text-lg mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <i className="uil uil-linkedin-alt"></i>
                </a>
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <i className="uil uil-github-alt"></i>
                </a>
                <a
                  href={personalInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <i className="uil uil-instagram"></i>
                </a>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', { 
                      required: 'Name is required',
                      maxLength: {
                        value: 100,
                        message: 'Name must be less than 100 characters'
                      },
                      pattern: {
                        value: /^[a-zA-Z\s'-]+$/,
                        message: 'Name can only contain letters, spaces, hyphens, and apostrophes'
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email'
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project
                </label>
                <input
                  id="project"
                  type="text"
                  {...register('project', { 
                    required: 'Project or subject is required',
                    maxLength: {
                      value: 100,
                      message: 'Project/subject must be less than 100 characters'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
                  placeholder="Project or inquiry type"
                />
                {errors.project && (
                  <p className="mt-1 text-sm text-red-500">{errors.project.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: {
                      value: 5,
                      message: 'Message must be at least 5 characters long'
                    },
                    maxLength: {
                      value: 2000,
                      message: 'Message must be less than 2000 characters'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              {/* Status Message */}
              {submitStatus.message && (
                <div className={`p-4 rounded-lg border ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {submitStatus.type === 'success' ? (
                        <i className="uil uil-check-circle text-lg"></i>
                      ) : (
                        <i className="uil uil-exclamation-triangle text-lg"></i>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{submitStatus.message}</p>
                      {submitStatus.type === 'error' && Object.keys(submitStatus.fieldErrors || {}).length > 0 && (
                        <ul className="mt-2 text-sm space-y-1">
                          {Object.entries(submitStatus.fieldErrors).map(([field, error]) => (
                            <li key={field}>• {error}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Development Debug Panel */}
              {import.meta.env.DEV && debugInfo && (
                <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <summary className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400">
                    Debug Information (Development Only)
                  </summary>
                  <pre className="mt-2 text-xs text-gray-500 dark:text-gray-500 overflow-auto">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </details>
              )}

              <Button
                type="submit"
                disabled={contactFormSubmitting}
                className="w-full"
              >
                {contactFormSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <i className="uil uil-message ml-2"></i>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ContactSection;