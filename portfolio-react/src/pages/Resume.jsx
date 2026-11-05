import { personalInfo, qualificationData, skillsData } from '../data/portfolioData'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const CV_PATH = '/assets/documents/Sadique_Hasan_CV.pdf'
const resumeHighlights = [
  'Java and Spring Boot backend development',
  'Responsive web apps with React and modern UI practices',
  'Strong problem-solving foundation with 70+ DSA solutions',
  'Building products with practical business-minded thinking'
]

function Resume() {
  const handleDownloadCV = () => {
    window.open(CV_PATH, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Resume</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Software Engineer with a strong foundation in backend systems, product thinking, and modern web development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {personalInfo.description}
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><strong>Name:</strong> {personalInfo.name}</li>
              <li><strong>Location:</strong> {personalInfo.location}</li>
              <li><strong>Email:</strong> {personalInfo.email}</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4">Why Hire Me</h2>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              {resumeHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-primary-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Core Skills</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.values(skillsData)
              .flatMap((category) => category.skills)
              .map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full"
                >
                  {skill.name}
                </span>
              ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Education</h2>
          <div className="space-y-4">
            {qualificationData.education.map((item, index) => (
              <Card key={`${item.title}-${index}`} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.subtitle}</p>
                </div>
                <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">{item.period}</span>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Experience Highlights</h2>
          <div className="space-y-4">
            {qualificationData.experience.map((item, index) => (
              <Card key={`${item.title}-${index}`} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.subtitle}</p>
                </div>
                <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">{item.period}</span>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button onClick={handleDownloadCV}>
            Download CV <i className="uil uil-download-alt ml-2"></i>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Resume