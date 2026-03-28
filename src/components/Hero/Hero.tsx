import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import HeroScene from '../three/HeroScene'
import { HERO, META } from '@/data/content'
import './Hero.css'

// Typewriter for role cycle
function RoleCycle({ roles }: { roles: string[] }) {
  const [current, setCurrent] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = roles[current]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setCurrent((c) => (c + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, current, roles])

  return (
    <span className="hero__role-text" aria-label={roles[current]}>
      {displayed}
      <span className="hero__cursor" aria-hidden="true">|</span>
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.6 })

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(h1Ref.current?.querySelectorAll('.hero__name-word') ?? [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(roleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(summaryRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(statsRef.current?.querySelectorAll('.hero__stat') ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      )
    })
    return () => ctx.revert()
  }, [])

  const handleCTA = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero"
      aria-label="Hero section"
    >
      {/* 3D scene */}
      <HeroScene />

      {/* Ambient gradient */}
      <div className="hero__gradient" aria-hidden="true" />

      {/* Content */}
      <div ref={contentRef} className="hero__content container">
        {/* Badge */}
        <div ref={badgeRef} className="hero__badge" aria-label="AWS Certified Machine Learning Engineer">
          <span className="hero__badge-dot" aria-hidden="true" />
          <span className="mono">AWS Certified ML Engineer</span>
          <span className="hero__badge-sep" aria-hidden="true">·</span>
          <span className="mono">3 Years Exp.</span>
        </div>

        {/* Name */}
        <h1 ref={h1Ref} className="hero__name display-1">
          {'Rushikesh'.split('').map((_, i) => (
            <span key={`f${i}`} className="hero__name-char" aria-hidden="true">{_}</span>
          ))}
          {' '}
          {'Bodhe'.split('').map((_, i) => (
            <span key={`l${i}`} className={`hero__name-char hero__name-char--accent`} aria-hidden="true">{_}</span>
          ))}
          <span className="sr-only">Rushikesh Bodhe</span>
        </h1>

        {/* Role cycle */}
        <div ref={roleRef} className="hero__role" aria-live="polite" aria-atomic="true">
          <span className="hero__role-prefix" aria-hidden="true">I build </span>
          <RoleCycle roles={HERO.roles} />
        </div>

        {/* Summary */}
        <p ref={summaryRef} className="hero__summary">
          {HERO.summary}
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="hero__cta">
          <button
            className="btn btn-primary"
            onClick={() => handleCTA(HERO.cta.primary.href)}
          >
            {HERO.cta.primary.label}
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className="btn btn-outline"
            onClick={() => handleCTA(HERO.cta.secondary.href)}
          >
            {HERO.cta.secondary.label}
          </button>
        </div>

        {/* Social links */}
        <div ref={statsRef} className="hero__socials">
          <a href={META.github} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub profile">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>
          <a href={META.linkedin} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="LinkedIn profile">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <a href={`mailto:${META.email}`} className="hero__social-link" aria-label="Send email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Email</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="hero__scroll" aria-label="Scroll down">
        <div className="hero__scroll-line" aria-hidden="true" />
        <span className="hero__scroll-label mono">scroll</span>
      </div>
    </section>
  )
}
