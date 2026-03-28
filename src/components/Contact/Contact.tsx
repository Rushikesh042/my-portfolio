import { useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { CONTACT, META } from '@/data/content'
import './Contact.css'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const headingRef = useScrollReveal({ y: 20 })
  const leftRef = useScrollReveal({ y: 30, delay: 0.1 }) as React.RefObject<HTMLDivElement>
  const rightRef = useScrollReveal({ y: 30, delay: 0.2 }) as React.RefObject<HTMLDivElement>

  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // Simulate async submission (replace with your preferred service)
    await new Promise((res) => setTimeout(res, 1500))
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-heading">
      <div className="orb orb-1" aria-hidden="true" />

      <div className="container">
        <div ref={headingRef as React.RefObject<HTMLDivElement>} className="section-header">
          <span className="label-tag">Get in Touch</span>
          <h2 id="contact-heading" className="section-heading">{CONTACT.heading}</h2>
          <p className="section-subheading">{CONTACT.subheading}</p>
          <div className="divider" />
        </div>

        <div className="contact__layout">
          {/* Left — info panel */}
          <div ref={leftRef} className="contact__info">
            {/* Availability */}
            <div className="contact__availability" role="status">
              <span className="contact__avail-dot" aria-hidden="true" />
              <span>{CONTACT.availability}</span>
            </div>

            <p className="contact__body">{CONTACT.body}</p>

            {/* Contact links */}
            <div className="contact__links" role="list" aria-label="Contact links">
              {CONTACT.links.map((link) => (
                <a
                  key={link.icon}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact__link glass-card"
                  role="listitem"
                  aria-label={`${link.label}: ${link.value}`}
                >
                  <span className="contact__link-icon" aria-hidden="true">
                    <ContactIcon icon={link.icon} />
                  </span>
                  <div>
                    <span className="contact__link-label">{link.label}</span>
                    <span className="contact__link-value">{link.value}</span>
                  </div>
                  <svg className="contact__link-arrow" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>

            {/* CV download */}
            <a href={META.cvUrl} download className="btn btn-outline contact__cv-btn">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
                <path d="M8 2v9M4 7l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Download CV
            </a>
          </div>

          {/* Right — contact form */}
          <div ref={rightRef} className="contact__form-wrap">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact__form glass-card"
              aria-label="Contact form"
              noValidate
            >
              <div className="contact__form-grid">
                <div className="contact__field">
                  <label htmlFor="name" className="contact__label">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="contact__input"
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                    aria-required="true"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="email" className="contact__label">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="contact__input"
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="subject" className="contact__label">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="contact__input contact__select"
                  required
                  aria-required="true"
                >
                  <option value="">Select a topic…</option>
                  <option value="job-opportunity">Job Opportunity</option>
                  <option value="research-collaboration">Research Collaboration</option>
                  <option value="consulting">AI Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="contact__field">
                <label htmlFor="message" className="contact__label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="contact__input contact__textarea"
                  placeholder="Tell me about your project, role, or idea…"
                  required
                  rows={5}
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary contact__submit ${status === 'sending' ? 'sending' : ''}`}
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <span className="contact__spinner" aria-hidden="true" />
                    Sending…
                  </>
                ) : status === 'success' ? (
                  <>
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
                      <path d="M2 8l4 4 8-8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    {CONTACT.cta}
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
                      <path d="M1 8h11M8 4l4 4-4 4M13.5 1.5l1 6.5-1 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="contact__error" role="alert">
                  Something went wrong. Please try again or email directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact__footer">
        <div className="contact__footer-inner container">
          <span className="contact__footer-name mono">Rushikesh Bodhe</span>
          <span className="contact__footer-sep" aria-hidden="true"> · </span>
          <span className="contact__footer-tagline">Building intelligent systems at scale</span>
          <span className="contact__footer-copy mono">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </section>
  )
}

function ContactIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'email':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    default:
      return null
  }
}
