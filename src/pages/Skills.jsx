import { motion } from 'framer-motion'
import { useState } from 'react'
import './Skills.css'

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const skillCategories = [
    {
      title: 'Design',
      skills: [
        { name: 'UI/UX Design', level: 92 },
        { name: 'Figma', level: 90 },
        { name: 'Prototyping', level: 88 },
        { name: 'Design Systems', level: 90 },
        { name: 'Visual Design', level: 90 }
      ]
    },
    {
      title: 'Software Development',
      skills: [
        { name: 'React', level: 80 },
        { name: 'React Native', level: 85 },
        { name: 'PHP', level: 82 },
        { name: 'Node.js', level: 80 },
        { name: 'Python', level: 80 }
      ]
    },
    {
      title: 'Game Development',
      skills: [
        { name: 'Unity', level: 93 },
        { name: 'C#', level: 85 },
        { name: 'Game Design', level: 92 },
        { name: '2D Art', level: 85 },
        { name: '2D Animation', level: 88 }
      ]
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
    hidden: { opacity: 0, y: isMobile ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      className="skills"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="skills-container">
        <motion.h1 className="page-title" variants={itemVariants}>
          Skills & Expertise
        </motion.h1>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="skill-category"
              variants={itemVariants}
            >
              <h2 className="category-title">{category.title}</h2>
              <div className="skills-list">
                {category.skills.map((skill, i) => {
                  const isHovered = hoveredSkill === `${category.title}-${skill.name}`
                  return (
                    <div 
                      key={i} 
                      className="skill-item"
                      onMouseEnter={() => setHoveredSkill(`${category.title}-${skill.name}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-progress-bar">
                        <motion.div
                          className="skill-progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ 
                            duration: 0.8, 
                            delay: index * 0.1 + i * 0.05,
                            ease: "easeOut"
                          }}
                          style={{
                            backgroundColor: isHovered ? 'var(--accent)' : 'var(--text-dark)'
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Skills
