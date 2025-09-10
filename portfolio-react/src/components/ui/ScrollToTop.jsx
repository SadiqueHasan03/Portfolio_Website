import { useState, useEffect, useRef } from 'react'
import { throttle } from '../../utils/helpers'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const buttonRef = useRef(null)
  const scrollThreshold = 300
  const animationDuration = 800

  // Throttled scroll handler for better performance
  const handleScroll = throttle(() => {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
    setIsVisible(currentScrollY > scrollThreshold)
  }, 16) // ~60fps

  useEffect(() => {
    // Initial check
    handleScroll()
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    if (isScrolling) return // Prevent multiple simultaneous scrolls
    
    setIsScrolling(true)
    
    // Enhanced smooth scroll with custom easing
    const startY = window.pageYOffset || document.documentElement.scrollTop
    const targetY = 0
    const startTime = performance.now()
    
    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3)
    }
    
    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / animationDuration, 1)
      const easedProgress = easeOutCubic(progress)
      
      const currentY = startY - (startY - targetY) * easedProgress
      window.scrollTo(0, currentY)
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        setIsScrolling(false)
      }
    }
    
    requestAnimationFrame(animateScroll)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      scrollToTop()
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      disabled={isScrolling}
      className={`
        fixed right-6 bottom-6 z-50 p-4 
        bg-gradient-to-r from-primary-500 to-primary-600 
        hover:from-primary-600 hover:to-primary-700 
        focus:from-primary-600 focus:to-primary-700
        disabled:from-primary-400 disabled:to-primary-500
        text-white rounded-full 
        shadow-xl hover:shadow-2xl 
        transform transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-primary-500/30
        group
        ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-16 scale-95 pointer-events-none'
        }
        ${
          isScrolling
            ? 'animate-pulse cursor-not-allowed'
            : 'hover:scale-110 active:scale-95 cursor-pointer'
        }
      `}
      aria-label={isScrolling ? 'Scrolling to top...' : 'Scroll to top'}
      title={isScrolling ? 'Scrolling to top...' : 'Scroll to top'}
    >
      <div className="relative">
        <i 
          className={`
            uil uil-arrow-up text-xl transition-transform duration-300
            ${
              isScrolling 
                ? 'animate-bounce' 
                : 'group-hover:-translate-y-0.5 group-active:translate-y-0'
            }
          `}
        ></i>
        
        {/* Loading indicator */}
        {isScrolling && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-20 bg-white transition-opacity duration-200"></div>
    </button>
  )
}

export default ScrollToTop;