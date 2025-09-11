import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, mockEmailJS } from '../../test/testUtils.jsx'
import ContactSection from './ContactSection'

// Mock EmailJS
vi.mock('@emailjs/browser', () => mockEmailJS)

// Mock the store
const mockStore = {
  contactFormSubmitting: false,
  setContactFormSubmitting: vi.fn()
}

vi.mock('../../stores/useAppStore', () => ({
  default: () => mockStore
}))

// Mock personal info
vi.mock('../../data/portfolioData', () => ({
  personalInfo: {
    email: 'test@example.com',
    location: 'Test Location',
    socialLinks: {
      linkedin: 'https://linkedin.com/test',
      github: 'https://github.com/test',
      instagram: 'https://instagram.com/test'
    }
  }
}))

describe('ContactSection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockStore.contactFormSubmitting = false
  })

  it('renders contact section with form', () => {
    renderWithProviders(<ContactSection />)
    
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
    
    // Check form fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/project/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('displays contact information', () => {
    renderWithProviders(<ContactSection />)
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('Test Location')).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    
    renderWithProviders(<ContactSection />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Project is required')).toBeInTheDocument()
      expect(screen.getByText('Message is required')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    
    renderWithProviders(<ContactSection />)
    
    const emailField = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    await user.type(emailField, 'invalid-email')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    mockEmailJS.send.mockResolvedValue({ status: 200 })
    
    renderWithProviders(<ContactSection />)
    
    // Fill form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/project/i), 'Test Project')
    await user.type(screen.getByLabelText(/message/i), 'Test message')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockStore.setContactFormSubmitting).toHaveBeenCalledWith(true)
    })
  })

  it('displays loading state when submitting', () => {
    mockStore.contactFormSubmitting = true
    
    renderWithProviders(<ContactSection />)
    
    expect(screen.getByText('Sending...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})