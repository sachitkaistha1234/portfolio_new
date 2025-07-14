import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
}

const AnimatedSkillBars: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const skills: Skill[] = [
    // DevOps & Cloud
    { name: "Docker", level: 90, color: "from-blue-500 to-blue-600", category: "DevOps" },
    { name: "AWS", level: 85, color: "from-orange-500 to-orange-600", category: "DevOps" },
    { name: "Jenkins", level: 80, color: "from-red-500 to-red-600", category: "DevOps" },
    { name: "Kubernetes", level: 75, color: "from-blue-600 to-purple-600", category: "DevOps" },
    { name: "Linux", level: 90, color: "from-gray-700 to-gray-800", category: "DevOps" },
    
    // Backend Development
    { name: "PHP", level: 95, color: "from-purple-600 to-purple-700", category: "Backend" },
    { name: "Laravel", level: 90, color: "from-red-600 to-red-700", category: "Backend" },
    { name: "MySQL", level: 85, color: "from-blue-600 to-blue-700", category: "Backend" },
    { name: "API Development", level: 88, color: "from-green-500 to-green-600", category: "Backend" },
    
    // Tools & Others
    { name: "Git", level: 95, color: "from-orange-600 to-red-600", category: "Tools" },
    { name: "GitHub Actions", level: 85, color: "from-gray-700 to-gray-800", category: "Tools" },
    { name: "Nginx", level: 80, color: "from-green-600 to-green-700", category: "Tools" },
    { name: "Bash", level: 85, color: "from-yellow-500 to-yellow-600", category: "Tools" }
  ];

  const categories = ["DevOps", "Backend", "Tools"];

  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-2 opacity-5"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </motion.div>

        <div ref={ref} className="max-w-6xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
                {category}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: categoryIndex * 0.2 + index * 0.1 
                      }}
                      className="neu-morphism p-6 group"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {skill.name}
                        </h4>
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="skill-progress h-4 mb-2">
                        <motion.div
                          className={`skill-progress-fill bg-gradient-to-r ${skill.color}`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.2 + index * 0.1 + 0.3,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Proficiency Level
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass-card p-8 rounded-3xl text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Continuous Learning
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Technology evolves rapidly, and so do I. Currently exploring AI integration, 
            advanced cloud architectures, and modern DevOps practices.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["AI/ML", "Terraform", "Microservices", "GraphQL"].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedSkillBars;