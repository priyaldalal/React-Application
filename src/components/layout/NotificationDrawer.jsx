import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Bell, Info, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { UI_CONFIG } from '../../config/uiConfig';

const notificationsData = [
  { id: 1, title: 'New User Registered',   message: 'Enterprise account provisioned for Sarah Connor.',        time: '2m ago',  icon: Info,          color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { id: 2, title: 'System Alert',          message: 'Inventory for SKU-402 below threshold (12%).',            time: '45m ago', icon: AlertTriangle, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  { id: 3, title: 'Backup Successful',     message: 'Database sync completed across all clusters.',            time: '2h ago',  icon: CheckCircle,   color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' },
  { id: 4, title: 'Performance Spike',     message: 'Intelligence engine detected 24% increase in API calls.', time: '5h ago',  icon: Zap,           color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
];

const NotificationDrawer = ({ isOpen, onClose, onClear }) => {
  const { t } = useTranslation('dialog');
  const [items, setItems] = React.useState(notificationsData);

  const handleClear = () => { setItems([]); onClear(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{ width: UI_CONFIG.notifications.width }}
            className="fixed top-0 right-0 h-screen bg-white dark:bg-slate-950 shadow-xl z-[101] border-l border-slate-100 dark:border-slate-800 flex flex-col"
          >
            {/* Header */}
            <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-600 rounded-md text-white"><Bell size={11} /></div>
                <div>
                  <h2 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('notification_title')}</h2>
                  <p className="text-[7px] font-medium text-slate-400">Event Monitor</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 transition-colors">
                <X size={14} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-auto p-1.5 space-y-1">
              {items.length > 0 ? items.map(n => (
                <div key={n.id} className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-md hover:border-indigo-500/20 border border-transparent transition-colors cursor-pointer">
                  <div className="flex gap-2">
                    <div className={`p-1 w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${n.color}`}>
                      <n.icon size={11} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-[9px] font-bold text-slate-900 dark:text-white truncate">{n.title}</h4>
                        <span className="text-[7px] font-medium text-slate-400 whitespace-nowrap">{n.time}</span>
                      </div>
                      <p className="text-[8px] text-slate-500 leading-tight mt-0.5 line-clamp-2">{n.message}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-50">
                  <CheckCircle size={24} className="text-slate-300 mb-2" />
                  <h3 className="text-[9px] font-bold text-slate-500">All clear</h3>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
              <button
                onClick={handleClear}
                disabled={items.length === 0}
                className="w-full h-7 bg-indigo-600 text-white disabled:opacity-30 text-[8px] font-bold uppercase tracking-wider rounded-md transition-all"
              >
                {t('mark_read')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDrawer;
