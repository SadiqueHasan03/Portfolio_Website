import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * Image component with fallback handling and loading states
 * Provides graceful degradation when images fail to load
 */
function ImageWithFallback({
  src,
  fallback = '/images/placeholders/project-placeholder.svg',
  alt = '',
  className = '',
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}) {
  const [imageSrc, setImageSrc] = useState(src)
  const [imageStatus, setImageStatus] = useState('loading') // loading, loaded, error
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    setImageSrc(src)
    setImageStatus('loading')
    setShowFallback(false)
  }, [src])

  const handleImageLoad = (event) => {
    setImageStatus('loaded')
    onLoad?.(event)
  }

  const handleImageError = (event) => {
    if (imageSrc !== fallback) {
      // Try fallback image
      setImageSrc(fallback)
      setImageStatus('loading')
    } else {
      // Fallback also failed, show placeholder
      setImageStatus('error')
      setShowFallback(true)
    }
    onError?.(event)
  }

  if (showFallback) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}
        {...props}
      >
        <div className="text-center p-4">
          <i className="uil uil-image text-4xl text-gray-400 mb-2"></i>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Image not available
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {imageStatus === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`transition-opacity duration-300 ${
          imageStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  )
}

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  fallback: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  onLoad: PropTypes.func,
  onError: PropTypes.func
}

export default ImageWithFallback