import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { clsx } from 'clsx';

const Pagination = ({ currentPage, totalPages, totalItems, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  const { t } = useTranslation('common');
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) if (i > 0) pages.push(i);
    return pages;
  };

  const navBtn = 'w-6 h-6 flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-400';

  return (
    <div className="flex-shrink-0 px-3 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-wrap justify-between items-center gap-3 border-t border-slate-100 dark:border-slate-800">
      {/* Info */}
      <div className="flex items-center gap-3">
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
          {t('showing')} <span className="text-slate-700 dark:text-slate-200">{startItem || 0}–{endItem || 0}</span> {t('of')} {totalItems}
        </p>
        <div className="flex items-center gap-1.5 border-l border-slate-100 dark:border-slate-800 pl-3">
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="bg-transparent border border-slate-200 dark:border-slate-700 rounded px-1 py-0.5 text-[8px] font-bold outline-none cursor-pointer"
          >
            {[10, 20, 50, 100].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">/ {t('per_page')}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-0.5">
        <button disabled={currentPage === 1} onClick={() => onPageChange(1)} className={navBtn}><ChevronsLeft size={11} /></button>
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className={navBtn}><ChevronLeft size={11} /></button>
        
        <div className="flex gap-0.5 mx-1">
          {getPageNumbers().map(p => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={clsx(
                'w-6 h-6 rounded-md text-[9px] font-bold transition-all',
                currentPage === p
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <button disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)} className={navBtn}><ChevronRight size={11} /></button>
        <button disabled={currentPage >= totalPages} onClick={() => onPageChange(totalPages)} className={navBtn}><ChevronsRight size={11} /></button>
      </div>
    </div>
  );
};

export default Pagination;
