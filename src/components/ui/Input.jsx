import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = ({ label, icon: Icon, error, type = 'text', value: propValue, defaultValue, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const value = propValue !== undefined ? propValue : (defaultValue !== undefined ? defaultValue : '');

  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      <div className="relative">
        {Icon && (
          <div className={clsx(
            "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10",
            isFocused ? "text-indigo-600" : "text-slate-400"
          )}>
            <Icon size={18} />
          </div>
        )}
        
        <input
          {...props}
          type={type}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={twMerge(
            "input-premium peer placeholder-transparent pt-7 pb-3 min-h-[60px]",
            Icon && "pl-11",
            error && "border-red-500 focus:ring-red-500/20",
            props.className
          )}
          placeholder={label}
        />

        <label className={clsx(
          "absolute left-4 transition-all duration-300 pointer-events-none text-[10px] font-black uppercase tracking-widest",
          Icon && "left-11",
          isFocused || value ? "top-2.5 text-indigo-600 opacity-100" : "top-1/2 -translate-y-1/2 text-slate-400 opacity-60 text-sm font-medium normal-case tracking-normal"
        )}>
          {label}
        </label>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
