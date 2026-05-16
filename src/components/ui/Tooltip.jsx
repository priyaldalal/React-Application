import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full mb-1',
    bottom: '-bottom-2 left-1/2 -translate-x-1/2 translate-y-full mt-1',
    left: 'top-1/2 -left-2 -translate-x-full -translate-y-1/2 mr-1',
    right: 'top-1/2 -right-2 translate-x-full -translate-y-1/2 ml-1'
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`absolute z-[100] px-2 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] font-black uppercase tracking-widest rounded shadow-xl whitespace-nowrap pointer-events-none ${positionClasses[position]}`}
          >
            {content}
            <div className={`absolute w-2 h-2 bg-slate-900 dark:bg-white rotate-45 
              ${position === 'top' ? '-bottom-1 left-1/2 -translate-x-1/2' : ''}
              ${position === 'bottom' ? '-top-1 left-1/2 -translate-x-1/2' : ''}
              ${position === 'left' ? '-right-1 top-1/2 -translate-y-1/2' : ''}
              ${position === 'right' ? '-left-1 top-1/2 -translate-y-1/2' : ''}
            `} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
