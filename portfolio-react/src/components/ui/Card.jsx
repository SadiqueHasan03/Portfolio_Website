import PropTypes from 'prop-types'
import { CardPropTypes } from '../../utils/propTypes'

function Card({ 
  children, 
  className = '', 
  variant = 'default', 
  padding = 'md',
  ...props 
}) {
  const baseClass = 'rounded-lg transition-all duration-300'
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl',
    glass: 'bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 shadow-xl',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 shadow-lg'
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

Card.propTypes = CardPropTypes

export default Card;