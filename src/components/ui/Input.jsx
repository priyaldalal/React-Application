import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = ({ label, icon: Icon, error, type = 'text', value: propValue, defaultValue, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const value = propValue !== undefined ? propValue : (defaultValue !== undefined ? defaultValue : '');

  return (
    <div className="flex flex-col gap-1 w-full group">
      {label && (
        <label className={clsx(
          "text-[8px] font-black uppercase tracking-widest ml-1 transition-colors",
          isFocused ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-500"
        )}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className={clsx(
            "absolute left-2.5 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10 pointer-events-none",
            isFocused ? "text-indigo-600" : "text-slate-400"
          )}>
            <Icon size={12} />
          </div>
        )}
        
        <input
          {...props}
          type={type}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={twMerge(
            "w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-3 py-1.5 text-[10px] font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700",
            Icon && "pl-8",
            error && "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500/30",
            props.className
          )}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[7px] font-black text-rose-500 uppercase tracking-tight ml-1 mt-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
