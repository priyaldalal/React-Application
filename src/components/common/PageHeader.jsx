import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-0.5"
      >
        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 italic">
            {subtitle}
          </p>
        )}
      </motion.div>
      
      {actions && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-wrap gap-3"
        >
          {actions}
        </motion.div>
      )}
    </div>
  );
};

export default PageHeader;
