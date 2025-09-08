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
        
        console.log('Performance Metrics:', metrics)
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
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        resolve(lastEntry.startTime)
      }).observe({ entryTypes: ['largest-contentful-paint'] })
    })
  },

  // Get First Input Delay
  getFirstInputDelay() {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const firstInput = list.getEntries()[0]
        if (firstInput) {
          const fid = firstInput.processingStart - firstInput.startTime
          resolve(fid)
        }
      }).observe({ entryTypes: ['first-input'] })
    })
  },

  // Get Cumulative Layout Shift
  getCumulativeLayoutShift() {
    return new Promise((resolve) => {
      let clsValue = 0
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        }
        resolve(clsValue)
      }).observe({ entryTypes: ['layout-shift'] })
    })
  }
}

/**
 * Image optimization utilities
 */
export const imageOptimization = {
  // Lazy load images
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src
            img.classList.remove('lazy')
            observer.unobserve(img)
          }
        })
      })

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })
    }
  },

  // Preload critical images
  preloadCriticalImages(imagePaths) {
    imagePaths.forEach(path => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = path
      document.head.appendChild(link)
    })
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
    if (process.env.NODE_ENV === 'development') {
      // This would integrate with bundle analyzer tools
      console.log('Bundle analysis would run here in development mode')
    }
  },

  // Detect unused modules
  detectUnusedModules() {
    // Implementation would depend on build tools
    console.log('Unused module detection would run here')
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