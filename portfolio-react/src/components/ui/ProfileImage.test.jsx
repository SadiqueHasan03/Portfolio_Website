import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProfileImage from '../ProfileImage'

// Mock ImageWithFallback component
vi.mock('../ImageWithFallback', () => ({
  default: ({ src, alt, className, fallback, ...props }) => (
    <img
      src={src || fallback}
      alt={alt}
      className={className}
      {...props}
      data-testid="profile-image"
    />
  )
}))

describe('ProfileImage', () => {
  const defaultProps = {
    src: '/profile.jpg',
    alt: 'Profile picture'
  }

  it('renders with default props', () => {
    render(<ProfileImage {...defaultProps} />)
    
    const img = screen.getByTestId('profile-image')
    expect(img).toHaveAttribute('src', '/profile.jpg')
    expect(img).toHaveAttribute('alt', 'Profile picture')
  })

  it('applies correct size classes', () => {
    render(<ProfileImage {...defaultProps} size=\"lg\" />)
    
    const container = screen.getByTestId('profile-image').parentElement
    expect(container.previousElementSibling || container).toHaveClass('w-32', 'h-32')
  })

  it('applies circle shape by default', () => {
    render(<ProfileImage {...defaultProps} />)
    
    const img = screen.getByTestId('profile-image')
    expect(img).toHaveClass('rounded-full')
  })

  it('applies square shape when specified', () => {
    render(<ProfileImage {...defaultProps} shape=\"square\" />)
    
    const img = screen.getByTestId('profile-image')
    expect(img).toHaveClass('rounded-lg')
  })

  it('shows border by default', () => {
    render(<ProfileImage {...defaultProps} />)
    
    const img = screen.getByTestId('profile-image')
    expect(img).toHaveClass('ring-4')
  })

  it('hides border when showBorder is false', () => {
    render(<ProfileImage {...defaultProps} showBorder={false} />)
    
    const img = screen.getByTestId('profile-image')
    expect(img).not.toHaveClass('ring-4')
  })

  it('shows fallback icon when no src provided', () => {
    render(<ProfileImage alt=\"Profile\" />)
    
    // Should render custom fallback div instead of img
    const fallback = screen.getByText('')
    expect(fallback).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<ProfileImage {...defaultProps} className=\"custom-class\" />)
    
    const img = screen.getByTestId('profile-image')
    expect(img).toHaveClass('custom-class')
  })

  it('uses custom fallback icon', () => {
    render(
      <ProfileImage 
        {...defaultProps} 
        fallbackIcon=\"uil uil-camera\"
      />
    )
    
    const img = screen.getByTestId('profile-image')
    expect(img).toBeInTheDocument()
  })

  it('handles different size variants', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl']
    
    sizes.forEach(size => {
      const { unmount } = render(
        <ProfileImage {...defaultProps} size={size} />
      )
      
      const img = screen.getByTestId('profile-image')
      expect(img).toBeInTheDocument()
      
      unmount()
    })
  })

  it('handles different shape variants', () => {
    const shapes = ['circle', 'square', 'rounded']
    
    shapes.forEach(shape => {
      const { unmount } = render(
        <ProfileImage {...defaultProps} shape={shape} />
      )
      
      const img = screen.getByTestId('profile-image')
      expect(img).toBeInTheDocument()
      
      unmount()
    })
  })
})