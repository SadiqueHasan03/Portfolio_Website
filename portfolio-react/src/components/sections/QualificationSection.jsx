import useAppStore from '../../stores/useAppStore'
import { qualificationData } from '../../data/portfolioData'
import Card from '../ui/Card'

function QualificationSection() {
  const { activeQualificationTab, setActiveQualificationTab } = useAppStore()

  const tabs = [
    { id: 'education', label: 'Education', icon: 'uil-graduation-cap' },
    { id: 'projects', label: 'Projects', icon: 'uil-briefcase-alt' }
  ]

  return (
    <section id="qualification" className="section-padding">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Qualification
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
          My personal journey
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveQualificationTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                  activeQualificationTab === tab.id
                    ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary-500'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`transition-all duration-300 ${
                activeQualificationTab === tab.id
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 absolute pointer-events-none'
              }`}
            >
              {activeQualificationTab === tab.id && (
                <div className="space-y-8">
                  {qualificationData[tab.id].map((item, index) => (
                    <div key={index} className="relative">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {/* Content - Left side for odd indices, right for even */}
                        <div className={`md:col-span-1 ${
                          index % 2 === 0 ? 'md:order-1' : 'md:order-3'
                        }`}>
                          <Card className="text-center md:text-left">
                            <h3 className="font-semibold text-lg mb-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                              {item.subtitle}
                            </p>
                            <div className="flex items-center justify-center md:justify-start text-gray-500 dark:text-gray-500 text-sm">
                              <i className="uil uil-calendar-alt mr-2"></i>
                              {item.period}
                            </div>
                          </Card>
                        </div>

                        {/* Timeline */}
                        <div className="md:col-span-1 flex justify-center order-2">
                          <div className="flex flex-col items-center">
                            <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                            {index < qualificationData[tab.id].length - 1 && (
                              <div className="w-px h-24 bg-primary-200 dark:bg-primary-800 mt-2"></div>
                            )}
                          </div>
                        </div>

                        {/* Empty space for alignment */}
                        <div className={`md:col-span-1 hidden md:block ${
                          index % 2 === 0 ? 'md:order-3' : 'md:order-1'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QualificationSection;