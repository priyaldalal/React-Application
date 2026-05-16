import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  icon: Icon, 
  className = "", 
  disabled,
  ...props 
}) => {
  const variants = {
    primary: "bg-indigo-600 text-white shadow-md shadow-indigo-500/10 hover:bg-indigo-700 active:bg-indigo-800",
    secondary: "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800",
    danger: "bg-rose-600 text-white shadow-md shadow-rose-500/10 hover:bg-rose-700 active:bg-rose-800",
    ghost: "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50",
  };

  const sizes = {
    sm: "px-2 py-1 text-[8px] tracking-widest",
    md: "px-3 py-1.5 text-[9px] tracking-widest",
    lg: "px-4 py-2 text-[10px] tracking-widest",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-1.5 rounded-md font-black uppercase transition-all duration-200",
        "disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : Icon && typeof Icon !== 'string' ? (
        <Icon size={12} />
      ) : null}
      <span className="leading-none">{children}</span>
    </motion.button>
  );
};

export default Button;
