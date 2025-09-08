import PropTypes from 'prop-types'
import { useIntersectionObserver } from '../../hooks/useAnimations'

function AnimatedSection({ 
  children, 
  className = '', 
  animation = 'fadeUp',
  delay = 0,
  duration = 600,
  ...props 
}) {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 })

  const animations = {
    fadeUp: {
      initial: 'opacity-0 translate-y-8',
      animate: 'opacity-100 translate-y-0'
    },
    fadeIn: {
      initial: 'opacity-0',
      animate: 'opacity-100'
    },
    fadeLeft: {
      initial: 'opacity-0 -translate-x-8',
      animate: 'opacity-100 translate-x-0'
    },
    fadeRight: {
      initial: 'opacity-0 translate-x-8',
      animate: 'opacity-100 translate-x-0'
    },
    scale: {
      initial: 'opacity-0 scale-95',
      animate: 'opacity-100 scale-100'
    }
  }

  const selectedAnimation = animations[animation] || animations.fadeUp
  
  const animationClass = isIntersecting 
    ? selectedAnimation.animate 
    : selectedAnimation.initial

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${animationClass} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
      {...props}
    >
      {children}
    </div>
  )
}

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  animation: PropTypes.oneOf(['fadeUp', 'fadeIn', 'fadeLeft', 'fadeRight', 'scale']),
  delay: PropTypes.number,
  duration: PropTypes.number
}

export default AnimatedSection;