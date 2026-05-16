import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, description, children, icon: Icon, className = "" }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`premium-card p-5 md:p-6 bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none ${className}`}
    >
      {(title || Icon) && (
        <div className="flex items-center gap-3 mb-6">
          {Icon && (
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Icon size={20} />
            </div>
          )}
          <div>
            {title && (
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 italic">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;
