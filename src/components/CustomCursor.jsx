import { useEffect, useState, useRef, memo } from 'react'
import './CustomCursor.css'

const CustomCursor = memo(() => {
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef(null)
  const rafRef = useRef(null)
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    // Only show custom cursor on devices that support hover (desktop)
    if (window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    const updateCursor = (e) => {
      // Throttle updates using requestAnimationFrame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        const now = performance.now()
        // Throttle to ~60fps
        if (now - lastUpdateRef.current < 16) return
        lastUpdateRef.current = now

        if (cursorRef.current) {
          const offset = 8
          // Use transform for better performance
          cursorRef.current.style.transform = `translate(${e.clientX - offset}px, ${e.clientY - offset}px)`
        }
        setIsVisible(true)
      })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', updateCursor, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isVisible ? 'visible' : ''}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-svg"
      >
        {/* Main cursor shape - fully black */}
        <path
          d="M4 4L13.43 26.63L16.77 16.77L26.63 13.43L4 4Z"
          fill="#000000"
          stroke="#000000"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
})

CustomCursor.displayName = 'CustomCursor'

export default CustomCursor

