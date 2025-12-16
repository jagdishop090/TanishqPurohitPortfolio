import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import './MobilePopup.css'

const MobilePopup = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => {
      setIsVisible(true)
      setIsDismissed(false)
    }
  }))

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    
    if (isMobile) {
      // Check if user has dismissed it before (using localStorage)
      const dismissed = localStorage.getItem('mobilePopupDismissed')
      if (!dismissed) {
        // Show popup after a short delay
        setTimeout(() => {
          setIsVisible(true)
        }, 1000)
      }
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('mobilePopupDismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="mobile-popup-overlay" onClick={handleDismiss}>
      <div className="mobile-popup" onClick={(e) => e.stopPropagation()}>
        <button className="mobile-popup-close" onClick={handleDismiss} aria-label="Close">
          ×
        </button>
        <div className="mobile-popup-content">
          <h3 className="mobile-popup-title">View on Desktop</h3>
          <p className="mobile-popup-message">
            For the best experience and to see the full potential of this portfolio, please check it out on a desktop device.
          </p>
          <button className="mobile-popup-button" onClick={handleDismiss}>
            Got it
          </button>
        </div>
      </div>
    </div>
  )
})

MobilePopup.displayName = 'MobilePopup'

export default MobilePopup

