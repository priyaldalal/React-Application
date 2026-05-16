import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { clsx } from 'clsx';

const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "relative w-8 h-5 rounded-full p-0.5 transition-colors duration-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20",
        theme === 'dark' ? "bg-slate-800 border border-slate-700" : "bg-indigo-50 border border-indigo-100",
        className
      )}
    >
      <motion.div
        animate={{ x: theme === 'dark' ? 12 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={clsx(
          "w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm transition-colors duration-500",
          theme === 'dark' ? "bg-indigo-500 text-white" : "bg-white text-amber-500"
        )}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={8} fill="currentColor" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={8} fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background Decorative Icons */}
      <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none opacity-20">
        <Sun size={6} className={theme === 'dark' ? 'text-slate-400' : 'text-amber-400'} />
        <Moon size={6} className={theme === 'dark' ? 'text-indigo-400' : 'text-slate-400'} />
      </div>
    </button>
  );
};

export default ThemeToggle;
