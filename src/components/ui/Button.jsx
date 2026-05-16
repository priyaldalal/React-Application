import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

const Button = ({ 
  children, variant = 'primary', size = 'md', loading = false, 
  icon: Icon, className = '', disabled, ...props 
}) => {
  const variants = {
    primary:   'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm',
    secondary: 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800',
    danger:    'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm',
    ghost:     'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
  };

  const sizes = {
    sm: 'h-6 px-2 text-[8px] gap-1',
    md: 'h-7 px-3 text-[9px] gap-1.5',
    lg: 'h-8 px-4 text-[10px] gap-1.5',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-bold uppercase tracking-wider transition-all duration-150',
        'disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 10 : 12} />
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button;
