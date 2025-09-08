import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test/testUtils.jsx'
import Button from './Button'

describe('Button Component', () => {
  it('renders with children', () => {
    renderWithProviders(<Button>Click me</Button>)
    
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    renderWithProviders(
      <Button onClick={handleClick}>Click me</Button>
    )
    
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('applies correct variant classes', () => {
    const { rerender } = renderWithProviders(
      <Button variant="primary">Primary</Button>
    )
    
    let button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary-500')
    
    rerender(<Button variant="secondary">Secondary</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-secondary-500')
    
    rerender(<Button variant="outline">Outline</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('border-primary-500')
  })

  it('applies correct size classes', () => {
    const { rerender } = renderWithProviders(
      <Button size="sm">Small</Button>
    )
    
    let button = screen.getByRole('button')
    expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm')
    
    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('px-6', 'py-3', 'text-base')
  })

  it('disables button when disabled prop is true', () => {
    renderWithProviders(
      <Button disabled>Disabled</Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('renders with correct button type', () => {
    renderWithProviders(
      <Button type="submit">Submit</Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })
})