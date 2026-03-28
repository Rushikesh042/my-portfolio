import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { NAV_LINKS, META } from '@/data/content'
import './Navbar.css'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 2.4 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Scroll behaviour
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        {/* Logo */}
        <a
          href="#"
          className="navbar__logo"
          aria-label="Rushikesh Bodhe — home"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <span className="navbar__logo-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
              <circle cx="16" cy="9" r="4" fill="#6366f1" />
              <circle cx="6" cy="25" r="3" fill="#06b6d4" />
              <circle cx="26" cy="25" r="3" fill="#8b5cf6" />
              <line x1="16" y1="9" x2="6" y2="25" stroke="#6366f1" strokeWidth="1.2" strokeOpacity="0.7" />
              <line x1="16" y1="9" x2="26" y2="25" stroke="#8b5cf6" strokeWidth="1.2" strokeOpacity="0.7" />
              <line x1="6" y1="25" x2="26" y2="25" stroke="#06b6d4" strokeWidth="1.2" strokeOpacity="0.7" />
            </svg>
          </span>
          <span className="navbar__logo-text">
            <span>{META.name.split(' ')[0]}</span>
            <span className="navbar__logo-dot">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`navbar__link ${activeSection === href.slice(1) ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={META.cvUrl}
          download
          className="btn btn-outline navbar__cta"
          aria-label="Download CV"
        >
          <span>CV</span>
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
            <path d="M8 2v9M4 7l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>

        {/* Mobile burger */}
        <button
          className={`navbar__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`navbar__mobile-link ${activeSection === href.slice(1) ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
              tabIndex={menuOpen ? 0 : -1}
            >
              {label}
            </a>
          ))}
          <a
            href={META.cvUrl}
            download
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
            tabIndex={menuOpen ? 0 : -1}
          >
            Download CV
          </a>
        </nav>
      </div>
    </header>
  )
}
