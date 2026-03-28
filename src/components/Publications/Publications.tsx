import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal'
import { PUBLICATIONS, AWARDS } from '@/data/content'
import './Publications.css'

function PublicationCard({ pub, index }: { pub: typeof PUBLICATIONS[0]; index: number }) {
  return (
    <a
      href={pub.link}
      target="_blank"
      rel="noopener noreferrer"
      className="pub-card glass-card"
      data-reveal
      aria-label={`Read publication: ${pub.title}`}
    >
      <div className="pub-card__type-badge" data-type={pub.type}>
        {pub.type}
      </div>
      <div className="pub-card__number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className="pub-card__title">{pub.title}</h3>
      <p className="pub-card__venue">{pub.venue}</p>
      <div className="pub-card__footer">
        <span className="pub-card__date mono">{pub.date}</span>
        <span className="pub-card__arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </a>
  )
}

function AwardItem({ award }: { award: typeof AWARDS[0] }) {
  const isFirst = award.icon === 'trophy'

  return (
    <div className="award-item glass-card" data-reveal>
      <div className={`award-item__icon ${isFirst ? 'gold' : 'bronze'}`} aria-hidden="true">
        {isFirst ? (
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
          </svg>
        )}
      </div>
      <div className="award-item__body">
        <span className="award-item__title">{award.title}</span>
        <span className="award-item__event">{award.event}</span>
      </div>
      <span className="award-item__date mono">{award.date}</span>
    </div>
  )
}

export default function Publications() {
  const headingRef = useScrollReveal({ y: 20 })
  const pubsRef = useStaggerReveal({ stagger: 0.1 }) as React.RefObject<HTMLDivElement>
  const awardsRef = useStaggerReveal({ stagger: 0.1 }) as React.RefObject<HTMLDivElement>

  return (
    <section id="research" className="publications section" aria-labelledby="research-heading">
      <div className="orb orb-2" aria-hidden="true" />

      <div className="container">
        <div ref={headingRef as React.RefObject<HTMLDivElement>} className="section-header">
          <span className="label-tag">Research & Recognition</span>
          <h2 id="research-heading" className="section-heading">Publications & Achievements</h2>
          <p className="section-subheading">5 peer-reviewed papers across IEEE, Springer, and international conferences.</p>
          <div className="divider" />
        </div>

        {/* Publications */}
        <div ref={pubsRef} className="publications__grid">
          {PUBLICATIONS.map((p, i) => (
            <PublicationCard key={p.title} pub={p} index={i} />
          ))}
        </div>

        {/* Awards */}
        <div className="publications__awards">
          <h3 className="publications__awards-title">Awards & Recognition</h3>
          <div ref={awardsRef} className="publications__awards-list">
            {AWARDS.map((a) => (
              <AwardItem key={a.title} award={a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
