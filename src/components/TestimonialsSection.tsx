import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  image: string;
}

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Senior DevOps Engineer",
      company: "TechCorp Solutions",
      message: "Sachit's expertise in DevOps automation is exceptional. His Docker containerization solutions reduced our deployment time by 70%. A true professional who delivers results.",
      rating: 5,
      image: "👨‍💻"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Project Manager",
      company: "InnovateTech",
      message: "Working with Sachit was a game-changer for our project. His PHP development skills and attention to detail helped us deliver a robust e-commerce platform ahead of schedule.",
      rating: 5,
      image: "👩‍💼"
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "CTO",
      company: "StartupHub",
      message: "Sachit's transition from PHP development to DevOps brings a unique perspective. He understands both development and operations, making him invaluable for our CI/CD pipeline implementation.",
      rating: 5,
      image: "👨‍🚀"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Lead Developer",
      company: "CloudFirst Inc",
      message: "His AWS expertise and infrastructure automation skills are top-notch. Sachit helped us migrate our entire infrastructure to the cloud seamlessly. Highly recommended!",
      rating: 5,
      image: "👩‍💻"
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Technical Lead",
      company: "DevOps Masters",
      message: "Sachit's problem-solving abilities are remarkable. He quickly identified bottlenecks in our deployment process and implemented elegant solutions using Jenkins and Docker.",
      rating: 5,
      image: "👨‍🔧"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-4 opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            What colleagues and clients say about working with me
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="testimonial-card min-h-[400px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  {/* Quote Icon */}
                  <Quote className="w-12 h-12 text-blue-500 mx-auto mb-6 opacity-50" />
                  
                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  
                  {/* Message */}
                  <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
                    "{testimonials[currentIndex].message}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 text-4xl mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      {testimonials[currentIndex].image}
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-sm text-blue-500 font-medium">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 neu-button p-3 touch-target"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 neu-button p-3 touch-target"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </motion.div>

          {/* Dots Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-8 gap-2"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 touch-target ${
                  index === currentIndex
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>

          {/* Testimonial Cards Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mt-16"
          >
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="glass-card p-6 rounded-2xl cursor-pointer group"
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => goToTestimonial(index)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 text-2xl rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                    {testimonial.image}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 dark:text-white">
                      {testimonial.name}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {testimonial.message}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;