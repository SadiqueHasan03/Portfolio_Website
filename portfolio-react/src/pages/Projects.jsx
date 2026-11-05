import { useState } from 'react'
import { projectsData } from '../data/portfolioData'
import ProjectCard from '../components/ui/ProjectCard'
import AnimatedSection from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'

function Projects() {
  const [filter, setFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(6)

  // Filter projects based on current filter
  const filteredProjects = projectsData.filter(project => {
    if (filter === 'all') return true
    if (filter === 'featured') return project.featured
    return project.technologies.some(tech => 
      tech.toLowerCase().includes(filter.toLowerCase())
    )
  })

  // Get visible projects based on count
  const visibleProjects = filteredProjects.slice(0, visibleCount)

  const filterOptions = [
    { key: 'all', label: 'All Projects', icon: 'uil-apps' },
    { key: 'featured', label: 'Featured', icon: 'uil-star' },
    { key: 'react', label: 'React', icon: 'uil-react' },
    { key: 'javascript', label: 'JavaScript', icon: 'uil-java-script' }
  ]

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  const handleProjectView = (project) => {
    console.log('Viewing project:', project.title)
  }

  const handleCodeView = (project) => {
    console.log('Viewing code for:', project.title)
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection animation="fadeUp" className="mb-10 text-center sm:mb-16">
          <h1 className="mb-3 text-3xl font-bold text-gradient sm:mb-4 sm:text-4xl md:text-5xl">
            Projects Showcase
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400 sm:mb-8 sm:text-base sm:leading-normal">
            Explore my portfolio of web applications, games, and tools. Each project demonstrates different technologies and problem-solving approaches.
          </p>
        </AnimatedSection>

        {/* Filter Buttons */}
        <AnimatedSection animation="fadeUp" delay={200} className="mb-8 sm:mb-12">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {filterOptions.map((option) => (
              <Button
                key={option.key}
                onClick={() => {
                  setFilter(option.key)
                  setVisibleCount(6)
                }}
                variant={filter === option.key ? 'primary' : 'outline'}
                className="min-h-11 px-3 transition-all duration-300 sm:px-4 sm:hover:scale-105"
              >
                <i className={`${option.icon} mr-2`}></i>
                {option.label}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects Count */}
        <AnimatedSection animation="fadeUp" delay={300}>
          <div className="mb-6 text-center sm:mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {visibleProjects.length} of {filteredProjects.length} projects
              {filter !== 'all' && (
                <span className="ml-2 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                  {filter}
                </span>
              )}
            </p>
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        {visibleProjects.length > 0 ? (
          <>
            <div className="mb-10 grid grid-cols-1 gap-5 sm:mb-12 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onViewProject={handleProjectView}
                  onViewCode={handleCodeView}
                />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredProjects.length && (
              <AnimatedSection animation="fadeUp" className="text-center">
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Load More Projects
                  <i className="uil uil-arrow-down ml-2"></i>
                </Button>
              </AnimatedSection>
            )}
          </>
        ) : (
          <AnimatedSection animation="fadeUp" className="text-center py-12">
            <div className="max-w-md mx-auto">
              <i className="uil uil-folder-open text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                No projects match the current filter. Try selecting a different category.
              </p>
              <Button
                onClick={() => {
                  setFilter('all')
                  setVisibleCount(6)
                }}
                variant="outline"
              >
                Show All Projects
              </Button>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  )
}

export default Projects