import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const FormWrapper = ({ label, error, helperText, children, required, className = '' }) => (
  <div className={`flex flex-col gap-1 w-full ${className}`}>
    {label && (
      <label className="field-label flex items-center gap-1 group-focus-within:text-indigo-600">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
    )}
    <div className="relative">{children}</div>
    <AnimatePresence mode="wait">
      {error ? (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-[7px] font-bold text-rose-500 uppercase tracking-tight ml-0.5"
        >
          {error}
        </motion.p>
      ) : helperText ? (
        <p className="text-[7px] font-medium text-slate-400 ml-0.5">{helperText}</p>
      ) : null}
    </AnimatePresence>
  </div>
);

export default FormWrapper;
