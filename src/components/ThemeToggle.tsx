import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="neu-button p-3 touch-target relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 1 : 0.8
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-slate-600" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </motion.div>
      
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          background: theme === 'dark' 
            ? 'linear-gradient(45deg, #1e293b, #334155)' 
            : 'linear-gradient(45deg, #f1f5f9, #e2e8f0)'
        }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: -1 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;