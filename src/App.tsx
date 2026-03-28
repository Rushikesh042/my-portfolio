import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import Cursor from './components/Cursor/Cursor'
import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import WhatIDo from './components/WhatIDo/WhatIDo'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import TechStack from './components/TechStack/TechStack'
import Publications from './components/Publications/Publications'
import Contact from './components/Contact/Contact'

// Styles
import './styles/globals.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  const handleLoaderComplete = () => {
    setLoaded(true)
    // Trigger ScrollTrigger refresh after DOM is fully settled
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }

  // Smooth scroll via Lenis (optional progressive enhancement)
  useEffect(() => {
    if (!loaded) return

    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        }) as unknown as { raf: (time: number) => void; destroy: () => void }

        const raf = (time: number) => {
          lenis!.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch {
        // Lenis not critical — fall back silently
      }
    }

    initLenis()
    return () => { lenis?.destroy() }
  }, [loaded])

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Loading screen */}
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Main app */}
      <div
        className={`app ${loaded ? 'app--visible' : 'app--hidden'}`}
        aria-hidden={!loaded}
      >
        <Navbar />

        <main id="main-content">
          <Hero />
          <About />
          <WhatIDo />
          <Experience />
          <Projects />
          <TechStack />
          <Publications />
          <Contact />
        </main>
      </div>
    </>
  )
}
