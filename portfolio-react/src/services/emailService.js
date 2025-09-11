import emailjs from '@emailjs/browser'

// Environment-based EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAIL_DEBUG = import.meta.env.VITE_EMAIL_DEBUG === 'true'
const EMAIL_TIMEOUT = parseInt(import.meta.env.VITE_EMAIL_TIMEOUT) || 10000

// Error types for better error handling
const ERROR_TYPES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  RATE_LIMIT: 'RATE_LIMIT',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR'
}

// Error messages for user-friendly feedback
const ERROR_MESSAGES = {
  [ERROR_TYPES.NETWORK_ERROR]: 'Connection issue. Please check your internet and try again.',
  [ERROR_TYPES.INVALID_CREDENTIALS]: 'Service temporarily unavailable. Please try again later.',
  [ERROR_TYPES.RATE_LIMIT]: 'Too many requests. Please wait a moment before trying again.',
  [ERROR_TYPES.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ERROR_TYPES.SERVER_ERROR]: 'Server error. Please try again later.',
  [ERROR_TYPES.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
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
      
      if (EMAIL_DEBUG) {
        console.log('EmailJS initialized successfully')
      }
      
      resolve(true)
    } catch (error) {
      if (EMAIL_DEBUG) {
        console.error('EmailJS initialization failed:', error)
      }
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

  // Network errors
  if (errorMessage.includes('Network') || errorMessage.includes('fetch') || errorStatus === 0) {
    return ERROR_TYPES.NETWORK_ERROR
  }

  // Rate limiting
  if (errorStatus === 429 || errorMessage.includes('rate') || errorMessage.includes('limit')) {
    return ERROR_TYPES.RATE_LIMIT
  }

  // Authentication/credentials
  if (errorStatus === 401 || errorStatus === 403 || errorMessage.includes('unauthorized') || errorMessage.includes('forbidden')) {
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
        if (EMAIL_DEBUG) {
          console.log('Validation failed:', {
            errors: validation.errors,
            fieldErrors: validation.fieldErrors,
            formData: sanitizedData
          })
        }
        
        return {
          success: false,
          message: validation.errors.join('. '),
          errorType: ERROR_TYPES.VALIDATION_ERROR,
          errors: validation.errors,
          fieldErrors: validation.fieldErrors
        }
      }

      if (EMAIL_DEBUG) {
        console.log('Form validation passed:', sanitizedData)
        console.log('EmailJS Configuration:', {
          serviceId: !!EMAILJS_SERVICE_ID,
          templateId: !!EMAILJS_TEMPLATE_ID,
          publicKey: !!EMAILJS_PUBLIC_KEY
        })
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
        to_name: 'Sadique Hasan',
        timestamp: new Date().toISOString()
      }

      if (EMAIL_DEBUG) {
        console.log('Sending email with data:', emailData)
        console.log('Using EmailJS config:', {
          serviceId: EMAILJS_SERVICE_ID,
          templateId: EMAILJS_TEMPLATE_ID,
          publicKey: EMAILJS_PUBLIC_KEY ? EMAILJS_PUBLIC_KEY.substring(0, 10) + '...' : 'NOT SET'
        })
      }

      const emailPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailData
      )

      // Race between email sending and timeout
      const response = await Promise.race([emailPromise, timeoutPromise])
      
      if (EMAIL_DEBUG) {
        console.log('Email sent successfully:', response)
      }
      
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
        response
      }
    } catch (error) {
      const errorType = classifyError(error)
      const userMessage = ERROR_MESSAGES[errorType] || ERROR_MESSAGES.DEFAULT
      
      if (EMAIL_DEBUG) {
        console.error('EmailJS Error Details:', {
          error,
          type: errorType,
          message: error.message || error.text,
          status: error.status,
          stack: error.stack,
          formData: sanitizedData,
          config: {
            serviceId: !!EMAILJS_SERVICE_ID,
            templateId: !!EMAILJS_TEMPLATE_ID,
            publicKey: !!EMAILJS_PUBLIC_KEY,
            initialized: isInitialized
          }
        })
      }
      
      // Provide more specific error messages based on the error type
      let specificMessage = userMessage
      if (errorType === ERROR_TYPES.INVALID_CREDENTIALS) {
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
        error: EMAIL_DEBUG ? error : undefined
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

  /**
   * Get detailed configuration status for debugging
   * @returns {Object} Configuration status with detailed information
   */
  getConfigStatus() {
    const status = {
      serviceId: {
        present: !!EMAILJS_SERVICE_ID,
        value: EMAILJS_SERVICE_ID ? EMAILJS_SERVICE_ID.substring(0, 10) + '...' : 'NOT SET'
      },
      templateId: {
        present: !!EMAILJS_TEMPLATE_ID,
        value: EMAILJS_TEMPLATE_ID ? EMAILJS_TEMPLATE_ID.substring(0, 10) + '...' : 'NOT SET'
      },
      publicKey: {
        present: !!EMAILJS_PUBLIC_KEY,
        value: EMAILJS_PUBLIC_KEY ? EMAILJS_PUBLIC_KEY.substring(0, 10) + '...' : 'NOT SET'
      },
      initialized: isInitialized,
      debugMode: EMAIL_DEBUG,
      timeout: EMAIL_TIMEOUT,
      environment: typeof window !== 'undefined' ? 'browser' : 'server'
    }
    
    if (EMAIL_DEBUG) {
      console.log('EmailJS Configuration Status:', status)
    }
    
    return status
  },

  /**
   * Test email service configuration and connectivity
   * @returns {Promise<Object>} Test result with detailed information
   */
  async testConfiguration() {
    const config = this.getConfigStatus()
    
    try {
      // Test basic configuration
      if (!config.serviceId.present || !config.templateId.present || !config.publicKey.present) {
        return {
          success: false,
          message: 'EmailJS configuration incomplete',
          details: 'Missing required environment variables',
          config,
          missingConfig: [
            !config.serviceId.present && 'VITE_EMAILJS_SERVICE_ID',
            !config.templateId.present && 'VITE_EMAILJS_TEMPLATE_ID',
            !config.publicKey.present && 'VITE_EMAILJS_PUBLIC_KEY'
          ].filter(Boolean)
        }
      }
      
      // Test initialization
      await initializeEmailJS()
      
      if (EMAIL_DEBUG) {
        console.log('EmailJS configuration test passed')
      }
      
      return {
        success: true,
        message: 'EmailJS configuration is valid and initialized',
        config,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      if (EMAIL_DEBUG) {
        console.error('EmailJS configuration test failed:', error)
      }
      
      return {
        success: false,
        message: 'EmailJS configuration test failed',
        error: error.message,
        config,
        details: error.stack
      }
    }
  },

  /**
   * Perform a comprehensive service health check
   * @returns {Promise<Object>} Health check result
   */
  async healthCheck() {
    const startTime = Date.now()
    
    try {
      const configTest = await this.testConfiguration()
      const endTime = Date.now()
      
      return {
        success: configTest.success,
        message: configTest.success ? 'Email service is healthy' : 'Email service has issues',
        responseTime: endTime - startTime,
        config: configTest.config,
        details: configTest,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      const endTime = Date.now()
      
      return {
        success: false,
        message: 'Email service health check failed',
        responseTime: endTime - startTime,
        error: error.message,
        timestamp: new Date().toISOString()
      }
    }
  }
}