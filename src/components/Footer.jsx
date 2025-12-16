import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="footer-content">
        <p className="footer-text">
          © {currentYear} Tanishq Purohit. All rights reserved.
        </p>
        <p className="footer-license">
          Licensed - All rights reserved to Tanishq Purohit
        </p>
      </div>
    </motion.footer>
  )
}

export default Footer

