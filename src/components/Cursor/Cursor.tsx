import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const posRef = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true)
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(false)
      }
    }

    const animate = () => {
      if (cursorRef.current && followerRef.current) {
        const { x, y } = posRef.current
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`

        const dx = x - followerPos.current.x
        const dy = y - followerPos.current.y
        followerPos.current.x += dx * 0.12
        followerPos.current.y += dy * 0.12

        followerRef.current.style.transform = `translate(${followerPos.current.x}px, ${followerPos.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible])

  return (
    <>
      <div
        ref={cursorRef}
        className={`cursor-dot ${isHovering ? 'hovering' : ''} ${isVisible ? 'visible' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={followerRef}
        className={`cursor-ring ${isHovering ? 'hovering' : ''} ${isVisible ? 'visible' : ''}`}
        aria-hidden="true"
      />
    </>
  )
}
