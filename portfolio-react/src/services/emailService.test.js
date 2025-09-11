import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock EmailJS first
vi.mock('@emailjs/browser', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn()
  }
}))

// Mock environment variables
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_EMAILJS_SERVICE_ID: 'test_service_id',
    VITE_EMAILJS_TEMPLATE_ID: 'test_template_id', 
    VITE_EMAILJS_PUBLIC_KEY: 'test_public_key',
    VITE_EMAIL_DEBUG: 'true',
    VITE_EMAIL_TIMEOUT: '10000'
  },
  writable: true
})

// Import after mocking
import { emailService } from './emailService'
import emailjs from '@emailjs/browser'

describe('EmailService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    emailjs.send.mockReset()
  })

  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(emailService.validateEmail('test@example.com')).toBe(true)
      expect(emailService.validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(emailService.validateEmail('test+label@example.org')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(emailService.validateEmail('')).toBe(false)
      expect(emailService.validateEmail('invalid-email')).toBe(false)
      expect(emailService.validateEmail('test@')).toBe(false)
      expect(emailService.validateEmail('@example.com')).toBe(false)
      expect(emailService.validateEmail('test..test@example.com')).toBe(false)
    })

    it('should handle edge cases', () => {
      expect(emailService.validateEmail(null)).toBe(false)
      expect(emailService.validateEmail(undefined)).toBe(false)
      expect(emailService.validateEmail(123)).toBe(false)
    })
  })

  describe('sendContactEmail', () => {
    const validFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      project: 'Test Project',
      message: 'This is a test message with enough characters'
    }

    it('should successfully send email with valid data', async () => {
      emailjs.send.mockResolvedValue({ status: 200 })

      const result = await emailService.sendContactEmail(validFormData)

      expect(result.success).toBe(true)
      expect(result.message).toContain('Message sent successfully')
      expect(emailjs.send).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        expect.objectContaining({
          name: 'John Doe',
          email: 'john@example.com',
          project: 'Test Project',
          message: 'This is a test message with enough characters'
        })
      )
    })

    it('should validate required fields', async () => {
      const invalidData = { name: '', email: '', project: '', message: '' }

      const result = await emailService.sendContactEmail(invalidData)

      expect(result.success).toBe(false)
      expect(result.errors).toContain('Name is required')
      expect(result.errors).toContain('Email is required')
      expect(result.errors).toContain('Project/subject is required')
      expect(result.errors).toContain('Message is required')
    })

    it('should validate email format', async () => {
      const invalidEmailData = {
        ...validFormData,
        email: 'invalid-email'
      }

      const result = await emailService.sendContactEmail(invalidEmailData)

      expect(result.success).toBe(false)
      expect(result.errors).toContain('Please enter a valid email address')
    })

    it('should validate message length', async () => {
      const shortMessageData = {
        ...validFormData,
        message: 'Hi'
      }

      const result = await emailService.sendContactEmail(shortMessageData)

      expect(result.success).toBe(false)
      expect(result.errors).toContain('Message must be at least 5 characters long')
    })

    it('should validate field lengths', async () => {
      const longFieldsData = {
        name: 'a'.repeat(101),
        email: 'test@example.com',
        project: 'b'.repeat(101),
        message: 'c'.repeat(2001)
      }

      const result = await emailService.sendContactEmail(longFieldsData)

      expect(result.success).toBe(false)
      expect(result.errors).toContain('Name must be less than 100 characters')
      expect(result.errors).toContain('Project/subject must be less than 100 characters')
      expect(result.errors).toContain('Message must be less than 2000 characters')
    })

    it('should handle EmailJS errors gracefully', async () => {
      emailjs.send.mockRejectedValue(new Error('Network error'))

      const result = await emailService.sendContactEmail(validFormData)

      expect(result.success).toBe(false)
      expect(result.message).toBeDefined()
    })
  })

  describe('configuration', () => {
    it('should check if service is configured', () => {
      expect(emailService.isConfigured()).toBe(true)
    })


  })
})