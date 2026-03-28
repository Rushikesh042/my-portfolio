import { useRef } from 'react'
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal'
import { ABOUT } from '@/data/content'
import './About.css'

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="about__stat glass-card" data-reveal>
      <span className="about__stat-value">{value}</span>
      <span className="about__stat-label">{label}</span>
    </div>
  )
}

function EducationCard({ edu }: { edu: typeof ABOUT.education[0] }) {
  return (
    <div className="about__edu glass-card" data-reveal>
      <div className="about__edu-header">
        <div>
          <h4 className="about__edu-degree">{edu.degree}</h4>
          <p className="about__edu-institution">{edu.institution} · {edu.location}</p>
        </div>
        <div className="about__edu-meta">
          <span className="about__edu-period mono">{edu.period}</span>
          {edu.grade && <span className="about__edu-grade">{edu.grade}</span>}
        </div>
      </div>
      <div className="about__edu-courses">
        {edu.courses.map((c) => (
          <span key={c} className="tag">{c}</span>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const headingRef = useScrollReveal({ y: 20 })
  const statsRef = useStaggerReveal({ stagger: 0.12 }) as React.RefObject<HTMLDivElement>
  const bioRef = useStaggerReveal({ stagger: 0.1 }) as React.RefObject<HTMLDivElement>
  const eduRef = useStaggerReveal({ stagger: 0.15 }) as React.RefObject<HTMLDivElement>

  return (
    <section id="about" className="about section section-alt" aria-labelledby="about-heading">
      <div className="orb orb-2" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div ref={headingRef as React.RefObject<HTMLDivElement>} className="section-header">
          <span className="label-tag">Who I Am</span>
          <h2 id="about-heading" className="section-heading">{ABOUT.heading}</h2>
          <p className="section-subheading">{ABOUT.subheading}</p>
          <div className="divider" />
        </div>

        {/* Stats */}
        <div ref={statsRef} className="about__stats">
          {ABOUT.stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>

        {/* Bio */}
        <div ref={bioRef} className="about__bio">
          {ABOUT.bio.map((para, i) => (
            <p key={i} className="about__bio-para" data-reveal>
              {para}
            </p>
          ))}
        </div>

        {/* Education */}
        <div className="about__edu-section">
          <h3 className="about__edu-title">Education</h3>
          <div ref={eduRef} className="about__edu-list">
            {ABOUT.education.map((edu) => (
              <EducationCard key={edu.degree} edu={edu} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
