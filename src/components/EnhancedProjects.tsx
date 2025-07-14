import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Play, Code, Zap, Filter } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  color: string;
  githubUrl: string;
  liveUrl?: string;
  features: string[];
  metrics: { [key: string]: string };
}

const EnhancedProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const projects: Project[] = [
    {
      id: 1,
      title: "DevFlow AI - Multi-Tool Dashboard",
      category: "DevOps",
      description: "The ultimate multi-tool dashboard unifying AI, DevOps, and automation into one sleek, interactive platform.",
      longDescription: "DevFlow AI is a powerful Streamlit-based platform that combines AI capabilities with DevOps automation. Features include remote Docker management over SSH, AI-powered commute estimation using Random Forest ML, AI story co-writing with Gemini API, universal code generation, smart image capture with email/WhatsApp sharing, and a modern glassmorphism dashboard interface.",
      techStack: ["Python", "Streamlit", "Scikit-learn", "Gemini API", "Docker", "Paramiko"],
      image: "🚀",
      color: "from-blue-500 to-cyan-500",
      githubUrl: "https://github.com/sachitkaistha/devflow-ai",
      liveUrl: "#",
      features: [
        "Remote Docker management over SSH",
        "AI-powered commute estimation",
        "AI story co-writing with text-to-speech",
        "Universal code generation",
        "Smart image capture & sharing"
      ],
      metrics: {
        "Tools Integrated": "6+",
        "AI Models": "Gemini 1.5 Flash",
        "Interface": "Modern Glassmorphism"
      }
    },
    {
      id: 2,
      title: "Remote Docker Manager",
      category: "DevOps",
      description: "Browser-based Docker container management tool with secure SSH connectivity for remote server operations.",
      longDescription: "A comprehensive Docker management solution built with Python and Streamlit. This tool connects securely to remote servers via SSH and provides a web interface for managing Docker operations including container lifecycle management, image operations, DockerHub integration, and remote Docker installation.",
      techStack: ["Python", "Streamlit", "Docker", "SSH", "Subprocess"],
      image: "🐳",
      color: "from-purple-500 to-pink-500",
      githubUrl: "https://github.com/sachitkaistha/remote-docker-manager",
      features: [
        "Secure SSH connectivity",
        "Container lifecycle management",
        "Image pulling and running",
        "DockerHub integration",
        "Remote Docker installation"
      ],
      metrics: {
        "Remote Access": "SSH-based",
        "Operations": "Full Docker CLI",
        "Interface": "Web-based"
      }
    },
    {
      id: 3,
      title: "AI Story Co-Writer",
      category: "AI/ML",
      description: "Interactive storytelling tool using Google Gemini API with mood-based narrative generation and collaborative writing.",
      longDescription: "An AI-powered creative writing assistant that takes user input and continues stories based on selected moods (Mystery, Fantasy, Romance). Built with Gradio for interactive UI and powered by Google Gemini 2.5 Flash via OpenAI-compatible wrapper. Perfect for writers, students, and creative enthusiasts.",
      techStack: ["Python", "Gradio", "Gemini API", "OpenAI SDK"],
      image: "📖",
      color: "from-green-500 to-emerald-500",
      githubUrl: "https://github.com/sachitkaistha/ai-story-cowriter",
      features: [
        "Mood-based story generation",
        "One sentence at a time progression",
        "Interactive Gradio interface",
        "AI-assisted collaborative writing"
      ],
      metrics: {
        "AI Model": "Gemini 2.5 Flash",
        "Moods": "3 (Mystery, Fantasy, Romance)",
        "Interface": "Interactive UI"
      }
    },
    {
      id: 4,
      title: "Gemini-Powered Universal Code Generator",
      category: "AI/ML",
      description: "AI assistant that generates clean, functional code for any programming language using Google Gemini 1.5 Flash.",
      longDescription: "A powerful development tool that merges Generative AI with developer efficiency. Simply describe what you need, and the model delivers accurate, real-time code with context and clarity across multiple programming languages including Python, JavaScript, C++, HTML, C#, and more.",
      techStack: ["Python", "Gemini API", "Gradio", "OpenAI SDK"],
      image: "💻",
      color: "from-orange-500 to-red-500",
      githubUrl: "https://github.com/sachitkaistha/gemini-code-generator",
      features: [
        "Multi-language code generation",
        "Real-time AI assistance",
        "Context-aware responses",
        "Clean, functional output"
      ],
      metrics: {
        "Languages": "10+",
        "AI Model": "Gemini 1.5 Flash",
        "Response Time": "Real-time"
      }
    },
    {
      id: 5,
      title: "Linux Command Menu Tool",
      category: "System Administration",
      description: "Menu-driven Linux utility tool for quick system command execution without memorizing complex syntax.",
      longDescription: "A simple yet effective menu-driven tool built in Python that helps users run common Linux system commands quickly. The tool lists useful commands like date, cal, ping, and more. Users just select a number and the command runs automatically in the terminal, making it especially helpful for beginners exploring Linux.",
      techStack: ["Python", "Linux", "Bash", "Red Hat Enterprise Linux"],
      image: "🐧",
      color: "from-teal-500 to-blue-500",
      githubUrl: "https://github.com/sachitkaistha/linux-command-menu",
      features: [
        "Menu-driven interface",
        "Common system commands",
        "Beginner-friendly design",
        "Automatic command execution"
      ],
      metrics: {
        "Commands": "15+",
        "Platform": "RHEL 9",
        "Environment": "VirtualBox"
      }
    },
    {
      id: 6,
      title: "AI Communication Suite",
      category: "AI/ML",
      description: "Comprehensive communication toolkit with AI-powered SMS, WhatsApp messaging, and voice calling capabilities.",
      longDescription: "A versatile communication platform combining multiple messaging channels with AI integration. Features include Twilio-powered SMS sending, WhatsApp messaging via Twilio Sandbox API, AI-powered voice calling utility, and a unified Gradio interface for seamless user experience across all communication channels.",
      techStack: ["Python", "Twilio API", "Gradio", "WhatsApp API", "Voice API"],
      image: "📱",
      color: "from-yellow-500 to-orange-500",
      githubUrl: "https://github.com/sachitkaistha/ai-communication-suite",
      features: [
        "Multi-channel messaging",
        "AI-powered voice calls",
        "Global SMS delivery",
        "WhatsApp integration",
        "Real-time delivery feedback"
      ],
      metrics: {
        "Channels": "3 (SMS, WhatsApp, Voice)",
        "Global Reach": "E.164 format",
        "API": "Twilio-powered"
      }
    }
  ];

  const categories = ['All', 'DevOps', 'AI/ML', 'System Administration'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="projects" className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-1 opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Innovative solutions that demonstrate expertise in modern development and DevOps practices
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="glass-card p-2 rounded-2xl">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 touch-target ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Filter className="w-4 h-4 inline mr-2" />
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="glass-card rounded-3xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Header */}
                  <div className={`p-6 bg-gradient-to-r ${project.color} text-white relative overflow-hidden`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{project.image}</div>
                      <div className="flex gap-2">
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors touch-target"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors touch-target"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-medium opacity-90 mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold leading-tight">
                      {project.title}
                    </h3>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2 neu-morphism text-sm font-medium touch-target"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-4 h-4" />
                        <span>View Details</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Modal Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{selectedProject.image}</div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                        {selectedProject.title}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${selectedProject.color}`}>
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="neu-button p-3 touch-target"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Content */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      Project Overview
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>

                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      Key Features
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Zap className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      Project Metrics
                    </h4>
                    <div className="space-y-3 mb-6">
                      {Object.entries(selectedProject.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-3 neu-morphism rounded-lg">
                          <span className="text-gray-600 dark:text-gray-300">{key}</span>
                          <span className="font-semibold text-gray-800 dark:text-white">{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-4">
                      <motion.a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 neu-button font-medium touch-target"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                        View Code
                      </motion.a>
                      {selectedProject.liveUrl && (
                        <motion.a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 neu-button font-medium touch-target"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-5 h-5" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EnhancedProjects;