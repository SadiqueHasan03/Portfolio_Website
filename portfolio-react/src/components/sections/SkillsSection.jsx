import { useState } from 'react'
import { skillsData } from '../../data/portfolioData'
import AnimatedSection from '../ui/AnimatedSection'

function SkillIcon({ skill }) {
  const [iconUnavailable, setIconUnavailable] = useState(false)
  const iconUrl = skill.icon

  if (!iconUrl || iconUnavailable) {
    return <i className={`uil ${skill.fallbackIcon}`} aria-hidden="true"></i>
  }

  return (
    <img
      src={iconUrl}
      alt=""
      className="skill-chip-image"
      onError={() => setIconUnavailable(true)}
    />
  )
}

function SkillsSection() {
  const categories = Object.entries(skillsData)
  const totalSkills = categories.reduce((total, [, category]) => total + category.skills.length, 0)

  return (
    <section id="skills" className="section-padding skills-section" aria-labelledby="skills-heading">
      <div className="container-custom">
        <AnimatedSection animation="fadeUp" className="skills-heading">
          <p className="skills-eyebrow"><span /> The toolkit</p>
          <div className="skills-heading-row">
            <div>
              <h2 id="skills-heading">
                Skills for building <span>reliable products.</span>
              </h2>
              <p className="skills-intro">
                From backend services and data systems to the tools that help ship and support them.
              </p>
            </div>
            <div className="skills-total" aria-label={`${totalSkills} skills across ${categories.length} categories`}>
              <strong>{totalSkills}</strong>
              <span>skills across<br />{categories.length} areas</span>
            </div>
          </div>
        </AnimatedSection>

        <div className="skills-grid">
          {categories.map(([key, category], index) => (
            <AnimatedSection
              key={key}
              animation="fadeUp"
              delay={Math.min(index * 70, 280)}
              className="skills-card-wrap"
            >
              <article className="skills-category-card" aria-labelledby={`skills-${key}`}>
                <div className="skills-card-heading">
                  <span className="skills-category-icon">
                    <i className={`uil ${category.icon}`} aria-hidden="true"></i>
                  </span>
                  <span className="skills-category-count">
                    {String(category.skills.length).padStart(2, '0')}
                  </span>
                </div>

                <h3 id={`skills-${key}`}>{category.title}</h3>
                <p className="skills-category-description">{category.description}</p>

                <ul className="skills-chip-list">
                  {category.skills.map((skill) => (
                    <li key={skill.name} className="skill-chip">
                      <span className="skill-chip-icon">
                        <SkillIcon skill={skill} />
                      </span>
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
