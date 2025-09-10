import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ImageWithFallback from './ImageWithFallback'

/**
 * Lazy loading image component using Intersection Observer API
 * Only loads images when they enter the viewport
 */
function LazyImage({
  src,
  placeholder = '/images/placeholders/loading.svg',
  threshold = 0.1,
  rootMargin = '50px',
  ...props
}) {
  const [isInView, setIsInView] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    const currentRef = imgRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  return (
    <div ref={imgRef} className={props.className}>
      {shouldLoad ? (
        <ImageWithFallback
          src={src}
          loading="lazy"
          {...props}
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg h-full">
          <img 
            src={placeholder}
            alt="Loading..."
            className="w-16 h-16 opacity-50"
          />
        </div>
      )}
    </div>
  )
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  className: PropTypes.string
}

export default LazyImage