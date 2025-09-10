/**
 * Enhanced navigation utilities for cross-page navigation and hash handling
 */

import { smoothScrollTo } from './helpers'

/**
 * Parse URL hash and extract section ID
 */
export const parseUrlHash = (url) => {
  try {
    const urlObj = new URL(url, window.location.origin)
    return urlObj.hash ? urlObj.hash.substring(1) : null
  } catch {
    const hashIndex = url.indexOf('#')
    return hashIndex !== -1 ? url.substring(hashIndex + 1) : null
  }
}

/**
 * Sanitize section ID to prevent XSS
 */
export const sanitizeSectionId = (sectionId) => {
  if (!sectionId || typeof sectionId !== 'string') return ''
  return sectionId.replace(/[^a-zA-Z0-9-_]/g, '')
}

/**
 * Check if a section exists on the page
 */
export const sectionExists = (sectionId) => {
  if (!sectionId) return false
  const sanitizedId = sanitizeSectionId(sectionId)
  return !!document.getElementById(sanitizedId)
}

/**
 * Handle hash-based navigation with cross-page support
 */
export const navigateToSection = async (targetUrl, navigate, options = {}) => {
  const { offset = 80, delay = 100, fallbackToTop = true } = options

  try {
    const sectionId = parseUrlHash(targetUrl)
    const basePath = targetUrl.split('#')[0] || '/'
    const currentPath = window.location.pathname
    
    const sanitizedSectionId = sanitizeSectionId(sectionId)
    
    if (!sanitizedSectionId) {
      if (basePath !== currentPath) {
        navigate(basePath)
      }
      return true
    }

    // If we're on the same page
    if (basePath === currentPath || (basePath === '/' && currentPath === '/')) {
      return scrollToSection(sanitizedSectionId, offset, fallbackToTop)
    }

    // Navigate to different page with hash
    navigate(basePath)
    
    // Wait and then scroll
    setTimeout(() => {
      scrollToSection(sanitizedSectionId, offset, fallbackToTop)
    }, delay)
    
    return true
  } catch (error) {
    console.error('Navigation error:', error)
    return false
  }
}

/**
 * Scroll to a specific section with error handling
 */
export const scrollToSection = (sectionId, offset = 80, fallbackToTop = true) => {
  if (!sectionId) {
    if (fallbackToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return true
    }
    return false
  }

  const sanitizedId = sanitizeSectionId(sectionId)
  
  if (sectionExists(sanitizedId)) {
    return smoothScrollTo(sanitizedId, offset)
  } else {
    console.warn(`Section "${sanitizedId}" not found on page`)
    
    if (fallbackToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return true
    }
    
    return false
  }
}

/**
 * Handle hash changes in URL (for direct access via URL)
 */
export const handleHashChange = (setActiveSection, offset = 80) => {
  const handleHash = () => {
    const hash = window.location.hash
    if (hash) {
      const sectionId = hash.substring(1)
      const sanitizedId = sanitizeSectionId(sectionId)
      
      if (sanitizedId && sectionExists(sanitizedId)) {
        setTimeout(() => {
          if (scrollToSection(sanitizedId, offset)) {
            setActiveSection?.(sanitizedId)
          }
        }, 100)
      }
    }
  }

  handleHash()
  window.addEventListener('hashchange', handleHash)
  
  return () => {
    window.removeEventListener('hashchange', handleHash)
  }
}