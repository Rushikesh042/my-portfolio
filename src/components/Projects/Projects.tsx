import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal'
import { PROJECTS } from '@/data/content'
import './Projects.css'

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <article className="project-card glass-card" data-reveal aria-labelledby={`proj-${project.id}`}>
      {/* Top accent bar */}
      <div className="project-card__accent" aria-hidden="true" />

      <div className="project-card__body">
        <h3 id={`proj-${project.id}`} className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
        <p className="project-card__desc">{project.description}</p>

        {/* Metrics */}
        <div className="project-card__metrics" role="list" aria-label="Key metrics">
          {project.metrics.map((m) => (
            <span key={m} className="project-card__metric" role="listitem">
              <span className="project-card__metric-icon" aria-hidden="true">▲</span>
              {m}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="project-card__tags" role="list" aria-label="Technologies used">
          {project.tags.map((t) => (
            <span key={t} className="tag" role="listitem">{t}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const headingRef = useScrollReveal({ y: 20 })
  const gridRef = useStaggerReveal({ stagger: 0.15 }) as React.RefObject<HTMLDivElement>

  return (
    <section id="projects" className="projects section" aria-labelledby="projects-heading">
      <div className="orb orb-1" aria-hidden="true" />

      <div className="container">
        <div ref={headingRef as React.RefObject<HTMLDivElement>} className="section-header">
          <span className="label-tag">Portfolio</span>
          <h2 id="projects-heading" className="section-heading">Featured Projects</h2>
          <p className="section-subheading">Research-driven ML engineering across vision, language, and biosignals.</p>
          <div className="divider" />
        </div>

        <div ref={gridRef} className="projects__grid">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
