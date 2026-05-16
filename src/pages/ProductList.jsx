import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  MoreVertical,
  Package,
  ShoppingCart,
  Tag,
  Warehouse
} from 'lucide-react';
import { productService } from '../services/productService';
import Button from '../components/ui/Button';
import Skeleton from '../components/loaders/Skeleton';
import { clsx } from 'clsx';
import { toast } from 'react-toastify';
import Pagination from '../components/common/Pagination';

const ProductList = () => {
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
    { label: 'ID', key: 'id' },
    { label: 'SKU', key: 'sku' },
    { label: 'Name', key: 'name' },
    { label: 'Category', key: 'category' },
    { label: 'Brand', key: 'brand' },
    { label: 'Price', key: 'price' },
    { label: 'Cost', key: 'cost' },
    { label: 'Margin', key: 'margin' },
    { label: 'Stock', key: 'stock' },
    { label: 'Reorder', key: 'reorderLevel' },
    { label: 'Status', key: 'status' },
    { label: 'Supplier', key: 'supplier' },
    { label: 'Warehouse', key: 'warehouse' },
    { label: 'Weight', key: 'weight' },
    { label: 'Dimensions', key: 'dimensions' },
    { label: 'Color', key: 'color' },
    { label: 'Material', key: 'material' },
    { label: 'Rating', key: 'rating' },
    { label: 'Reviews', key: 'reviews' },
    { label: 'Description', key: 'description' }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden gap-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Inventory Catalog</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage global stock and supply chain data.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary"><Download size={18} className="mr-2" /> Export</Button>
          <Button><Plus size={18} className="mr-2" /> Add Product</Button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="premium-card p-4 flex gap-4 items-center flex-shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, SKU, or category..." 
            className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <Button variant="secondary" className="px-3"><Filter size={18} /></Button>
      </div>

      {/* Table Container with Dual Scroll */}
      <div className="premium-card flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          <table className="w-full text-left table-auto">
            <thead className="bg-background/50 sticky top-0 z-20 shadow-sm border-b border-border">
              <tr>
                {columns.map(col => (
                  <th 
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 cursor-pointer hover:text-primary transition-colors whitespace-nowrap min-w-[120px]"
                  >
                    <div className="flex items-center gap-2">
                      {col.label} <ArrowUpDown size={12} className="opacity-40" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i}>
                      {columns.map((_, j) => (
                        <td key={j} className="px-6 py-6"><Skeleton className="h-4 w-24" /></td>
                      ))}
                    </tr>
                  ))
                ) : (
                  currentRows.map((product, idx) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-300"
                    >
                      <td className="px-6 py-5 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">{product.id}</td>
                      <td className="px-6 py-5 font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">{product.sku}</td>
                      <td className="px-6 py-5 font-black text-slate-900 dark:text-white whitespace-nowrap">{product.name}</td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-wider">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">{product.brand}</td>
                      <td className="px-6 py-5 font-black text-slate-900 dark:text-white whitespace-nowrap">${product.price}</td>
                      <td className="px-6 py-5 text-slate-500 whitespace-nowrap">${product.cost}</td>
                      <td className="px-6 py-5 font-bold text-green-500 whitespace-nowrap">{product.margin}</td>
                      <td className="px-6 py-5 font-bold whitespace-nowrap">{product.stock}</td>
                      <td className="px-6 py-5 text-slate-400 whitespace-nowrap">{product.reorderLevel}</td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={clsx(
                          "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                          product.status === 'Active' ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        )}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-slate-500 whitespace-nowrap max-w-xs truncate">{product.supplier}</td>
                      <td className="px-6 py-5 font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap">{product.warehouse}</td>
                      <td className="px-6 py-5 whitespace-nowrap">{product.weight} kg</td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-medium text-slate-400">{product.dimensions}</td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color.toLowerCase() }}></div>
                          {product.color}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">{product.material}</td>
                      <td className="px-6 py-5 whitespace-nowrap font-black text-amber-500">{product.rating} ⭐</td>
                      <td className="px-6 py-5 whitespace-nowrap text-slate-400">{product.reviews} reviews</td>
                      <td className="px-6 py-5 text-xs text-slate-400 min-w-[300px] truncate">{product.description}</td>
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
