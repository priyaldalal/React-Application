import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, X } from 'lucide-react';
import Button from '../ui/Button';
import { UI_CONFIG } from '../../config/uiConfig';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText,
  cancelText,
  type = "danger"
}) => {
  const { t } = useTranslation(['dialog', 'common']);
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Dialog Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          style={{ maxWidth: UI_CONFIG.dialog.sm }}
          className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={clsx(
                "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                type === 'danger' ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400" : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
              )}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
                  {title || t('confirm_title')}
                </h3>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  System Validation Required
                </p>
              </div>
              <button 
                onClick={onClose}
                className="ml-auto p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-slate-400"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 px-1">
              {message || t('confirm_description')}
            </p>

            <div className="flex gap-2.5">
              <Button 
                variant="secondary" 
                onClick={onClose}
                size="sm"
                className="flex-1"
              >
                {cancelText || t('cancel')}
              </Button>
              <Button 
                onClick={onConfirm}
                size="sm"
                className={clsx(
                  "flex-1 shadow-lg shadow-rose-500/20",
                  type === 'danger' ? "bg-rose-600 hover:bg-rose-700" : "bg-indigo-600 hover:bg-indigo-700"
                )}
              >
                {confirmText || t('delete')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Helper for clsx if not imported globally in this file
const clsx = (...classes) => classes.filter(Boolean).join(' ');

export default ConfirmDialog;
