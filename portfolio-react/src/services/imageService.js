/**
 * Image handling service with validation, optimization, and fallback management
 */

class ImageService {
  constructor() {
    this.cache = new Map()
    this.observers = new Map()
  }

  /**
   * Check if an image URL is accessible
   * @param {string} url - Image URL to validate
   * @returns {Promise<boolean>} - True if image loads successfully
   */
  async validateImage(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url)
    }

    try {
      const result = await new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = url
      })
      
      this.cache.set(url, result)
      return result
    } catch {
      this.cache.set(url, false)
      return false
    }
  }

  /**
   * Get optimal image source with fallback chain
   * @param {Object} config - Image configuration
   * @returns {Promise<string>} - Best available image URL
   */
  async getOptimalSource(config) {
    const { src, fallback, placeholder } = config
    
    // Try primary source
    if (src && await this.validateImage(src)) {
      return src
    }

    // Try fallback
    if (fallback && await this.validateImage(fallback)) {
      return fallback
    }

    // Return placeholder
    return placeholder || '/images/placeholders/project-placeholder.svg'
  }

  /**
   * Preload critical images
   * @param {string[]} urls - Array of image URLs to preload
   */
  preloadImages(urls) {
    urls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
    })
  }

  /**
   * Setup intersection observer for lazy loading
   * @param {HTMLElement} element - Element to observe
   * @param {Function} callback - Callback when element is in view
   * @param {Object} options - Intersection observer options
   */
  setupLazyLoading(element, callback, options = {}) {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    }

    const observerOptions = { ...defaultOptions, ...options }
    
    if (!this.observers.has(JSON.stringify(observerOptions))) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry.target)
            observer.unobserve(entry.target)
          }
        })
      }, observerOptions)

      this.observers.set(JSON.stringify(observerOptions), observer)
    }

    const observer = this.observers.get(JSON.stringify(observerOptions))
    observer.observe(element)

    return () => observer.unobserve(element)
  }

  /**
   * Generate responsive image srcset
   * @param {string} baseSrc - Base image URL
   * @param {number[]} sizes - Array of width sizes
   * @returns {string} - Srcset string
   */
  generateSrcSet(baseSrc, sizes = [320, 640, 960, 1280]) {
    if (!baseSrc || baseSrc.startsWith('/images/placeholders/')) {
      return ''
    }

    return sizes
      .map(size => `${this.getResizedUrl(baseSrc, size)} ${size}w`)
      .join(', ')
  }

  /**
   * Get resized image URL (placeholder for CDN integration)
   * @param {string} src - Original image URL
   * @param {number} width - Target width
   * @returns {string} - Resized image URL
   */
  getResizedUrl(src, width) {
    // For now, return original URL
    // In production, this would integrate with image CDN
    return src
  }

  /**
   * Generate blur placeholder from image
   * @param {string} src - Image source URL
   * @returns {Promise<string>} - Base64 blur placeholder
   */
  async generateBlurPlaceholder(src) {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      return new Promise((resolve) => {
        img.onload = () => {
          canvas.width = 10
          canvas.height = 10
          ctx.filter = 'blur(5px)'
          ctx.drawImage(img, 0, 0, 10, 10)
          resolve(canvas.toDataURL())
        }
        img.onerror = () => resolve('')
        img.crossOrigin = 'anonymous'
        img.src = src
      })
    } catch {
      return ''
    }
  }

  /**
   * Clear image cache
   */
  clearCache() {
    this.cache.clear()
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache statistics
   */
  getCacheStats() {
    const total = this.cache.size
    const successful = Array.from(this.cache.values()).filter(Boolean).length
    const failed = total - successful

    return {
      total,
      successful,
      failed,
      hitRate: total > 0 ? (successful / total * 100).toFixed(2) + '%' : '0%'
    }
  }
}

// Create singleton instance
const imageService = new ImageService()

export default imageService
export { ImageService }