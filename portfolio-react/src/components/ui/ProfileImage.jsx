import PropTypes from 'prop-types'
import ImageWithFallback from './ImageWithFallback'

/**
 * Profile image component with multiple fallback options
 * Optimized for profile pictures and avatar display
 */
function ProfileImage({
  src,
  alt = 'Profile picture',
  size = 'md',
  shape = 'circle',
  showBorder = true,
  className = '',
  fallbackIcon = 'uil uil-user',
  ...props
}) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
    '2xl': 'w-64 h-64'
  }

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    rounded: 'rounded-xl'
  }

  const borderClasses = showBorder 
    ? 'ring-4 ring-white dark:ring-gray-800 shadow-lg' 
    : ''

  const baseClasses = `${sizeClasses[size]} ${shapeClasses[shape]} ${borderClasses} object-cover ${className}`

  const customFallback = (
    <div className={`${baseClasses} flex items-center justify-center bg-gradient-to-br from-primary-400 to-secondary-400`}>
      <i className={`${fallbackIcon} text-white ${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-4xl' : 'text-6xl'}`}></i>
    </div>
  )

  if (!src) {
    return customFallback
  }

  return (
    <div className="relative inline-block">
      <ImageWithFallback
        src={src}
        alt={alt}
        className={baseClasses}
        fallback="/images/placeholders/user-placeholder.svg"
        {...props}
      />
    </div>
  )
}

ProfileImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
  shape: PropTypes.oneOf(['circle', 'square', 'rounded']),
  showBorder: PropTypes.bool,
  className: PropTypes.string,
  fallbackIcon: PropTypes.string
}

export default ProfileImage