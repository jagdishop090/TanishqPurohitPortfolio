import { motion } from 'framer-motion'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      id: 1,
      number: '01',
      year: '2025',
      category: 'Web Development',
      type: 'CRM & Inventory Management',
      title: 'AI-Powered CRM & Inventory Management System',
      description: 'Ventory - A fully functional CRM and inventory management software featuring comprehensive business management tools with AI integration for intelligent insights, automated workflows, and predictive analytics. Includes customer relationship management, inventory tracking, sales analytics, and advanced reporting capabilities.',
      image: '/crm-logo.png'
    },
    {
      id: 2,
      number: '02',
      year: '2024',
      category: 'Game Development',
      type: '3D Horror Game',
      title: 'Wada 1729',
      description: 'Wada 1729 - A 3D horror game beta version based on Pune\'s historic Shaniwar Wada. An immersive horror experience set in the iconic historical monument, featuring atmospheric environments, spine-chilling gameplay, and authentic architectural details. Currently under active development.',
      image: '/wada-1729.png'
    },
    {
      id: 3,
      number: '03',
      year: '2025',
      category: 'Design',
      type: 'UI/UX & Graphic Design',
      title: 'Design Portfolio Collection',
      description: 'A curated collection of basic and immersive UI/UX designs, logo designs, and graphic design work. Showcasing creative solutions, modern interfaces, and visual identity designs. Drive link available for detailed portfolio review.',
      image: '/designkit.png'
    }
  ]

  // Simplified animations for mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0 : 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      className="projects"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="projects-container">
        <div className="projects-header">
          <motion.h1 className="projects-label" variants={itemVariants}>
            PROJECTS
          </motion.h1>
          <motion.h2 className="projects-title" variants={itemVariants}>
            Designs That Blend<br />Creativity & Function
          </motion.h2>
        </div>

        <motion.p className="projects-description" variants={itemVariants}>
          These projects serve as a showcase of my skills and capabilities. While I've worked on numerous projects that remain confidential, these examples should provide sufficient insight into my design and development expertise.
        </motion.p>

        <div className="projects-cards-wrapper">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card project-card-${index + 1}`}
              variants={itemVariants}
              style={{ zIndex: projects.length - index }}
            >
              <div className="project-card-content">
                <div className="project-left">
                  <div className="project-number-circle">
                    <span>{project.number}</span>
                  </div>
                  <div className="project-meta">
                    {project.year} • {project.category} • {project.type}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <a href="#" className="project-cta-button">
                    VIEW CASE STUDY →
                  </a>
                </div>
                <div className="project-right">
                  {project.image ? (
                    <div className="project-image-container">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="project-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="project-image-placeholder" style={{ display: 'none' }}>
                        <div className="project-image-shapes">
                          <div className="shape shape-square"></div>
                          <div className="shape shape-circle"></div>
                          <div className="shape shape-circle"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="project-image-placeholder">
                      <div className="project-image-shapes">
                        <div className="shape shape-square"></div>
                        <div className="shape shape-circle"></div>
                        <div className="shape shape-circle"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Projects
