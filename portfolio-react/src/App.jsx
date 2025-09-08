import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react'
import useAppStore from './stores/useAppStore'
import { useScrollAnimations } from './hooks/useAnimations'
import { initPerformanceOptimizations } from './utils/performance'
import Layout from './components/layout/Layout'
import AppRoutes from './components/layout/AppRoutes'

function App() {
  const { theme } = useAppStore()
  
  // Initialize scroll animations
  useScrollAnimations()

  // Apply theme to document element and initialize performance optimizations
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Initialize performance optimizations
    initPerformanceOptimizations()
  }, [theme])

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'dark' : ''
      }`}>
        <Layout>
          <AppRoutes />
        </Layout>
      </div>
    </Router>
  )
}

export default App
