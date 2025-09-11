import emailjs from '@emailjs/browser'

// Environment-based EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const EMAIL_TIMEOUT = parseInt(import.meta.env.VITE_EMAIL_TIMEOUT) || 10000

// Error types for better error handling
const ERROR_TYPES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  RATE_LIMIT: 'RATE_LIMIT',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  TEMPLATE_ERROR: 'TEMPLATE_ERROR',
  DOMAIN_RESTRICTION: 'DOMAIN_RESTRICTION',
  SERVICE_CONFIGURATION: 'SERVICE_CONFIGURATION'
}

// Error messages for user-friendly feedback
const ERROR_MESSAGES = {
  [ERROR_TYPES.NETWORK_ERROR]: 'Connection issue. Please check your internet and try again.',
  [ERROR_TYPES.INVALID_CREDENTIALS]: 'Service temporarily unavailable. Please try again later.',
  [ERROR_TYPES.RATE_LIMIT]: 'Too many requests. Please wait a moment before trying again.',
  [ERROR_TYPES.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ERROR_TYPES.SERVER_ERROR]: 'Server error. Please try again later.',
  [ERROR_TYPES.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
  [ERROR_TYPES.TEMPLATE_ERROR]: 'Email template configuration issue. Please try again later.',
  [ERROR_TYPES.DOMAIN_RESTRICTION]: 'Service not available from this domain. Please contact support.',
  [ERROR_TYPES.SERVICE_CONFIGURATION]: 'Email service configuration issue. Please try again later.',
  DEFAULT: 'An unexpected error occurred. Please try again.'
}

// Initialize EmailJS with better error handling
let isInitialized = false
let initializationPromise = null

const initializeEmailJS = async () => {
  if (isInitialized) return true
  if (initializationPromise) return initializationPromise

  initializationPromise = new Promise((resolve, reject) => {
    try {
      if (typeof window === 'undefined') {
        reject(new Error('EmailJS requires browser environment'))
        return
      }

      if (!EMAILJS_PUBLIC_KEY) {
        reject(new Error('EmailJS public key not configured'))
        return
      }

      emailjs.init(EMAILJS_PUBLIC_KEY)
      isInitialized = true
      

      
      resolve(true)
    } catch (error) {

      reject(error)
    }
  })

  return initializationPromise
}

// Enhanced email validation function (standalone)
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false

  // Basic format validation
  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!basicEmailRegex.test(email)) return false

  // Enhanced validation
  const enhancedEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if (!enhancedEmailRegex.test(email)) return false

  // Additional checks
  const parts = email.split('@')
  if (parts.length !== 2) return false
  
  const [localPart, domain] = parts
  
  // Check local part length
  if (localPart.length > 64) return false
  
  // Check domain length
  if (domain.length > 255) return false
  
  // Check for consecutive dots
  if (email.includes('..')) return false
  
  // Check for dots at start/end
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false
  
  return true
}

// Enhanced validation with detailed error reporting
const validateEmailData = (formData) => {
  const errors = []
  const fieldErrors = {}

  // Name validation
  if (!formData.name?.trim()) {
    errors.push('Name is required')
    fieldErrors.name = 'Name is required'
  } else if (formData.name.length > 100) {
    errors.push('Name must be less than 100 characters')
    fieldErrors.name = 'Name must be less than 100 characters'
  }

  // Email validation
  if (!formData.email?.trim()) {
    errors.push('Email is required')
    fieldErrors.email = 'Email is required'
  } else if (!validateEmail(formData.email)) {
    errors.push('Please enter a valid email address')
    fieldErrors.email = 'Please enter a valid email address'
  }

  // Project validation
  if (!formData.project?.trim()) {
    errors.push('Project/subject is required')
    fieldErrors.project = 'Project/subject is required'
  } else if (formData.project.length > 100) {
    errors.push('Project/subject must be less than 100 characters')
    fieldErrors.project = 'Project/subject must be less than 100 characters'
  }

  // Message validation (reduced minimum from 10 to 5 characters)
  if (!formData.message?.trim()) {
    errors.push('Message is required')
    fieldErrors.message = 'Message is required'
  } else if (formData.message.trim().length < 5) {
    errors.push('Message must be at least 5 characters long')
    fieldErrors.message = 'Message must be at least 5 characters long'
  } else if (formData.message.length > 2000) {
    errors.push('Message must be less than 2000 characters')
    fieldErrors.message = 'Message must be less than 2000 characters'
  }

  return { errors, fieldErrors }
}

// Classify error types
const classifyError = (error) => {
  if (!error) return ERROR_TYPES.SERVER_ERROR

  const errorMessage = error.message || error.text || ''
  const errorStatus = error.status || 0

  // Check for specific EmailJS error patterns
  // Template field errors (missing required template variables)
  if (errorMessage.includes('template') || errorMessage.includes('Template') || 
      errorMessage.includes('variable') || errorMessage.includes('field')) {
    return ERROR_TYPES.TEMPLATE_ERROR
  }

  // Domain restriction errors
  if (errorStatus === 403 || errorMessage.includes('domain') || 
      errorMessage.includes('origin') || errorMessage.includes('CORS')) {
    return ERROR_TYPES.DOMAIN_RESTRICTION
  }

  // Service configuration errors
  if (errorMessage.includes('service') || errorMessage.includes('Service') ||
      errorMessage.includes('configuration') || errorMessage.includes('key')) {
    return ERROR_TYPES.SERVICE_CONFIGURATION
  }

  // Network errors
  if (errorMessage.includes('Network') || errorMessage.includes('fetch') || errorStatus === 0) {
    return ERROR_TYPES.NETWORK_ERROR
  }

  // Rate limiting
  if (errorStatus === 429 || errorMessage.includes('rate') || errorMessage.includes('limit')) {
    return ERROR_TYPES.RATE_LIMIT
  }

  // Authentication/credentials
  if (errorStatus === 401 || errorMessage.includes('unauthorized') || errorMessage.includes('forbidden')) {
    return ERROR_TYPES.INVALID_CREDENTIALS
  }

  // Timeout
  if (errorMessage.includes('timeout') || errorMessage.includes('abort')) {
    return ERROR_TYPES.TIMEOUT_ERROR
  }

  // Server errors
  if (errorStatus >= 500) {
    return ERROR_TYPES.SERVER_ERROR
  }

  // Default to validation error for 4xx
  if (errorStatus >= 400 && errorStatus < 500) {
    return ERROR_TYPES.VALIDATION_ERROR
  }

  return ERROR_TYPES.SERVER_ERROR
}

