import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test/testUtils.jsx'
import ThemeToggle from './ThemeToggle'

// Mock the store
vi.mock('../../stores/useAppStore', () => ({
  default: vi.fn()
}))

describe('ThemeToggle Component', () => {
  it('renders theme toggle button', () => {
    const mockStore = {
      theme: 'light',
      toggleTheme: vi.fn()
    }
    
    const useAppStore = require('../../stores/useAppStore').default
    useAppStore.mockReturnValue(mockStore)
    
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme')
  })

  it('shows moon icon in light theme', () => {
    const mockStore = {
      theme: 'light',
      toggleTheme: vi.fn()
    }
    
    const useAppStore = require('../../stores/useAppStore').default
    useAppStore.mockReturnValue(mockStore)
    
    renderWithProviders(<ThemeToggle />)
    
    const icon = screen.getByRole('button').querySelector('i')
    expect(icon).toHaveClass('uil-moon')
  })

  it('shows sun icon in dark theme', () => {
    const mockStore = {
      theme: 'dark',
      toggleTheme: vi.fn()
    }
    
    const useAppStore = require('../../stores/useAppStore').default
    useAppStore.mockReturnValue(mockStore)
    
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to light theme')
    
    const icon = button.querySelector('i')
    expect(icon).toHaveClass('uil-sun')
  })

  it('calls toggleTheme when clicked', async () => {
    const user = userEvent.setup()
    const mockToggleTheme = vi.fn()
    const mockStore = {
      theme: 'light',
      toggleTheme: mockToggleTheme
    }
    
    const useAppStore = require('../../stores/useAppStore').default
    useAppStore.mockReturnValue(mockStore)
    
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(mockToggleTheme).toHaveBeenCalledOnce()
  })
})