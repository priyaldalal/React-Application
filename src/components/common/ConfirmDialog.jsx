import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, X } from 'lucide-react';
import { clsx } from 'clsx';
import Button from '../ui/Button';
import { UI_CONFIG } from '../../config/uiConfig';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type = 'danger' }) => {
  const { t } = useTranslation(['dialog', 'common']);
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.15 }}
          style={{ maxWidth: UI_CONFIG.dialog.sm }}
          className="relative bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full border border-slate-200 dark:border-slate-800"
        >
          <div className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className={clsx(
                'w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0',
                type === 'danger'
                  ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500'
                  : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500'
              )}>
                <AlertTriangle size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
                  {title || t('confirm_title')}
                </h3>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                  {t('dialog:confirm_description')}
                </p>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors text-slate-400 flex-shrink-0">
                <X size={14} />
              </button>
            </div>

            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              {message || t('confirm_description')}
            </p>

            <div className="flex gap-2">
              <Button variant="secondary" onClick={onClose} size="sm" className="flex-1">
                {cancelText || t('common:cancel')}
              </Button>
              <Button
                onClick={onConfirm}
                size="sm"
                className={clsx(
                  'flex-1',
                  type === 'danger' ? 'bg-rose-600 hover:bg-rose-700' : ''
                )}
              >
                {confirmText || t('common:delete')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmDialog;