// Sanitize input data
const sanitizeFormData = (formData) => {
  return {
    name: formData.name?.trim() || '',
    email: formData.email?.trim().toLowerCase() || '',
    project: formData.project?.trim() || '',
    message: formData.message?.trim() || ''
  }
}

export const emailService = {
  /**
   * Send contact form email with enhanced error handling
   * @param {Object} formData - The form data containing name, email, project, message
   * @returns {Promise<Object>} Result object with success status and message
   */
  async sendContactEmail(formData) {
    try {
      // Initialize EmailJS if not already done
      await initializeEmailJS()

      // Validate configuration
      if (!this.isConfigured()) {
        throw new Error('EmailJS service not properly configured')
      }

      // Sanitize input data
      const sanitizedData = sanitizeFormData(formData)

      // Validate form data
      const validation = validateEmailData(sanitizedData)
      if (validation.errors.length > 0) {

        
        return {
          success: false,
          message: validation.errors.join('. '),
          errorType: ERROR_TYPES.VALIDATION_ERROR,
          errors: validation.errors,
          fieldErrors: validation.fieldErrors
        }
      }



      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'))
        }, EMAIL_TIMEOUT)
      })

      // Create email sending promise with detailed logging
      const emailData = {
        name: sanitizedData.name,
        email: sanitizedData.email,
        project: sanitizedData.project,
        message: sanitizedData.message,
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        reply_to: sanitizedData.email, // Add missing reply_to field for EmailJS template
        to_name: 'Sadique Hasan',
        timestamp: new Date().toISOString()
      }



      const emailPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailData
      )

      // Race between email sending and timeout
      const response = await Promise.race([emailPromise, timeoutPromise])
      
      // Enhanced logging for successful emails
      console.log('✅ Email sent successfully:', {
        timestamp: new Date().toISOString(),
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        status: response?.status || 'success',
        text: response?.text || 'Email delivered'
      })

      
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
        response
      }
    } catch (error) {
      const errorType = classifyError(error)
      const userMessage = ERROR_MESSAGES[errorType] || ERROR_MESSAGES.DEFAULT
      
      // Enhanced error logging with actual EmailJS response details
      console.error('❌ EmailJS Error Details:', {
        timestamp: new Date().toISOString(),
        errorMessage: error.message || 'Unknown error',
        errorText: error.text || 'No error text',
        errorStatus: error.status || 'No status',
        errorType: errorType,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        stackTrace: error.stack
      })

      
      // Provide more specific error messages based on the error type
      let specificMessage = userMessage
      if (errorType === ERROR_TYPES.TEMPLATE_ERROR) {
        specificMessage = 'Email template issue detected. The service has been updated to fix this. Please try again.'
      } else if (errorType === ERROR_TYPES.DOMAIN_RESTRICTION) {
        specificMessage = 'Access restricted from this domain. Please contact support if this issue persists.'
      } else if (errorType === ERROR_TYPES.SERVICE_CONFIGURATION) {
        specificMessage = 'Email service configuration issue. Please try again in a moment.'
      } else if (errorType === ERROR_TYPES.INVALID_CREDENTIALS) {
        specificMessage = 'Email service configuration issue. Please try again later.'
      } else if (errorType === ERROR_TYPES.NETWORK_ERROR) {
        specificMessage = 'Network connection issue. Please check your internet and try again.'
      } else if (errorType === ERROR_TYPES.RATE_LIMIT) {
        specificMessage = 'Too many requests. Please wait a moment before trying again.'
      }
      
      return {
        success: false,
        message: specificMessage,
        errorType,
        error: undefined
      }
    }
  },

  /**
   * Enhanced email validation with domain checking
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid email format
   */
  validateEmail(email) {
    if (!email || typeof email !== 'string') return false

    // Basic format validation
    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!basicEmailRegex.test(email)) return false

    // Enhanced validation
    const enhancedEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!enhancedEmailRegex.test(email)) return false

    // Additional checks
    const parts = email.split('@')
    if (parts.length !== 2) return false
    
    const [localPart, domain] = parts
    
    // Check local part length
    if (localPart.length > 64) return false
    
    // Check domain length
    if (domain.length > 255) return false
    
    // Check for consecutive dots
    if (email.includes('..')) return false
    
    // Check for dots at start/end
    if (localPart.startsWith('.') || localPart.endsWith('.')) return false
    
    return true
  },

  /**
   * Check if EmailJS is properly configured
   * @returns {boolean} True if all required config is present
   */
  isConfigured() {
    return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)
  },






}