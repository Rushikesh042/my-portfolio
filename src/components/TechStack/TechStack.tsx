import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal'
import { TECH_STACK } from '@/data/content'
import './TechStack.css'

const CATEGORY_COLORS: Record<string, string> = {
  'Languages': 'var(--clr-secondary)',
  'AI & ML': 'var(--clr-primary)',
  'AWS': 'var(--clr-accent-warm)',
  'MLOps & DevOps': 'var(--clr-accent)',
  'Data Engineering': '#10b981',
}

function CategoryCard({ cat }: { cat: typeof TECH_STACK.categories[0] }) {
  const color = CATEGORY_COLORS[cat.label] ?? 'var(--clr-primary)'

  return (
    <div className="tech-category glass-card" data-reveal>
      <div className="tech-category__header">
        <span
          className="tech-category__dot"
          aria-hidden="true"
          style={{ background: color, boxShadow: `0 0 8px ${color}60` }}
        />
        <h3 className="tech-category__label">{cat.label}</h3>
      </div>
      <div className="tech-category__items" role="list" aria-label={`${cat.label} technologies`}>
        {cat.items.map((item) => (
          <span
            key={item}
            className="tech-item"
            role="listitem"
            style={{ '--item-color': color } as React.CSSProperties}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  const headingRef = useScrollReveal({ y: 20 })
  const gridRef = useStaggerReveal({ stagger: 0.1 }) as React.RefObject<HTMLDivElement>

  return (
    <section id="stack" className="tech-stack section section-alt" aria-labelledby="stack-heading">
      <div className="container">
        <div ref={headingRef as React.RefObject<HTMLDivElement>} className="section-header">
          <span className="label-tag">Tools & Technologies</span>
          <h2 id="stack-heading" className="section-heading">{TECH_STACK.heading}</h2>
          <p className="section-subheading">{TECH_STACK.subheading}</p>
          <div className="divider" />
        </div>

        <div ref={gridRef} className="tech-stack__grid">
          {TECH_STACK.categories.map((cat) => (
            <CategoryCard key={cat.label} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
