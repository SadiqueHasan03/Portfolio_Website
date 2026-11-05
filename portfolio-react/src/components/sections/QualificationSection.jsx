import useAppStore from '../../stores/useAppStore'
import { qualificationData } from '../../data/portfolioData'
import AnimatedSection from '../ui/AnimatedSection'

const tabs = [
  { id: 'experience', label: 'Experience & projects', icon: 'uil-briefcase-alt' },
  { id: 'education', label: 'Education', icon: 'uil-graduation-cap' }
]

function QualificationSection() {
  const { activeQualificationTab, setActiveQualificationTab } = useAppStore()
  const activeTab = tabs.some((tab) => tab.id === activeQualificationTab)
    ? activeQualificationTab
    : 'experience'
  const activeItems = qualificationData[activeTab]

  const handleTabKeyDown = (event, currentTab) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === currentTab)
    let nextIndex

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    } else {
      return
    }

    event.preventDefault()
    const nextTab = tabs[nextIndex]
    setActiveQualificationTab(nextTab.id)
    document.getElementById(`qualification-tab-${nextTab.id}`)?.focus()
  }

  return (
    <section id="qualification" className="section-padding qualification-section" aria-labelledby="qualification-heading">
      <div className="container-custom">
        <AnimatedSection animation="fadeUp" className="qualification-heading">
          <p className="qualification-eyebrow"><span /> The journey so far</p>
          <div className="qualification-heading-row">
            <div>
              <h2 id="qualification-heading">
                Experience that <span>keeps me growing.</span>
              </h2>
              <p>
                A snapshot of the work, projects, and education behind my engineering journey.
              </p>
            </div>
            <div className="qualification-period-count">
              <strong>{String(activeItems.length).padStart(2, '0')}</strong>
              <span>{activeTab === 'education' ? 'education milestones' : 'career milestones'}</span>
            </div>
          </div>
        </AnimatedSection>

        <div className="qualification-tabs" role="tablist" aria-label="Qualification categories">
          {tabs.map((tab) => {
            const selected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                id={`qualification-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="qualification-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveQualificationTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
                className={`qualification-tab${selected ? ' is-active' : ''}`}
              >
                <i className={`uil ${tab.icon}`} aria-hidden="true"></i>
                <span>{tab.label}</span>
                <span className="qualification-tab-count">
                  {String(qualificationData[tab.id].length).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </div>

        <div
          id="qualification-panel"
          className="qualification-timeline"
          role="tabpanel"
          aria-labelledby={`qualification-tab-${activeTab}`}
          tabIndex={0}
        >
          {activeItems.map((item, index) => (
            <AnimatedSection
              key={`${activeTab}-${item.title}`}
              animation="fadeUp"
              delay={index * 100}
              className="qualification-entry"
            >
              <div className="qualification-marker" aria-hidden="true">
                <span><i className={`uil ${item.icon || (activeTab === 'education' ? 'uil-graduation-cap' : 'uil-briefcase-alt')}`}></i></span>
              </div>

              <article className="qualification-card">
                <div className="qualification-card-top">
                  <span className="qualification-type">{item.type || tabs.find((tab) => tab.id === activeTab)?.label}</span>
                  <span className="qualification-period">
                    <i className="uil uil-calendar-alt" aria-hidden="true"></i>
                    {item.period}
                  </span>
                </div>

                <h3>{item.title}</h3>
                <p className="qualification-subtitle">{item.subtitle}</p>

                {item.location && (
                  <p className="qualification-location">
                    <i className="uil uil-map-marker" aria-hidden="true"></i>
                    {item.location}
                  </p>
                )}

                {item.highlights?.length > 0 && (
                  <ul className="qualification-highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>
                        <i className="uil uil-check-circle" aria-hidden="true"></i>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.technologies?.length > 0 && (
                  <ul className="qualification-tags" aria-label="Technologies and focus">
                    {item.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                )}
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QualificationSection
