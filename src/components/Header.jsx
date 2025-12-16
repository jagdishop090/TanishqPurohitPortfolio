import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Header.css'

const Header = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when section changes
    setIsMobileMenuOpen(false)
  }, [activeSection])

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'contact', label: 'CONTACT' }
  ]

  const handleClick = (e, sectionId) => {
    e.preventDefault()
    onNavigate(sectionId)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="header-content">
        {/* Logo on Left */}
        <a href="#home" className="header-logo" onClick={(e) => handleClick(e, 'home')}>
          <span className="logo-text">TANISHQ</span>
          <span className="logo-circle"></span>
        </a>

        {/* Desktop Navigation Bar */}
        <nav className="nav-bar desktop-nav">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Desktop Contact Button */}
        <a href="#contact" className="header-contact-btn desktop-contact" onClick={(e) => handleClick(e, 'contact')}>
          <span>CONTACT</span>
        </a>

        {/* Mobile Hamburger Menu Button */}
        <button 
          className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <motion.div 
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        initial={false}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : '100%'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="mobile-contact-btn" 
            onClick={(e) => handleClick(e, 'contact')}
          >
            CONTACT
          </a>
        </nav>
      </motion.div>
    </motion.header>
  )
}

export default Header
