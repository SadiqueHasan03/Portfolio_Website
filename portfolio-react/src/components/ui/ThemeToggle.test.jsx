import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test/testUtils.jsx'
import ThemeToggle from './ThemeToggle'

// Mock the store
const mockToggleTheme = vi.fn()
const mockStore = {
  theme: 'light',
  resolvedTheme: 'light',
  toggleTheme: mockToggleTheme,
  initializeTheme: vi.fn(),
  setTheme: vi.fn(),
  updateResolvedTheme: vi.fn()
}

vi.mock('../../stores/useAppStore', () => ({
  default: vi.fn(() => mockStore)
}))

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders theme toggle button', () => {
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme')
  })

  it('shows moon icon in light theme', () => {
    renderWithProviders(<ThemeToggle />)
    
    const icon = screen.getByRole('button').querySelector('i')
    expect(icon).toHaveClass('uil-moon')
  })

  it('shows sun icon in dark theme', () => {
    // Update mock store for dark theme
    mockStore.theme = 'dark'
    mockStore.resolvedTheme = 'dark'
    
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to system theme')
    
    const icon = button.querySelector('i')
    expect(icon).toHaveClass('uil-sun')
    
    // Reset for other tests
    mockStore.theme = 'light'
    mockStore.resolvedTheme = 'light'
  })

  it('shows laptop icon in system theme', () => {
    // Update mock store for system theme
    mockStore.theme = 'system'
    mockStore.resolvedTheme = 'dark'
    
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to light theme')
    
    const icon = button.querySelector('i')
    expect(icon).toHaveClass('uil-laptop')
    
    // Reset for other tests
    mockStore.theme = 'light'
    mockStore.resolvedTheme = 'light'
  })

  it('calls toggleTheme when clicked', async () => {
    const user = userEvent.setup()
    
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(mockToggleTheme).toHaveBeenCalledOnce()
  })
})