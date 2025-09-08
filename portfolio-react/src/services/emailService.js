import emailjs from '@emailjs/browser'

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_fxrmbq9'
const EMAILJS_TEMPLATE_ID = 'template_knt001v'
const EMAILJS_PUBLIC_KEY = '505hKYguhDbLkUNQi'

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

export const emailService = {
  /**
   * Send contact form email
   * @param {Object} formData - The form data containing name, email, project, message
   * @returns {Promise} EmailJS send promise
   */
  async sendContactEmail(formData) {
    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          project: formData.project,
          message: formData.message,
          from_name: formData.name,
          from_email: formData.email,
          to_name: 'Sadique Hasan'
        }
      )
      
      return {
        success: true,
        message: 'Message sent successfully!',
        response
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      return {
        success: false,
        message: `Failed to send message: ${error.text || error.message}`,
        error
      }
    }
  },

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Check if EmailJS is properly configured
   * @returns {boolean} True if all required config is present
   */
  isConfigured() {
    return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)
  }
}