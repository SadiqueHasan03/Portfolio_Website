import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect, Suspense } from 'react'
import useAppStore from './stores/useAppStore'
import { useSystemTheme } from './hooks/useSystemTheme'
import { useScrollAnimations } from './hooks/useAnimations'
import { initPerformanceOptimizations } from './utils/performance'
import Layout from './components/layout/Layout'
import AppRoutes from './components/layout/AppRoutes'
import LoadingSpinner from './components/ui/LoadingSpinner'

function App() {
  const { initializeTheme, resolvedTheme } = useAppStore()
  
  // Initialize theme and system detection
  useSystemTheme()
  useScrollAnimations()

  useEffect(() => {
    // Initialize theme on app startup
    initializeTheme()
    
    // Initialize performance optimizations
    initPerformanceOptimizations()
  }, [initializeTheme])

  // Apply theme to document element with smooth transition
  useEffect(() => {
    const root = document.documentElement
    
    // Remove any existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add the resolved theme class
    root.classList.add(resolvedTheme)
    
    // Update meta theme-color for browser chrome
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        resolvedTheme === 'dark' ? '#0f172a' : '#ffffff'
      )
    }
    
    // Prevent flash of wrong theme
    root.style.colorScheme = resolvedTheme
    
  }, [resolvedTheme])

  return (
    <Router>
      <div className={`
        min-h-screen 
        bg-gray-50 dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
        ${resolvedTheme === 'dark' ? 'dark' : ''}
      `}>
        <Suspense fallback={<LoadingSpinner />}>
          <Layout>
            <AppRoutes />
          </Layout>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
