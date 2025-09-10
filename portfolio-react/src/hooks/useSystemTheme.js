import { useEffect } from 'react'
import useAppStore from '../stores/useAppStore'

export const useSystemTheme = () => {
  const { theme, updateResolvedTheme } = useAppStore()
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = (e) => {
      if (theme === 'system') {
        updateResolvedTheme(e.matches ? 'dark' : 'light')
      }
    }
    
    // Set initial resolved theme
    if (theme === 'system') {
      updateResolvedTheme(mediaQuery.matches ? 'dark' : 'light')
    } else {
      updateResolvedTheme(theme)
    }
    
    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme, updateResolvedTheme])
}

export default useSystemTheme