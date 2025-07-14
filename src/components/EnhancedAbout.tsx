import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Heart, Zap, Target, Coffee, Rocket } from 'lucide-react';

const EnhancedAbout: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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

  const values = [
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "I believe in delivering fast, optimized solutions that don't compromise on quality."
    },
    {
      icon: Target,
      title: "Precision",
      description: "Every line of code, every deployment, every solution is crafted with meticulous attention to detail."
    },
    {
      icon: Heart,
      title: "Passion-Driven",
      description: "Technology isn't just my profession—it's my passion. I love solving complex problems."
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Always exploring new technologies and methodologies to stay ahead of the curve."
    }
  ];

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg-1 opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-slow"></div>
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
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              About Me
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Passionate DevOps Engineer and Backend Developer dedicated to building scalable, 
              efficient solutions that bridge the gap between development and operations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Personal Story */}
            <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">My Journey</h3>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  My journey in tech began with a fascination for how things work behind the scenes. 
                  Starting as a PHP developer, I spent 2.7 years crafting robust web applications 
                  and diving deep into backend architecture.
                </p>
                <p>
                  The transition to DevOps felt natural—combining my development experience with 
                  infrastructure automation, CI/CD pipelines, and cloud technologies. I discovered 
                  my passion for creating systems that empower teams to ship faster and more reliably.
                </p>
                <p>
                  Today, I'm pursuing my MCA while working on cutting-edge projects that blend 
                  AI, automation, and cloud-native technologies. Every challenge is an opportunity 
                  to learn and grow.
                </p>
              </div>
            </motion.div>

            {/* Professional Image Placeholder */}
            <motion.div variants={itemVariants} className="relative">
              <div className="glass-card p-8 rounded-3xl text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-6xl text-white font-bold">
                  S
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Sachit Kaistha
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  DevOps Engineer & Backend Developer
                </p>
                <div className="flex items-center justify-center gap-2 text-green-500">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Available for opportunities</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* What Sets Me Apart */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
              What Sets Me Apart
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="neu-morphism p-6 text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Fun Facts */}
          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
              Fun Facts About Me
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Coffee className="w-12 h-12 text-amber-500 mb-3" />
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Coffee Lover</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Powered by coffee and curiosity
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Code className="w-12 h-12 text-green-500 mb-3" />
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Code Enthusiast</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Always exploring new technologies
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Target className="w-12 h-12 text-red-500 mb-3" />
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Problem Solver</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Love tackling complex challenges
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="neu-button px-8 py-4 text-lg font-semibold text-gray-800 dark:text-white touch-target"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedAbout;