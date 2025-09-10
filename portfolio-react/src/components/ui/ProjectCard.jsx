import PropTypes from 'prop-types'
import Button from './Button'
import LazyImage from './LazyImage'
import AnimatedSection from './AnimatedSection'

/**
 * Enhanced project card component with image handling
 * Displays project information with optimized image loading
 */
function ProjectCard({
  project,
  index = 0,
  className = '',
  onViewProject,
  onViewCode
}) {
  const {
    id,
    title,
    description,
    technologies = [],
    image,
    liveUrl,
    githubUrl,
    featured = false
  } = project

  const handleViewProject = () => {
    if (liveUrl && liveUrl !== '#') {
      window.open(liveUrl, '_blank', 'noopener noreferrer')
    }
    onViewProject?.(project)
  }

  const handleViewCode = () => {
    if (githubUrl && githubUrl !== '#') {
      window.open(githubUrl, '_blank', 'noopener noreferrer')
    }
    onViewCode?.(project)
  }

  return (
    <AnimatedSection
      animation="fadeUp"
      delay={index * 200}
      className={`group ${className}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600">
        {/* Project Image */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <LazyImage
            src={image}
            alt={`${title} project screenshot`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            fallback="/images/placeholders/project-placeholder.svg"
          />
          
          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              <i className="uil uil-star mr-1"></i>
              Featured
            </div>
          )}
          
          {/* Overlay with links */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
            {liveUrl && liveUrl !== '#' && (
              <Button
                onClick={handleViewProject}
                size="sm"
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                <i className="uil uil-external-link-alt mr-2"></i>
                View Live
              </Button>
            )}
            {githubUrl && githubUrl !== '#' && (
              <Button
                onClick={handleViewCode}
                variant="secondary"
                size="sm"
                className="bg-gray-800 text-white hover:bg-gray-700"
              >
                <i className="uil uil-github mr-2"></i>
                Code
              </Button>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {description}
          </p>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {liveUrl && liveUrl !== '#' && (
              <Button
                onClick={handleViewProject}
                size="sm"
                className="flex-1"
              >
                <i className="uil uil-external-link-alt mr-2"></i>
                View Project
              </Button>
            )}
            {githubUrl && githubUrl !== '#' && (
              <Button
                onClick={handleViewCode}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <i className="uil uil-github mr-2"></i>
                View Code
              </Button>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    liveUrl: PropTypes.string,
    githubUrl: PropTypes.string,
    featured: PropTypes.bool
  }).isRequired,
  index: PropTypes.number,
  className: PropTypes.string,
  onViewProject: PropTypes.func,
  onViewCode: PropTypes.func
}

export default ProjectCard