import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { clsx } from 'clsx';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  rowsPerPage, 
  onPageChange, 
  onRowsPerPageChange 
}) => {
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
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="sticky bottom-0 z-30 px-8 py-4 bg-card/80 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-6 border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {/* Items Info & Rows Per Page */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
          Showing <span className="text-foreground">{startItem || 0} - {endItem || 0}</span> of {totalItems} entries
        </p>
        
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Show</span>
          <select 
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="bg-card border border-border rounded-lg px-2 py-1 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
          >
            {[10, 20, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">per page</span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1 mr-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border disabled:opacity-30 hover:bg-card transition-all text-slate-500"
            title="First Page"
          >
            <ChevronsLeft size={18} />
          </button>
          <button 
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border disabled:opacity-30 hover:bg-card transition-all text-slate-500"
            title="Previous Page"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        <div className="flex gap-1.5">
          {getPageNumbers().map(pageNum => (
            <button 
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={clsx(
                "w-9 h-9 rounded-xl text-xs font-black transition-all",
                currentPage === pageNum 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                  : "border border-border text-slate-500 hover:bg-card"
              )}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <div className="flex gap-1 ml-2">
          <button 
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border disabled:opacity-30 hover:bg-card transition-all text-slate-500"
            title="Next Page"
          >
            <ChevronRight size={18} />
          </button>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border disabled:opacity-30 hover:bg-card transition-all text-slate-500"
            title="Last Page"
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
