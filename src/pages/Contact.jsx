import { motion } from 'framer-motion'
import './Contact.css'

const Contact = () => {
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
    hidden: { opacity: 0, y: 20 },
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
      className="contact"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="contact-container">
        <motion.h1 className="page-title" variants={itemVariants}>
          Contact
        </motion.h1>

        <motion.div className="contact-card" variants={itemVariants}>
          <div className="contact-item">
            <div className="contact-label">Phone</div>
            <a href="tel:917916550" className="contact-value">
              917916550
            </a>
          </div>
          <div className="contact-item">
            <div className="contact-label">Email</div>
            <a href="mailto:tanishqpurohit1205@gmail.com" className="contact-value">
              tanishqpurohit1205@gmail.com
            </a>
          </div>
          <div className="contact-item">
            <div className="contact-label">GitHub</div>
            <a href="https://github.com/jagdishop090" target="_blank" rel="noopener noreferrer" className="contact-value">
              jagdishop090
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact
