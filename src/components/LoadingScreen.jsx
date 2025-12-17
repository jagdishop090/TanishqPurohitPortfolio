import { useState, useEffect } from 'react'
import './LoadingScreen.css'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setShowContent(true)
            setTimeout(() => {
              if (onComplete) onComplete()
            }, 500)
          }, 300)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`loading-screen ${showContent ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="game-icon-container">
          <div className="game-icon">🎮</div>
          <div className="game-particles">
            <span className="particle">👻</span>
            <span className="particle">🐸</span>
            <span className="particle">⭐</span>
            <span className="particle">💫</span>
          </div>
        </div>
        
        <h1 className="loading-title">Bringing Ideas to Life</h1>
        <p className="loading-subtitle">Preparing your portfolio experience</p>
        
        <div className="loading-bar-container">
          <div className="loading-bar">
            <div 
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="loading-percentage">{progress}%</span>
        </div>
        
        <div className="loading-tips">
          <p className="tip-text">💡 Tip: Use arrow keys or WASD to move in the game!</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen

