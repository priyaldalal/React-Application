import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, description, children, icon: Icon, className = "" }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`premium-card p-3 bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 shadow-sm ${className}`}
    >
      {(title || Icon) && (
        <div className="flex items-center gap-2 mb-2">
          {Icon && (
            <div className="p-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md">
              <Icon size={12} />
            </div>
          )}
          <div>
            {title && (
              <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="space-y-2">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;
