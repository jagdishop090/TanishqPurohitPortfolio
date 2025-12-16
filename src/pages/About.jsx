import { motion } from 'framer-motion'
import ShooterGame from '../components/ShooterGame'
import './About.css'

const About = ({ isAnimated, onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      className="about"
      variants={containerVariants}
      initial="hidden"
      animate={isAnimated !== false ? "visible" : "hidden"}
    >
      <div className="about-container">
        <div className="about-content">
          {/* Left Side */}
          <motion.div className="about-left" variants={itemVariants}>
            <h1 className="about-title">
              Designed by Curiosity
            </h1>
            <p className="about-description">
              I focus on how things feel, flow, and function — not just how they look.
            </p>
            <button 
              className="about-cta-button"
              onClick={() => onNavigate && onNavigate('contact')}
            >
              <span>CONTACT ME</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>

          {/* Right Side - Skills Grid */}
          <motion.div className="about-right" variants={itemVariants}>
            <div className="skills-grid">
              <div className="skill-stat">
                <span className="stat-number">92%</span>
                <span className="stat-label">Design</span>
              </div>
              <div className="skill-stat">
                <span className="stat-number">88%</span>
                <span className="stat-label">Development</span>
              </div>
              <div className="skill-stat">
                <span className="stat-number">90%</span>
                <span className="stat-label">UX Research</span>
              </div>
              <div className="skill-stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Game Design</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Process Section */}
        <motion.div className="about-process" variants={itemVariants}>
          <div className="process-content">
            <div className="process-text">
              <h2 className="process-title">Simple Game Mechanics</h2>
              <p className="process-subtitle">A basic game demo showcasing simple mechanics — nothing fancy, just fundamental gameplay elements.</p>
              
              <div className="process-steps">
                <div className="process-step">
                  <h3 className="step-title">BASIC CONTROLS</h3>
                  <p className="step-desc">Simple movement and interaction mechanics — move, jump, and shoot. Straightforward and functional.</p>
                </div>
                <div className="process-step">
                  <h3 className="step-title">MINIMAL GRAPHICS</h3>
                  <p className="step-desc">Using emojis and basic shapes — no complex graphics or animations, just simple visual elements.</p>
                </div>
                <div className="process-step">
                  <h3 className="step-title">CORE FUNCTIONALITY</h3>
                  <p className="step-desc">Focusing on making things work — collision detection, enemy spawning, and basic game logic.</p>
                </div>
              </div>
            </div>
            <div className="process-image">
              <ShooterGame />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default About
