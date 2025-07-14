import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  Github, 
  Linkedin, 
  User, 
  MessageSquare,
  Loader
} from 'lucide-react';

// Validation schema
const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
});

interface FormData {
  name: string;
  email: string;
  message: string;
}

const EnhancedContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const watchedFields = watch();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration - Replace with your actual values
      const serviceId = 'service_portfolio';
      const templateId = 'template_contact';
      const publicKey = 'YOUR_PUBLIC_KEY';

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        to_email: 'skaistha16@gmail.com',
        message: data.message,
        reply_to: data.email,
        subject: `Portfolio Contact: Message from ${data.name}`,
        timestamp: new Date().toLocaleString()
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        duration: 5000,
        position: 'top-center',
      });
      
      reset();
    } catch (error) {
      console.error('Email sending error:', error);
      toast.error('Failed to send message. Please try contacting me directly via email or phone.', {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'skaistha16@gmail.com',
      href: 'mailto:skaistha16@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7876434370',
      href: 'tel:+917876434370',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chandigarh, India',
      href: 'https://maps.google.com/?q=Chandigarh,India',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/sachitkaistha',
      icon: Github,
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sachit-kaistha-306849190',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      href: 'mailto:skaistha16@gmail.com',
      icon: Mail,
      color: 'hover:text-purple-400'
    }
  ];

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
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      <Toaster />
      
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-3 opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
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
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let's discuss how we can work together 
              to create something amazing.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
              <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <motion.a
                        key={index}
                        href={info.href}
                        target={info.label === 'Location' ? '_blank' : undefined}
                        rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-4 p-4 neu-morphism group touch-target"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {info.label}
                          </p>
                          <p className="text-lg font-semibold text-gray-800 dark:text-white">
                            {info.value}
                          </p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
                    Follow me on
                  </p>
                  <div className="flex justify-center gap-4">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neu-button p-3 touch-target"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="glass-card p-8 md:p-10 rounded-3xl">
                <div className="flex items-center gap-3 mb-8">
                  <Send className="w-8 h-8 text-purple-500" />
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Send me a message
                  </h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...register('name')}
                          type="text"
                          id="name"
                          className={`form-input w-full pl-12 pr-4 py-3 ${errors.name ? 'error' : ''}`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.name.message}
                        </motion.p>
                      )}
                      {/* Real-time validation indicator */}
                      {watchedFields.name && !errors.name && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-1 text-green-500 text-sm mt-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Looks good!</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...register('email')}
                          type="email"
                          id="email"
                          className={`form-input w-full pl-12 pr-4 py-3 ${errors.email ? 'error' : ''}`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                      {watchedFields.email && !errors.email && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-1 text-green-500 text-sm mt-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Valid email!</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        {...register('message')}
                        id="message"
                        rows={6}
                        className={`form-input w-full pl-12 pr-4 py-3 resize-none ${errors.message ? 'error' : ''}`}
                        placeholder="Tell me about your project, ideas, or just say hello..."
                      />
                    </div>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.message.message}
                      </motion.p>
                    )}
                    {watchedFields.message && !errors.message && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1 text-green-500 text-sm mt-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Great message!</span>
                      </motion.div>
                    )}
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {watchedFields.message?.length || 0}/1000 characters
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="neu-button w-full sm:w-auto px-8 py-4 text-lg font-semibold text-gray-800 dark:text-white touch-target disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      I'll respond within 24 hours
                    </p>
                  </div>
                </form>

                {/* Alternative contact methods */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                    Prefer direct contact?
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      href="mailto:skaistha16@gmail.com"
                      className="flex items-center gap-2 px-4 py-2 neu-morphism text-sm font-medium touch-target"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="w-4 h-4" />
                      Email Me
                    </motion.a>
                    <motion.a
                      href="tel:+917876434370"
                      className="flex items-center gap-2 px-4 py-2 neu-morphism text-sm font-medium touch-target"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone className="w-4 h-4" />
                      Call Me
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedContactForm;