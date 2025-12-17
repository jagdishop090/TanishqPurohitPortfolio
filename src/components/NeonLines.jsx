import { memo } from 'react'
import './NeonLines.css'

const NeonLines = memo(() => {
  return (
    <div className="neon-lines-container">
      <svg
        className="neon-lines-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glow3" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glow4" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glow5" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glow6" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#00ff88" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff0088" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff0088" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff0088" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ccff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#00ccff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00ccff" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff88ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff88ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff88ff" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        
        {/* Lines covering full screen height */}
        <path
          d="M-10,10 Q20,5 40,10 T80,10 T120,10"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="0.3"
          filter="url(#glow1)"
          className="neon-path path-1"
        />
        <path
          d="M-10,25 Q25,15 50,25 T100,25 T150,25"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="0.3"
          filter="url(#glow2)"
          className="neon-path path-2"
        />
        <path
          d="M-10,40 Q30,20 60,40 T120,40 T180,40"
          fill="none"
          stroke="url(#gradient3)"
          strokeWidth="0.3"
          filter="url(#glow3)"
          className="neon-path path-3"
        />
        <path
          d="M-10,55 Q35,25 70,55 T140,55 T210,55"
          fill="none"
          stroke="url(#gradient4)"
          strokeWidth="0.3"
          filter="url(#glow4)"
          className="neon-path path-4"
        />
        <path
          d="M-10,70 Q40,30 80,70 T160,70 T240,70"
          fill="none"
          stroke="url(#gradient5)"
          strokeWidth="0.3"
          filter="url(#glow5)"
          className="neon-path path-5"
        />
        <path
          d="M-10,85 Q45,35 90,85 T180,85 T270,85"
          fill="none"
          stroke="url(#gradient6)"
          strokeWidth="0.3"
          filter="url(#glow6)"
          className="neon-path path-6"
        />
      </svg>
    </div>
  )
})

NeonLines.displayName = 'NeonLines'

export default NeonLines

