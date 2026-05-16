import React from 'react';

const Section = ({ title, description, children, icon: Icon, className = '' }) => {
  return (
    <section className={`premium-card p-3 ${className}`}>
      {(title || Icon) && (
        <div className="flex items-center gap-2 mb-2">
          {Icon && (
            <div className="p-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-md flex-shrink-0">
              <Icon size={12} />
            </div>
          )}
          <div className="min-w-0">
            {title && (
              <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-[8px] font-medium text-slate-400 mt-0.5 leading-tight">{description}</p>
            )}
          </div>
        </div>
      )}
      <div className="space-y-2">{children}</div>
    </section>
  );
};

export default Section;
