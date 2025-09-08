import PropTypes from 'prop-types'

// PropTypes for personal info
export const PersonalInfoPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  socialLinks: PropTypes.shape({
    linkedin: PropTypes.string,
    github: PropTypes.string,
    instagram: PropTypes.string
  }).isRequired
})

// PropTypes for skills
export const SkillPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired
})

export const SkillCategoryPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(SkillPropTypes).isRequired
})

// PropTypes for qualification items
export const QualificationItemPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired
})

// PropTypes for projects
export const ProjectPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  liveUrl: PropTypes.string,
  githubUrl: PropTypes.string,
  featured: PropTypes.bool
})

// PropTypes for navigation items
export const NavigationItemPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
})

// Common component PropTypes
export const ButtonPropTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
}

export const CardPropTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'glass', 'gradient']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg'])
}

export const ModalPropTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string
}