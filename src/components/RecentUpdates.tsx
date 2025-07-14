import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight, Zap, Code, Rocket } from 'lucide-react';

interface Update {
  id: number;
  title: string;
  snippet: string;
  date: string;
  readTime: string;
  category: string;
  link: string;
  icon: React.ElementType;
  color: string;
}

const RecentUpdates: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const updates: Update[] = [
    {
      id: 1,
      title: "DevFlow AI - Multi-Tool Dashboard Launch",
      snippet: "Just launched my latest project combining AI capabilities with DevOps automation. Features include remote Docker management, AI-powered commute estimation, and universal code generation.",
      date: "2025-01-15",
      readTime: "3 min read",
      category: "Project Launch",
      link: "https://github.com/sachitkaistha/devflow-ai",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Mastering Docker Container Orchestration",
      snippet: "Deep dive into advanced Docker techniques and container orchestration strategies. Learn how to optimize your containerization workflow for production environments.",
      date: "2025-01-10",
      readTime: "5 min read",
      category: "DevOps Tutorial",
      link: "#",
      icon: Code,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "AI Integration in Modern Development Workflows",
      snippet: "Exploring how AI tools like Gemini API can revolutionize development workflows. From code generation to automated testing, the future is here.",
      date: "2025-01-05",
      readTime: "4 min read",
      category: "AI & Development",
      link: "#",
      icon: Zap,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-5 opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Recent Updates
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stay updated with my latest projects, insights, and technical discoveries
            </p>
          </motion.div>

          {/* Updates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {updates.map((update, index) => {
              const IconComponent = update.icon;
              return (
                <motion.article
                  key={update.id}
                  variants={itemVariants}
                  className="glass-card rounded-3xl overflow-hidden group hover:scale-105 transition-transform duration-300"
                >
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-r ${update.color} text-white relative overflow-hidden`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-6 h-6" />
                        <span className="text-sm font-medium opacity-90">
                          {update.category}
                        </span>
                      </div>
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold leading-tight">
                      {update.title}
                    </h3>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {update.snippet}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(update.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{update.readTime}</span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <motion.a
                      href={update.link}
                      target={update.link.startsWith('http') ? '_blank' : undefined}
                      rel={update.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="neu-button w-full py-3 px-4 text-center font-medium text-gray-800 dark:text-white flex items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.a>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* View All Button */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <motion.button
              className="neu-button px-8 py-4 text-lg font-semibold text-gray-800 dark:text-white touch-target"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Updates
            </motion.button>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get notified about my latest projects, tutorials, and tech insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input flex-1 px-4 py-3"
              />
              <motion.button
                className="neu-button px-6 py-3 font-medium text-gray-800 dark:text-white touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentUpdates;