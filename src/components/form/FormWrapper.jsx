import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FormWrapper = ({ label, error, helperText, children, required, className = "" }) => (
  <div className={`flex flex-col gap-1 w-full group ${className}`}>
    {label && (
      <label className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 flex items-center gap-1 ml-1">
        {label} {required && <span className="text-rose-500 font-black">*</span>}
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
          className="text-[7px] font-black text-rose-500 uppercase mt-0.5 ml-1 tracking-tight"
        >
          {error}
        </motion.p>
      ) : helperText ? (
        <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 ml-1 uppercase tracking-tighter">{helperText}</p>
      ) : null}
    </AnimatePresence>
  </div>
);

export default FormWrapper;
