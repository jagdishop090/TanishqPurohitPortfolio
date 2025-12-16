import { motion } from 'framer-motion'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      id: 1,
      number: '01',
      year: '2025',
      category: 'Web Development',
      type: 'Web App',
      title: 'Immersive Web Experience',
      description: 'A cutting-edge web application featuring modern design and smooth interactions with seamless user experience.',
      image: null
    },
    {
      id: 2,
      number: '02',
      year: '2024',
      category: 'Game Development',
      type: 'Game',
      title: 'Interactive Game World',
      description: 'An immersive game environment with dynamic physics and engaging gameplay mechanics for an exceptional player experience.',
      image: null
    },
    {
      id: 3,
      number: '03',
      year: '2025',
      category: 'Design',
      type: 'Mobile App',
      title: 'Design System Library',
      description: 'A comprehensive design system with reusable components and consistent visual language focused on accessibility.',
      image: null
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
                  <div className="project-image-placeholder">
                    <div className="project-image-shapes">
                      <div className="shape shape-square"></div>
                      <div className="shape shape-circle"></div>
                      <div className="shape shape-circle"></div>
                    </div>
                  </div>
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
