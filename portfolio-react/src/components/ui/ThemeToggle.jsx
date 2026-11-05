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
        return { icon: 'uil-sun', mode: 'Light', label: 'Switch to dark theme' }
      case 'dark':
        return { icon: 'uil-moon', mode: 'Dark', label: 'Switch to system theme' }
      case 'system':
        return { 
          icon: 'uil-laptop', 
          mode: 'Auto',
          label: 'Switch to light theme' 
        }
      default:
        return { icon: 'uil-sun', mode: 'Light', label: 'Switch to dark theme' }
    }
  }
  
  const { icon, mode, label } = getIconAndLabel()
  
  return (
    <button
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`
        inline-flex items-center gap-2 rounded-full border px-3 py-2
        bg-gray-100/80 dark:bg-gray-800/80
        text-gray-700 dark:text-gray-200
        border-gray-200/80 dark:border-gray-700/80
        hover:bg-gray-200 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        transition-colors duration-200
        disabled:cursor-wait
      `}
      aria-label={label}
      title={`Current theme: ${theme === 'system' ? `Auto (${resolvedTheme})` : mode}`}
    >
      <i className={`uil ${icon} text-lg text-emerald-600 dark:text-emerald-400 transition-transform duration-300 ${
        isTransitioning ? 'rotate-180' : ''
      }`} aria-hidden="true"></i>
      <span className="text-sm font-medium">{mode}</span>
    </button>
  )
}

export default ThemeToggle