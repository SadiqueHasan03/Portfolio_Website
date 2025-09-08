import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingSpinner from '../ui/LoadingSpinner'

// Lazy load pages for code splitting
const Home = lazy(() => import('../../pages/Home'))
const Projects = lazy(() => import('../../pages/Projects'))
const Contact = lazy(() => import('../../pages/Contact'))
const Resume = lazy(() => import('../../pages/Resume'))

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes;