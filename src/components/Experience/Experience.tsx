import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal'
import { EXPERIENCE, CERTIFICATIONS } from '@/data/content'
import './Experience.css'

function CertBadge({ cert }: { cert: typeof CERTIFICATIONS[0] }) {
  return (
    <div className="cert-badge glass-card" data-reveal>
      <div className="cert-badge__icon" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
          <rect width="40" height="40" rx="10" fill="rgba(245,158,11,0.1)" />
          <path d="M20 8l2.8 8.6H32l-7.4 5.4 2.8 8.6L20 25.1l-7.4 5.5 2.8-8.6L8 16.6h9.2z" fill="#f59e0b" opacity="0.9" />
        </svg>
      </div>
      <div className="cert-badge__body">
        <span className="cert-badge__title">{cert.title}</span>
        <span className="cert-badge__issuer">{cert.issuer}</span>
        <span className="cert-badge__meta mono">
          Issued {cert.issued} · Expires {cert.expires}
        </span>
        <span className="cert-badge__id mono">ID: {cert.validationId.slice(0, 16)}…</span>
      </div>
    </div>
  )
}

export default function Experience() {
  const headingRef = useScrollReveal({ y: 20 })
  const timelineRef = useStaggerReveal({ stagger: 0.15 }) as React.RefObject<HTMLDivElement>
  const certRef = useStaggerReveal({ stagger: 0.12 }) as React.RefObject<HTMLDivElement>

  return (
    <section id="experience" className="experience section section-alt" aria-labelledby="experience-heading">
      <div className="orb orb-2" aria-hidden="true" />

      <div className="container">
        <div ref={headingRef as React.RefObject<HTMLDivElement>} className="section-header">
          <span className="label-tag">Career</span>
          <h2 id="experience-heading" className="section-heading">Experience</h2>
          <p className="section-subheading">3 years building and shipping production ML systems.</p>
          <div className="divider" />
        </div>

        {/* Timeline */}
        <div className="experience__timeline">
          {EXPERIENCE.map((job, i) => (
            <div ref={timelineRef} key={i} className="exp-card glass-card" data-reveal>
              <div className="exp-card__header">
                <div>
                  <h3 className="exp-card__role">{job.role}</h3>
                  <p className="exp-card__company">
                    <span className="exp-card__company-name">{job.company}</span>
                    <span className="exp-card__sep" aria-hidden="true"> · </span>
                    <span className="exp-card__location">{job.location}</span>
                  </p>
                </div>
                <div className="exp-card__meta">
                  <span className="exp-card__period mono">{job.period}</span>
                  <span className="exp-card__type">{job.type}</span>
                </div>
              </div>

              <ul className="exp-card__highlights" aria-label="Key achievements">
                {job.highlights.map((h, j) => (
                  <li key={j} className="exp-card__highlight">
                    <span className="exp-card__bullet" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="exp-card__tags">
                {job.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="experience__certs">
          <h3 className="experience__certs-title">Certifications</h3>
          <div ref={certRef} className="experience__cert-list">
            {CERTIFICATIONS.map((cert) => (
              <CertBadge key={cert.title} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
