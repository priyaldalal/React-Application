import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { clsx } from 'clsx';
import { UI_CONFIG } from '../../config/uiConfig';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  rowsPerPage, 
  onPageChange, 
  onRowsPerPageChange 
}) => {
  const { t } = useTranslation('common');
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      if (i > 0) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="sticky bottom-0 z-30 px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_10px_-5px_rgba(0,0,0,0.05)]">
      {/* Items Info & Rows Per Page */}
      <div className="flex items-center gap-4">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
          {t('showing')} <span className="text-slate-900 dark:text-white">{startItem || 0} - {endItem || 0}</span> {t('of')} <span className="text-slate-900 dark:text-white">{totalItems}</span> {t('entries')}
        </p>
        
        <div className="flex items-center gap-2 border-l border-slate-100 dark:border-slate-800 pl-4">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('show')}</span>
          <select 
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5 text-[9px] font-black outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all cursor-pointer uppercase tracking-tight"
          >
            {[10, 20, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('per_page')}</span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">
          <button 
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            className="w-6 h-6 flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-400"
          >
            <ChevronsLeft size={12} />
          </button>
          <button 
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="w-6 h-6 flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-400"
          >
            <ChevronLeft size={12} />
          </button>
        </div>

        <div className="flex gap-0.5">
          {getPageNumbers().map(pageNum => (
            <button 
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={clsx(
                "w-6 h-6 rounded-md text-[9px] font-black transition-all uppercase tracking-tighter",
                currentPage === pageNum 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" 
                  : "border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <div className="flex gap-0.5">
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => onPageChange(currentPage + 1)}
            className="w-6 h-6 flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-400"
          >
            <ChevronRight size={12} />
          </button>
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => onPageChange(totalPages)}
            className="w-6 h-6 flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-400"
          >
            <ChevronsRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
