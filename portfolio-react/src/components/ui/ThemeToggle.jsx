import { useState } from 'react'
import useAppStore from '../../stores/useAppStore'

function ThemeToggle() {
  const { theme, toggleTheme, resolvedTheme } = useAppStore()
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const handleToggle = async () => {
    setIsTransitioning(true)
    
    // Smooth transition effect
    document.documentElement.style.transition = 'all 0.3s ease-in-out'
    
    toggleTheme()
    
    // Reset transition after completion
    setTimeout(() => {
      setIsTransitioning(false)
      document.documentElement.style.transition = ''
    }, 300)
  }
  
  const getIconAndLabel = () => {
    switch (theme) {
      case 'light':
        return { icon: 'uil-moon', label: 'Switch to dark theme' }
      case 'dark':
        return { icon: 'uil-sun', label: 'Switch to system theme' }
      case 'system':
        return { 
          icon: 'uil-laptop', 
          label: 'Switch to light theme' 
        }
      default:
        return { icon: 'uil-moon', label: 'Switch to dark theme' }
    }
  }
  
  const { icon, label } = getIconAndLabel()
  
  return (
    <button
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`
        relative p-3 rounded-xl
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        border border-gray-200 dark:border-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        transition-all duration-300 hover:scale-105
        ${isTransitioning ? 'animate-pulse' : ''}
      `}
      aria-label={label}
    >
      <i className={`${icon} text-xl transition-transform duration-300 ${
        isTransitioning ? 'rotate-180' : ''
      }`}></i>
      
      {/* Theme indicator */}
      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 opacity-75"></span>
      
      {/* Current theme indicator text for accessibility */}
      <span className="sr-only">
        Current theme: {theme} {theme === 'system' ? `(${resolvedTheme})` : ''}
      </span>
    </button>
  )
}

export default ThemeToggle