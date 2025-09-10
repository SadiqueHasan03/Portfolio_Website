import PropTypes from 'prop-types'

/**
 * Customizable image placeholder component
 * Used as fallback when images fail to load
 */
function ImagePlaceholder({
  type = 'default',
  size = 'md',
  className = '',
  message = 'Image not available',
  showMessage = true,
  icon,
  gradient = false
}) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64',
    full: 'w-full h-full'
  }

  const typeConfig = {
    default: {
      icon: 'uil uil-image',
      bgClass: 'bg-gray-100 dark:bg-gray-800',
      iconColor: 'text-gray-400'
    },
    profile: {
      icon: 'uil uil-user',
      bgClass: 'bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900',
      iconColor: 'text-primary-600 dark:text-primary-400'
    },
    project: {
      icon: 'uil uil-scenery',
      bgClass: 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    gallery: {
      icon: 'uil uil-images',
      bgClass: 'bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900',
      iconColor: 'text-green-600 dark:text-green-400'
    }
  }

  const config = typeConfig[type] || typeConfig.default
  const iconClass = icon || config.icon
  const backgroundClass = gradient ? config.bgClass : 'bg-gray-100 dark:bg-gray-800'

  const iconSizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
    full: 'text-8xl'
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${backgroundClass}
        flex flex-col items-center justify-center 
        rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600
        ${className}
      `}
    >
      <i 
        className={`
          ${iconClass} 
          ${iconSizeClasses[size]} 
          ${config.iconColor} 
          mb-2
        `}
      ></i>
      
      {showMessage && message && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center px-2">
          {message}
        </p>
      )}
    </div>
  )
}

ImagePlaceholder.propTypes = {
  type: PropTypes.oneOf(['default', 'profile', 'project', 'gallery']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  className: PropTypes.string,
  message: PropTypes.string,
  showMessage: PropTypes.bool,
  icon: PropTypes.string,
  gradient: PropTypes.bool
}

export default ImagePlaceholder