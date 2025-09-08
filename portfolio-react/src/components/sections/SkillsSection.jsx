import useAppStore from '../../stores/useAppStore'
import { skillsData } from '../../data/portfolioData'
import Card from '../ui/Card'

function SkillsSection() {
  const { openSkillSections, toggleSkillSection } = useAppStore()

  const isOpen = (section) => openSkillSections.includes(section)

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Skills
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
          My technical level
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(skillsData).map(([key, category]) => (
            <Card key={key} className="transition-all duration-300 hover:shadow-xl">
              <button
                onClick={() => toggleSkillSection(key)}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <div className="flex items-center space-x-4">
                  <i className={`uil ${category.icon} text-2xl text-primary-500`}></i>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <i className={`uil uil-angle-down text-xl transition-transform duration-300 ${
                  isOpen(key) ? 'rotate-180' : ''
                }`}></i>
              </button>

              <div className={`transition-all duration-300 overflow-hidden ${
                isOpen(key) ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: isOpen(key) ? `${skill.percentage}%` : '0%',
                            transitionDelay: `${index * 200}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection;