import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

// Custom render function with providers
export function renderWithProviders(ui, options = {}) {
  const { route = '/', ...renderOptions } = options
  
  // Mock zustand store
  const mockStore = {
    theme: 'light',
    toggleTheme: vi.fn(),
    activeSection: '',
    setActiveSection: vi.fn(),
    mobileMenuOpen: false,
    toggleMobileMenu: vi.fn(),
    closeMobileMenu: vi.fn(),
    openSkillSections: ['frontend'],
    toggleSkillSection: vi.fn(),
    activeQualificationTab: 'education',
    setActiveQualificationTab: vi.fn(),
    contactFormSubmitting: false,
    setContactFormSubmitting: vi.fn()
  }
  
  // Mock useAppStore hook
  vi.doMock('../stores/useAppStore', () => ({
    default: () => mockStore
  }))
  
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    )
  }
  
  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    mockStore
  }
}

// Mock EmailJS
export const mockEmailJS = {
  init: vi.fn(),
  send: vi.fn(() => Promise.resolve({ status: 200 }))
}

// Mock intersection observer hook
export const mockUseIntersectionObserver = () => [
  vi.fn(),
  true // isIntersecting
]

// Mock typewriter hook
export const mockUseTypewriter = (text) => ({
  displayText: text,
  isComplete: true
})

// Mock mouse position hook
export const mockUseMousePosition = () => ({ x: 0, y: 0 })

// Common test data
export const testPersonalInfo = {
  name: 'Test User',
  title: 'Test Developer',
  description: 'Test description',
  email: 'test@example.com',
  location: 'Test Location',
  socialLinks: {
    linkedin: 'https://linkedin.com/test',
    github: 'https://github.com/test',
    LeetCode: 'https://leetcode.com/test'
  }
}

export const testSkillsData = {
  frontend: {
    title: 'Frontend Developer',
    icon: 'uil-brackets-curly',
    skills: [
      { name: 'React', percentage: 90 },
      { name: 'JavaScript', percentage: 85 }
    ]
  }
}