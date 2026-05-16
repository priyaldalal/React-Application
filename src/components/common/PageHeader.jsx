import React from 'react';

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2 flex-shrink-0">
      <div>
        <h1 className="text-[15px] font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap gap-1.5">{actions}</div>
      )}
    </div>
  );
};

export default PageHeader;
