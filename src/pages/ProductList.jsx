import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  ArrowUpDown
} from 'lucide-react';
import { productService } from '../services/productService';
import Button from '../ui/Button';
import Skeleton from '../components/loaders/Skeleton';
import { clsx } from 'clsx';
import { toast } from 'react-toastify';
import Pagination from '../components/common/Pagination';
import { UI_CONFIG } from '../config/uiConfig';

const ProductList = () => {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    setTimeout(() => {
      setProducts(productService.getProducts());
      setLoading(false);
    }, 800);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProducts.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  const columns = [
    { label: t('id'), key: 'id' },
    { label: t('sku'), key: 'sku' },
    { label: t('name'), key: 'name' },
    { label: t('category'), key: 'category' },
    { label: t('brand'), key: 'brand' },
    { label: t('price'), key: 'price' },
    { label: t('cost'), key: 'cost' },
    { label: t('margin'), key: 'margin' },
    { label: t('stock'), key: 'stock' },
    { label: t('reorder'), key: 'reorderLevel' },
    { label: t('status'), key: 'status' },
    { label: t('supplier'), key: 'supplier' },
    { label: t('warehouse'), key: 'warehouse' },
    { label: t('weight'), key: 'weight' },
    { label: t('dimensions'), key: 'dimensions' },
    { label: t('color'), key: 'color' },
    { label: t('material'), key: 'material' },
    { label: t('rating'), key: 'rating' },
    { label: t('reviews'), key: 'reviews' },
    { label: t('description'), key: 'description' }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden gap-3">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 flex-shrink-0">
        <div>
          <h1 className="text-[16px] font-black text-slate-900 dark:text-white tracking-tight uppercase">{t('inventory_catalog')}</h1>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{t('global_supply_chain')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => toast.info('Exporting...')}><Download size={10} className="mr-2" /> {t('export')}</Button>
          <Button size="sm" onClick={() => toast.success('Add Product Modal coming soon!')}><Plus size={10} className="mr-2" /> {t('add_product')}</Button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="premium-card p-1.5 flex gap-2 items-center flex-shrink-0 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={12} />
          <input 
            type="text" 
            placeholder={t('search_products')} 
            className="w-full bg-slate-50/50 dark:bg-slate-950 border border-transparent focus:border-indigo-500/30 rounded-md pl-8 pr-4 py-1 text-[10px] focus:ring-2 focus:ring-indigo-500/10 transition-all font-black placeholder:text-slate-400 uppercase tracking-tight"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <Button variant="secondary" size="sm" className="px-2 py-1 h-auto"><Filter size={12} /></Button>
      </div>

      {/* Table Container */}
      <div className="premium-card flex-1 flex flex-col overflow-hidden border-slate-100 dark:border-slate-800">
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          <table className="w-full text-left table-auto">
            <thead className="bg-slate-50/80 dark:bg-slate-900/80 sticky top-0 z-20 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
              <tr>
                {columns.map(col => (
                  <th 
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-3 py-2 text-[8px] font-black uppercase tracking-widest text-slate-400 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap min-w-[80px]"
                  >
                    <div className="flex items-center gap-1">
                      {col.label} <ArrowUpDown size={8} className="opacity-40" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array.from({ length: 15 }).map((_, i) => (
                    <tr key={i}>
                      {columns.map((_, j) => (
                        <td key={j} className="px-3 py-2"><Skeleton className="h-2 w-16" /></td>
                      ))}
                    </tr>
                  ))
                ) : (
                  currentRows.map((product, idx) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all"
                    >
                      <td className="px-3 py-1.5 font-black text-indigo-600 dark:text-indigo-400 whitespace-nowrap text-[9px]">{product.id}</td>
                      <td className="px-3 py-1.5 font-black text-slate-400 dark:text-slate-500 whitespace-nowrap text-[9px]">{product.sku}</td>
                      <td className="px-3 py-1.5 font-black text-slate-900 dark:text-white whitespace-nowrap text-[10px] uppercase tracking-tight">{product.name}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[7px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 font-black text-slate-500 dark:text-slate-400 whitespace-nowrap text-[9px]">{product.brand}</td>
                      <td className="px-3 py-1.5 font-black text-slate-900 dark:text-white whitespace-nowrap text-[10px] tracking-tight">${product.price}</td>
                      <td className="px-3 py-1.5 text-slate-400 dark:text-slate-500 whitespace-nowrap text-[9px] font-bold">${product.cost}</td>
                      <td className="px-3 py-1.5 font-black text-emerald-500 whitespace-nowrap text-[9px]">{product.margin}</td>
                      <td className="px-3 py-1.5 font-black whitespace-nowrap text-[9px] text-slate-700 dark:text-slate-300">{product.stock}</td>
                      <td className="px-3 py-1.5 text-slate-400 whitespace-nowrap text-[9px] font-black opacity-40">{product.reorderLevel}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <span className={clsx(
                          "inline-flex items-center px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest",
                          product.status === 'Active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400"
                        )}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-slate-400 dark:text-slate-500 whitespace-nowrap max-w-[120px] truncate text-[9px] font-black">{product.supplier}</td>
                      <td className="px-3 py-1.5 font-black text-slate-500 dark:text-slate-400 whitespace-nowrap text-[9px]">{product.warehouse}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap text-[9px] font-black text-slate-400">{product.weight} KG</td>
                      <td className="px-3 py-1.5 whitespace-nowrap text-[8px] font-black text-slate-300 uppercase">{product.dimensions}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap text-[9px]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm" style={{ backgroundColor: product.color.toLowerCase() }}></div>
                          <span className="font-black text-slate-400 uppercase tracking-tighter">{product.color}</span>
                        </div>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap text-[9px] font-black text-slate-400 uppercase">{product.material}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap font-black text-amber-500 text-[9px]">{product.rating} ★</td>
                      <td className="px-3 py-1.5 whitespace-nowrap text-slate-400 text-[9px] font-black">{product.reviews} <span className="opacity-40">REV</span></td>
                      <td className="px-3 py-1.5 text-[8px] text-slate-400 min-w-[180px] truncate uppercase font-black tracking-tight">{product.description}</td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={(size) => {
          setRowsPerPage(size);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default ProductList;
