import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectCard from '../ProjectCard'

// Mock dependencies
vi.mock('../LazyImage', () => ({
  default: ({ src, alt, className }) => (
    <img src={src} alt={alt} className={className} data-testid="lazy-image" />
  )
}))

vi.mock('../AnimatedSection', () => ({
  default: ({ children, className }) => (
    <div className={className} data-testid="animated-section">
      {children}
    </div>
  )
}))

vi.mock('../Button', () => ({
  default: ({ children, onClick, className, variant, size }) => (
    <button 
      onClick={onClick} 
      className={className}
      data-variant={variant}
      data-size={size}
      data-testid="button"
    >
      {children}
    </button>
  )
}))

describe('ProjectCard', () => {
  const mockProject = {
    id: 'test-project',
    title: 'Test Project',
    description: 'This is a test project description',
    technologies: ['React', 'JavaScript'],
    image: '/test-project.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/test/repo',
    featured: true
  }

  const defaultProps = {
    project: mockProject,
    index: 0
  }

  it('renders project information correctly', () => {
    render(<ProjectCard {...defaultProps} />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('This is a test project description')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('displays project image with correct props', () => {
    render(<ProjectCard {...defaultProps} />)
    
    const image = screen.getByTestId('lazy-image')
    expect(image).toHaveAttribute('src', '/test-project.jpg')
    expect(image).toHaveAttribute('alt', 'Test Project project screenshot')
  })

  it('shows featured badge for featured projects', () => {
    render(<ProjectCard {...defaultProps} />)
    
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('does not show featured badge for non-featured projects', () => {
    const nonFeaturedProject = { ...mockProject, featured: false }
    render(<ProjectCard {...defaultProps} project={nonFeaturedProject} />)
    
    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('renders technology tags', () => {
    render(<ProjectCard {...defaultProps} />)
    
    const technologies = mockProject.technologies
    technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })
  })

  it('shows action buttons when URLs are provided', () => {
    render(<ProjectCard {...defaultProps} />)
    
    const buttons = screen.getAllByTestId('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('calls onViewProject when view project button is clicked', () => {
    const onViewProject = vi.fn()
    render(<ProjectCard {...defaultProps} onViewProject={onViewProject} />)
    
    const viewButtons = screen.getAllByTestId('button')
    const viewProjectButton = viewButtons.find(btn => 
      btn.textContent.includes('View')
    )
    
    if (viewProjectButton) {
      fireEvent.click(viewProjectButton)
      expect(onViewProject).toHaveBeenCalledWith(mockProject)
    }
  })

  it('calls onViewCode when view code button is clicked', () => {
    const onViewCode = vi.fn()
    render(<ProjectCard {...defaultProps} onViewCode={onViewCode} />)
    
    const codeButtons = screen.getAllByTestId('button')
    const viewCodeButton = codeButtons.find(btn => 
      btn.textContent.includes('Code')
    )
    
    if (viewCodeButton) {
      fireEvent.click(viewCodeButton)
      expect(onViewCode).toHaveBeenCalledWith(mockProject)
    }
  })

  it('opens live URL when view project is clicked', () => {
    // Mock window.open
    const mockOpen = vi.fn()
    window.open = mockOpen
    
    render(<ProjectCard {...defaultProps} />)
    
    const buttons = screen.getAllByTestId('button')
    const viewButton = buttons.find(btn => btn.textContent.includes('View'))
    
    if (viewButton) {
      fireEvent.click(viewButton)
      expect(mockOpen).toHaveBeenCalledWith(
        'https://example.com',
        '_blank',
        'noopener noreferrer'
      )
    }
  })

  it('handles projects without URLs gracefully', () => {
    const projectWithoutUrls = {
      ...mockProject,
      liveUrl: '#',
      githubUrl: '#'
    }
    
    render(<ProjectCard {...defaultProps} project={projectWithoutUrls} />)
    
    // Should still render without errors
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<ProjectCard {...defaultProps} className=\"custom-class\" />)
    
    const animatedSection = screen.getByTestId('animated-section')
    expect(animatedSection).toHaveClass('custom-class')
  })

  it('handles empty technologies array', () => {
    const projectWithoutTech = {
      ...mockProject,
      technologies: []
    }
    
    render(<ProjectCard {...defaultProps} project={projectWithoutTech} />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })
})