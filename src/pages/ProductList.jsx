import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Download, 
} from 'lucide-react';
import { productService } from '../services/productService';
import Button from '../components/ui/Button';
import DataTable from '../components/ui/DataTable';
import { toast } from 'react-toastify';
import { clsx } from 'clsx';

const ProductList = () => {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: t('id'),
      cell: ({ getValue }) => (
        <span className="font-black text-indigo-600 dark:text-indigo-400 text-[9px]">
          {getValue()}
        </span>
      ),
      size: 60,
    },
    {
      accessorKey: 'name',
      header: t('name'),
      cell: ({ getValue }) => (
        <span className="font-black text-slate-900 dark:text-white text-[10px] uppercase tracking-tight">
          {getValue()}
        </span>
      ),
      size: 200,
    },
    {
      accessorKey: 'sku',
      header: t('sku'),
      cell: ({ getValue }) => (
        <span className="font-bold text-slate-400 dark:text-slate-500 text-[9px]">
          {getValue()}
        </span>
      ),
      size: 100,
    },
    {
      accessorKey: 'category',
      header: t('category'),
      cell: ({ getValue }) => (
        <span className="badge badge-neutral">
          {getValue()}
        </span>
      ),
      size: 100,
    },
    {
      accessorKey: 'price',
      header: t('price'),
      cell: ({ getValue }) => (
        <span className="font-black text-slate-900 dark:text-white tracking-tight">
          ${getValue()}
        </span>
      ),
      size: 80,
    },
    {
      accessorKey: 'stock',
      header: t('stock'),
      cell: ({ getValue }) => (
        <span className="font-black text-slate-700 dark:text-slate-300">
          {getValue()}
        </span>
      ),
      size: 80,
    },
    {
      accessorKey: 'status',
      header: t('status'),
      cell: ({ getValue }) => {
        const status = getValue();
        return (
          <span className={clsx(
            "badge",
            status === 'Active' ? "badge-success" : "badge-danger"
          )}>
            {status}
          </span>
        );
      },
      size: 100,
    },
    { accessorKey: 'brand', header: t('brand'), size: 100 },
    { accessorKey: 'cost', header: t('cost'), cell: ({ getValue }) => `$${getValue()}`, size: 80 },
    { accessorKey: 'margin', header: t('margin'), cell: ({ getValue }) => <span className="text-emerald-500 font-bold">{getValue()}</span>, size: 80 },
    { accessorKey: 'reorderLevel', header: t('reorder'), size: 80 },
    { accessorKey: 'supplier', header: t('supplier'), size: 150 },
    { accessorKey: 'warehouse', header: t('warehouse'), size: 120 },
    { accessorKey: 'weight', header: t('weight'), cell: ({ getValue }) => `${getValue()} KG`, size: 100 },
    { accessorKey: 'dimensions', header: t('dimensions'), size: 120 },
    {
      accessorKey: 'color',
      header: t('color'),
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full border border-slate-200 dark:border-slate-700" style={{ backgroundColor: getValue().toLowerCase() }} />
          <span className="uppercase">{getValue()}</span>
        </div>
      ),
      size: 100,
    },
    { accessorKey: 'material', header: t('material'), size: 100 },
    { accessorKey: 'rating', header: t('rating'), cell: ({ getValue }) => <span className="text-amber-500 font-black">{getValue()} ★</span>, size: 80 },
    { accessorKey: 'reviews', header: t('reviews'), size: 80 },
    { accessorKey: 'description', header: t('description'), size: 250 },
  ], [t]);

  return (
    <div className="h-full flex flex-col overflow-hidden gap-2">
      <DataTable
        data={products}
        columns={columns}
        isLoading={loading}
        title={t('inventory_catalog')}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => toast.info('Exporting...')}><Download size={10} className="mr-2" /> {t('export')}</Button>
            <Button size="sm" onClick={() => toast.success('Add Product Modal coming soon!')}><Plus size={10} className="mr-2" /> {t('add_product')}</Button>
          </>
        }
      />
    </div>
  );
};

export default ProductList;
