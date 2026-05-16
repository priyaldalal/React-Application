import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Pin,
  PinOff,
  Columns,
  Search,
  Filter,
  Download,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import Tooltip from './Tooltip';

/**
 * Reusable Enterprise Data Table
 * Features: Pinned Columns, Resizing, Sorting, Filtering, Selection
 */
const DataTable = ({
  data,
  columns,
  onRowClick,
  isLoading,
  pagination = true,
  searchable = true,
  selectable = true,
  title,
  actions,
}) => {
  const { t } = useTranslation('common');
  const [columnOrder, setColumnOrder] = useState(() => columns.map((c) => c.id || c.accessorKey));
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnPinning, setColumnPinning] = useState({
    left: [],
    right: [],
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
      columnOrder,
      columnPinning,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Calculate sticky offsets for pinned columns
  const getStickyStyles = (column) => {
    const isPinned = column.getIsPinned();
    if (!isPinned) return {};

    const isLeft = isPinned === 'left';
    return {
      left: isLeft ? `${column.getStart('left')}px` : undefined,
      right: !isLeft ? `${column.getAfter('right')}px` : undefined,
      position: 'sticky',
      zIndex: isPinned ? 20 : 10,
    };
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
      {/* Table Header / Toolbar */}
      <div className="flex items-center justify-between p-2.5 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {title && (
            <h2 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">
              {title}
            </h2>
          )}
          {searchable && (
            <div className="relative group">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={12} />
              <input
                type="text"
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder={t('search_placeholder')}
                className="input-field pl-8 max-w-[200px]"
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1.5">
          {actions}
          <div className="h-4 w-px bg-slate-100 dark:bg-slate-800 mx-1" />
          <Tooltip content={t('columns')} position="bottom">
            <Button variant="secondary" size="sm" className="p-1.5 h-7 w-7">
              <Columns size={12} />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex-1 overflow-auto custom-scrollbar relative">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-30 bg-slate-50 dark:bg-slate-950">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isPinned = header.column.getIsPinned();
                  return (
                    <th
                      key={header.id}
                      style={{ 
                        width: header.getSize(),
                        ...getStickyStyles(header.column)
                      }}
                      className={clsx(
                        "px-3 py-2 text-left text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 whitespace-nowrap",
                        isPinned && "bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md",
                        isPinned === 'left' && "border-r shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                        isPinned === 'right' && "border-l shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]"
                      )}
                    >
                      <div className="flex items-center gap-1.5 group">
                        <div 
                          className={clsx(
                            "flex items-center gap-1 cursor-pointer select-none transition-colors",
                            header.column.getCanSort() ? "hover:text-slate-900 dark:hover:text-white" : ""
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <div className="w-3 h-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              {{
                                asc: <ArrowUp size={10} />,
                                desc: <ArrowDown size={10} />,
                              }[header.column.getIsSorted()] ?? <ArrowUpDown size={10} className="text-slate-300" />}
                            </div>
                          )}
                        </div>

                        {/* Column Actions (Pinning etc) */}
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                           <button 
                             onClick={() => header.column.pin(isPinned === 'left' ? false : 'left')}
                             className={clsx("p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors", isPinned === 'left' ? 'text-indigo-600' : 'text-slate-400')}
                           >
                             {isPinned === 'left' ? <PinOff size={10} /> : <Pin size={10} />}
                           </button>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, j) => (
                    <td key={j} className="px-3 py-2.5">
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr 
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={clsx(
                    "group transition-colors",
                    onRowClick ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40" : "",
                    row.getIsSelected() ? "bg-indigo-50/50 dark:bg-indigo-900/10" : ""
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isPinned = cell.column.getIsPinned();
                    return (
                      <td
                        key={cell.id}
                        style={getStickyStyles(cell.column)}
                        className={clsx(
                          "px-3 py-1.5 text-[10px] text-slate-600 dark:text-slate-300 whitespace-nowrap",
                          isPinned && "bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm group-hover:bg-slate-50 dark:group-hover:bg-slate-800",
                          isPinned === 'left' && "border-r border-slate-100 dark:border-slate-800/50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]",
                          isPinned === 'right' && "border-l border-slate-100 dark:border-slate-800/50 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)]"
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-3 py-12 text-center">
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <Filter size={24} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{t('no_results')}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination && (
        <div className="flex-shrink-0 px-3 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
              {t('showing')} <span className="text-slate-900 dark:text-white">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> - <span className="text-slate-900 dark:text-white">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)}</span> {t('of')} <span className="text-slate-900 dark:text-white">{data.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className="bg-transparent border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 text-[9px] font-bold outline-none"
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('per_page')}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="w-7 h-7 p-0"
            >
              <ChevronsLeft size={12} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="w-7 h-7 p-0"
            >
              <ChevronLeft size={12} />
            </Button>
            
            <div className="flex items-center gap-1 px-2">
              <span className="text-[9px] font-black text-slate-900 dark:text-white">
                {table.getState().pagination.pageIndex + 1}
              </span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">/ {table.getPageCount()}</span>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="w-7 h-7 p-0"
            >
              <ChevronRight size={12} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="w-7 h-7 p-0"
            >
              <ChevronsRight size={12} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
