import { useEffect, useState } from 'react'
import { debounce, throttle } from '../utils/helpers'
import useAppStore from '../stores/useAppStore'

/**
 * Hook for scroll-based animations and section detection
 */
export const useScrollAnimations = () => {
  const [scrollY, setScrollY] = useState(0)
  const { setActiveSection } = useAppStore()

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY)
      
      // Detect active section
      const sections = document.querySelectorAll('section[id]')
      let activeId = ''
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY - 100
        const sectionBottom = sectionTop + rect.height
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          activeId = section.id
        }
      })
      
      setActiveSection(activeId)
    }, 50)

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])

  return { scrollY }
}

/**
 * Hook for intersection observer animations
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [ref, setRef] = useState(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
        ...options
      }
    )

    observer.observe(ref)

    return () => {
      if (ref) observer.unobserve(ref)
    }
  }, [ref, options])

  return [setRef, isIntersecting]
}

/**
 * Hook for scroll progress tracking
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalHeight) * 100
      setProgress(Math.min(currentProgress, 100))
    }, 50)

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

/**
 * Hook for typewriter effect
 */
export const useTypewriter = (text, speed = 100, delay = 0) => {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!text) return

    setDisplayText('')
    setIsComplete(false)

    const timeout = setTimeout(() => {
      let i = 0
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1))
          i++
        } else {
          setIsComplete(true)
          clearInterval(timer)
        }
      }, speed)

      return () => clearInterval(timer)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return { displayText, isComplete }
}

/**
 * Hook for mouse position tracking
 */
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = debounce((e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }, 10)

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mousePosition
}