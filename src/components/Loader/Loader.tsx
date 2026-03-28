import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Loader.css'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const counterRef = useRef({ value: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete,
          })
        },
      })

      // Animate counter and bar
      tl.to(counterRef.current, {
        value: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(counterRef.current.value)
          if (percentRef.current) percentRef.current.textContent = `${v}%`
          if (progressRef.current) progressRef.current.style.width = `${v}%`
        },
      })
      .to({}, { duration: 0.3 }) // brief pause at 100%
    })

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={loaderRef} className="loader" role="status" aria-label="Loading portfolio">
      <div className="loader__inner">
        <div className="loader__logo">
          <svg viewBox="0 0 48 48" fill="none" className="loader__icon">
            <circle cx="24" cy="14" r="5" fill="#6366f1" />
            <circle cx="10" cy="36" r="4" fill="#06b6d4" />
            <circle cx="38" cy="36" r="4" fill="#8b5cf6" />
            <line x1="24" y1="14" x2="10" y2="36" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="24" y1="14" x2="38" y2="36" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="10" y1="36" x2="38" y2="36" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.6" />
          </svg>
          <span className="loader__name">RB</span>
        </div>

        <div className="loader__progress-wrap">
          <div className="loader__progress-track">
            <div ref={progressRef} className="loader__progress-bar" />
          </div>
          <span ref={percentRef} className="loader__percent">0%</span>
        </div>

        <p className="loader__label">Initialising AI Environment</p>
      </div>
    </div>
  )
}
