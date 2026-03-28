import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal'
import { WHAT_I_DO } from '@/data/content'
import './WhatIDo.css'

const ICONS: Record<string, JSX.Element> = {
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.96-3 2.5 2.5 0 0 1-1.32-3.97A3 3 0 0 1 5 7.5a2.5 2.5 0 0 1 4.5-5z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.96-3 2.5 2.5 0 0 0 1.32-3.97A3 3 0 0 0 19 7.5a2.5 2.5 0 0 0-4.5-5z" />
    </svg>
  ),
  pipeline: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <rect x="2" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="8" width="6" height="6" rx="1" />
      <rect x="16" y="3" width="6" height="6" rx="1" />
      <path d="M5 9v6M19 9v6M8 11h1M15 11h1M5 15v2h14v-2" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
    </svg>
  ),
  research: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
    </svg>
  ),
  vision: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
}

function ServiceCard({ service }: { service: typeof WHAT_I_DO.services[0] }) {
  return (
    <div className="service-card glass-card" data-reveal>
      <div className="service-card__icon" aria-hidden="true">
        {ICONS[service.icon]}
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <div className="service-card__glow" aria-hidden="true" />
    </div>
  )
}

export default function WhatIDo() {
  const headingRef = useScrollReveal({ y: 20 })
  const gridRef = useStaggerReveal({ stagger: 0.1 }) as React.RefObject<HTMLDivElement>

  return (
    <section id="what-i-do" className="what-i-do section" aria-labelledby="what-i-do-heading">
      <div className="orb orb-1" aria-hidden="true" />

      <div className="container">
        <div ref={headingRef as React.RefObject<HTMLDivElement>} className="section-header">
          <span className="label-tag">Capabilities</span>
          <h2 id="what-i-do-heading" className="section-heading">{WHAT_I_DO.heading}</h2>
          <p className="section-subheading">{WHAT_I_DO.subheading}</p>
          <div className="divider" />
        </div>

        <div ref={gridRef} className="what-i-do__grid">
          {WHAT_I_DO.services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
