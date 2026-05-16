import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const Input = ({ label, icon: Icon, error, type = 'text', value: propValue, defaultValue, className, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const value = propValue !== undefined ? propValue : (defaultValue !== undefined ? defaultValue : '');

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className={clsx(
          'field-label transition-colors',
          isFocused && 'text-indigo-600 dark:text-indigo-400'
        )}>
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className={clsx(
            'absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none transition-colors',
            isFocused ? 'text-indigo-500' : 'text-slate-400'
          )}>
            <Icon size={12} />
          </div>
        )}
        <input
          {...props}
          type={type}
          value={value}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
          className={clsx(
            'input-field',
            Icon && 'pl-7',
            error && 'border-rose-400 focus:ring-rose-500/10 focus:border-rose-400',
            className
          )}
          placeholder={props.placeholder || label}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[7px] font-bold text-rose-500 uppercase tracking-tight ml-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
