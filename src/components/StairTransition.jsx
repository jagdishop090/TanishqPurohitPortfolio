import { useEffect, useRef, useState } from 'react'
import './StairTransition.css'

const StairTransition = ({ isActive, nextPath, onComplete }) => {
  const [stairs, setStairs] = useState([])
  const containerRef = useRef(null)
  const hasAnimatedRef = useRef(false)
  const isAnimatingRef = useRef(false)
  const animationRef = useRef(null)
  const timeoutRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  
  // Update ref when callback changes
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    // Create 5 stairs
    const stairElements = []
    for (let i = 0; i < 5; i++) {
      stairElements.push(i)
    }
    setStairs(stairElements)
  }, [])

  useEffect(() => {
    if (!isActive || !nextPath || !window.gsap || stairs.length === 0) {
      // Hide stairs when not active
      if (containerRef.current) {
        containerRef.current.classList.remove('active')
      }
      isAnimatingRef.current = false
      return
    }

    // Prevent double animation
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    const stairElements = containerRef.current?.querySelectorAll('.stair')
    if (!stairElements || stairElements.length === 0) {
      isAnimatingRef.current = false
      return
    }

    // Show stairs container
    if (containerRef.current) {
      containerRef.current.classList.add('active')
    }

    // Kill any existing animation
    if (animationRef.current) {
      window.gsap.killTweensOf(stairElements)
      animationRef.current = null
    }

    // Reset stairs position before animating with hardware acceleration
    window.gsap.set(stairElements, { 
      y: '100%',
      force3D: true,
      transformOrigin: 'center center'
    })

    // Animate stairs down with optimized settings
    animationRef.current = window.gsap.to(stairElements, {
      y: '0%',
      duration: 0.8,
      stagger: {
        amount: 0.5,
        from: 'start',
        ease: 'power2.out'
      },
      ease: 'power3.inOut',
      force3D: true,
      lazy: false,
      onComplete: () => {
        if (onCompleteRef.current && nextPath) {
          onCompleteRef.current(nextPath)
        }
        // Reverse animation after a brief moment
        timeoutRef.current = setTimeout(() => {
          animationRef.current = window.gsap.to(stairElements, {
            y: '100%',
            duration: 0.8,
            stagger: {
              amount: 0.5,
              from: 'end',
              ease: 'power2.in'
            },
            ease: 'power3.inOut',
            force3D: true,
            lazy: false,
            onComplete: () => {
              // Hide stairs container after animation completes
              if (containerRef.current) {
                containerRef.current.classList.remove('active')
              }
              isAnimatingRef.current = false
              animationRef.current = null
            }
          })
        }, 50)
      }
    })
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        window.gsap.killTweensOf(stairElements)
        animationRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      isAnimatingRef.current = false
    }
  }, [isActive, nextPath, stairs.length])

  // Reverse animation on mount (initial load)
  useEffect(() => {
    if (stairs.length > 0 && window.gsap && !hasAnimatedRef.current) {
      const stairElements = containerRef.current?.querySelectorAll('.stair')
      if (stairElements && stairElements.length > 0) {
        hasAnimatedRef.current = true
        window.gsap.fromTo(
          stairElements,
          { 
            y: '0%',
            force3D: true
          },
          {
            y: '100%',
            duration: 0.8,
            stagger: {
              amount: 0.5,
              from: 'end',
              ease: 'power2.in'
            },
            ease: 'power3.inOut',
            force3D: true,
            lazy: false
          }
        )
      }
    }
  }, [stairs.length])

  return (
    <div 
      id="stairs" 
      ref={containerRef}
      className={isActive ? 'active' : ''}
    >
      {stairs.map((_, i) => (
        <div 
          key={i} 
          className="stair"
          style={{ top: `${i * 20}%` }}
        />
      ))}
    </div>
  )
}

export default StairTransition
