/**
 * Performance monitoring and optimization utilities
 */

/**
 * Measure and log performance metrics
 */
export const performanceMonitor = {
  // Core Web Vitals measurement
  measureWebVitals() {
    if ('web-vital' in window) {
      // This would integrate with web-vitals library
      // For now, we'll use basic Performance API
      this.measureNavigationTiming()
    }
  },

  // Measure navigation timing
  measureNavigationTiming() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0]
      
      if (navigation) {
        const metrics = {
          firstContentfulPaint: this.getFirstContentfulPaint(),
          largestContentfulPaint: this.getLargestContentfulPaint(),
          firstInputDelay: this.getFirstInputDelay(),
          cumulativeLayoutShift: this.getCumulativeLayoutShift(),
          timeToInteractive: navigation.loadEventEnd - navigation.fetchStart
        }
        
        if (import.meta.env.DEV) {
          console.log('Performance Metrics:', metrics)
        }
        return metrics
      }
    }
  },

  // Get First Contentful Paint
  getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint')
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
    return fcp ? fcp.startTime : null
  },

  // Get Largest Contentful Paint
  getLargestContentfulPaint() {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.startTime)
        }).observe({ entryTypes: ['largest-contentful-paint'] })
      } else {
        // Fallback for browsers without PerformanceObserver
        resolve(null)
      }
    })
  },

  // Get First Input Delay
  getFirstInputDelay() {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        new PerformanceObserver((list) => {
          const firstInput = list.getEntries()[0]
          if (firstInput) {
            const fid = firstInput.processingStart - firstInput.startTime
            resolve(fid)
          }
        }).observe({ entryTypes: ['first-input'] })
      } else {
        // Fallback for browsers without PerformanceObserver
        resolve(null)
      }
    })
  },

  // Get Cumulative Layout Shift
  getCumulativeLayoutShift() {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          }
          resolve(clsValue)
        }).observe({ entryTypes: ['layout-shift'] })
      } else {
        // Fallback for browsers without PerformanceObserver
        resolve(null)
      }
    })
  }
}

/**
 * Enhanced image optimization utilities
 */
export const imageOptimization = {
  // Lazy load images with intersection observer
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.classList.remove('lazy')
              img.classList.add('fade-in')
              observer.unobserve(img)
            }
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      })

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })

      return imageObserver
    }
  },

  // Preload critical images
  preloadCriticalImages(imagePaths) {
    const criticalImages = [
      '/images/profile/perfil.png',
      '/images/profile/about.jpg',
      ...imagePaths
    ]

    criticalImages.forEach(path => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = path
      document.head.appendChild(link)
    })
  },

  // Optimize image loading based on connection speed
  getOptimalImageQuality() {
    if ('connection' in navigator) {
      const connection = navigator.connection
      const effectiveType = connection.effectiveType
      
      switch (effectiveType) {
        case 'slow-2g':
        case '2g':
          return 'low'
        case '3g':
          return 'medium'
        case '4g':
        default:
          return 'high'
      }
    }
    return 'high'
  },

  // Check if image format is supported
  supportsWebP() {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    return canvas.toDataURL('image/webp').indexOf('webp') > 0
  },

  // Generate responsive image URLs
  generateResponsiveUrl(baseUrl, width, quality = 'auto') {
    // This would integrate with a CDN service like Cloudinary
    // For now, return the original URL
    return baseUrl
  },

  // Monitor image loading performance
  trackImagePerformance(imageSrc, loadTime) {
    if ('performance' in window) {
      performance.mark(`image-load-${imageSrc}-${Date.now()}`)
      
      // Log slow loading images
      if (loadTime > 3000) {
        console.warn(`Slow image loading detected: ${imageSrc} took ${loadTime}ms`)
      }
    }
  }
}

/**
 * Resource preloading
 */
export const resourcePreloader = {
  // Preload critical resources
  preloadCriticalResources() {
    // Preload fonts
    this.preloadFonts([
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
    ])

    // Preload critical CSS
    this.preloadCSS([
      'https://unicons.iconscout.com/release/v4.0.8/css/line.css'
    ])
  },

  // Preload fonts
  preloadFonts(fontUrls) {
    fontUrls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'style'
      link.href = url
      document.head.appendChild(link)
    })
  },

  // Preload CSS
  preloadCSS(cssUrls) {
    cssUrls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'style'
      link.href = url
      document.head.appendChild(link)
    })
  }
}

/**
 * Bundle analysis utilities
 */
export const bundleAnalyzer = {
  // Analyze bundle size in development
  analyzeBundleSize() {
    if (import.meta.env.DEV) {
      // This would integrate with bundle analyzer tools
      console.log('Bundle analysis would run here in development mode')
    }
  },

  // Detect unused modules
  detectUnusedModules() {
    if (import.meta.env.DEV) {
      // Implementation would depend on build tools
      console.log('Unused module detection would run here')
    }
  }
}

/**
 * Initialize performance optimizations
 */
export const initPerformanceOptimizations = () => {
  // Setup performance monitoring
  performanceMonitor.measureWebVitals()
  
  // Setup image lazy loading
  imageOptimization.setupLazyLoading()
  
  // Preload critical resources
  resourcePreloader.preloadCriticalResources()
  
  // Setup bundle analysis in development
  bundleAnalyzer.analyzeBundleSize()
}