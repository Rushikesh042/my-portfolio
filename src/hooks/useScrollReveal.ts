import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Options {
  delay?: number
  duration?: number
  y?: number
  stagger?: number
  once?: boolean
}

// Reveal a single element on scroll
export function useScrollReveal(options: Options = {}) {
  const ref = useRef<HTMLElement>(null)
  const { delay = 0, duration = 0.7, y = 30, once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [delay, duration, y, once])

  return ref
}

// Reveal multiple children with stagger
export function useStaggerReveal(options: Options = {}) {
  const ref = useRef<HTMLElement>(null)
  const { delay = 0, duration = 0.6, y = 25, stagger = 0.1, once = true } = options

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const children = container.querySelectorAll('[data-reveal]')
    if (!children.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [delay, duration, y, stagger, once])

  return ref
}
