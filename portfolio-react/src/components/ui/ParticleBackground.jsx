import { useMemo } from 'react'
import { useMousePosition } from '../../hooks/useAnimations'

function ParticleBackground({ particleCount = 50, className = '' }) {
  const mousePosition = useMousePosition()

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      animationDelay: Math.random() * 20,
      animationDuration: Math.random() * 10 + 10
    }))
  }, [particleCount])

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {particles.map((particle) => {
        const mouseInfluence = {
          x: (mousePosition.x / window.innerWidth - 0.5) * 20,
          y: (mousePosition.y / window.innerHeight - 0.5) * 20
        }

        return (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
              transform: `translate(${mouseInfluence.x * 0.1}px, ${mouseInfluence.y * 0.1}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="animate-pulse w-full h-full bg-current rounded-full" />
          </div>
        )
      })}
    </div>
  )
}

export default ParticleBackground;