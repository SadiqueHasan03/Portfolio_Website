import PropTypes from 'prop-types'

function Card({ 
  children, 
  className = '', 
  variant = 'default', 
  padding = 'md',
  glassMorphism = false,
  ...props 
}) {
  const baseClass = 'rounded-lg transition-all duration-300'
  
  // Use glass morphism effect if specified
  if (glassMorphism) {
    const glassClasses = 'glass-effect'
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }
    
    return (
      <div className={`${baseClass} ${glassClasses} ${paddings[padding]} ${className}`} {...props}>
        {children}
      </div>
    )
  }
  
  const variants = {
    default: 'card-base',
    glass: 'glass-effect',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 shadow-lg',
    elevated: 'card-base hover:shadow-lg hover:-translate-y-1'
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const classes = `${baseClass} ${variants[variant]} ${paddings[padding]} ${className}`
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'glass', 'gradient', 'elevated']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  glassMorphism: PropTypes.bool,
}

export default Card