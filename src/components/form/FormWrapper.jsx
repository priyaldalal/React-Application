import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FormWrapper = ({ label, error, helperText, children, required, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex flex-col gap-1.5 w-full group ${className}`}
  >
    {label && (
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 flex items-center gap-1">
        {label} {required && <span className="text-rose-500 font-bold">*</span>}
      </label>
    )}
    <div className="relative">
      {children}
    </div>
    <AnimatePresence mode="wait">
      {error ? (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-[11px] text-rose-500 font-medium mt-1 pl-1"
        >
          {error}
        </motion.p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 pl-1">{helperText}</p>
      ) : null}
    </AnimatePresence>
  </motion.div>
);

export default FormWrapper;
