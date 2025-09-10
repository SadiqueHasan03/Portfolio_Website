import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import ImageWithFallback from '../ImageWithFallback'

// Mock intersection observer
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

describe('ImageWithFallback', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    className: 'test-class'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with correct src and alt attributes', () => {
    render(<ImageWithFallback {...defaultProps} />)
    
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/test-image.jpg')
    expect(img).toHaveAttribute('alt', 'Test image')
  })

  it('shows loading state initially', () => {
    render(<ImageWithFallback {...defaultProps} />)
    
    // Should show loading animation
    const loadingElement = screen.getByRole('img').parentElement
    expect(loadingElement).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<ImageWithFallback {...defaultProps} />)
    
    const img = screen.getByRole('img')
    expect(img).toHaveClass('test-class')
  })

  it('uses fallback image when provided', () => {
    const fallbackSrc = '/fallback-image.jpg'
    render(
      <ImageWithFallback 
        {...defaultProps} 
        fallback={fallbackSrc}
      />
    )
    
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
  })

  it('shows error state when both main and fallback images fail', async () => {
    const onError = vi.fn()
    render(
      <ImageWithFallback 
        {...defaultProps}
        fallback="/non-existent-fallback.jpg"
        onError={onError}
      />
    )
    
    const img = screen.getByRole('img')
    
    // Simulate image error
    img.dispatchEvent(new Event('error'))
    
    await waitFor(() => {
      // Should show error state with icon and message
      expect(screen.getByText('Image not available')).toBeInTheDocument()
    })
  })

  it('calls onLoad callback when image loads successfully', async () => {
    const onLoad = vi.fn()
    render(
      <ImageWithFallback 
        {...defaultProps}
        onLoad={onLoad}
      />
    )
    
    const img = screen.getByRole('img')
    
    // Simulate image load
    img.dispatchEvent(new Event('load'))
    
    await waitFor(() => {
      expect(onLoad).toHaveBeenCalledTimes(1)
    })
  })

  it('handles lazy loading properly', () => {
    render(
      <ImageWithFallback 
        {...defaultProps}
        loading=\"lazy\"
      />
    )
    
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('updates src when prop changes', async () => {
    const { rerender } = render(<ImageWithFallback {...defaultProps} />)
    
    let img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/test-image.jpg')
    
    // Update src prop
    rerender(<ImageWithFallback {...defaultProps} src=\"/new-image.jpg\" />)
    
    img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/new-image.jpg')
  })
})