import { useState, useEffect } from 'react'
import './FloatingWarning.css'

const FloatingWarning = ({ onShowPopup }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    
    if (isMobile) {
      // Show after a delay
      setTimeout(() => {
        setIsVisible(true)
      }, 2000)
    }
  }, [])

  const handleClick = () => {
    if (onShowPopup) {
      onShowPopup()
    }
  }

  if (!isVisible) return null

  return (
    <button 
      className="floating-warning"
      onClick={handleClick}
      aria-label="View on desktop"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default FloatingWarning

