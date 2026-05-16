import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Bell, Info, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { UI_CONFIG } from '../../config/uiConfig';

const notificationsData = [
  {
    id: 1,
    title: 'New User Registered',
    message: 'A new enterprise account has been provisioned for Sarah Connor.',
    time: '2 mins ago',
    type: 'info',
    icon: Info,
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
  },
  {
    id: 2,
    title: 'System Alert',
    message: 'Inventory levels for SKU-402 are below threshold (12% remaining).',
    time: '45 mins ago',
    type: 'warning',
    icon: AlertTriangle,
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
  },
  {
    id: 3,
    title: 'Backup Successful',
    message: 'Global database synchronization completed across all clusters.',
    time: '2 hours ago',
    type: 'success',
    icon: CheckCircle,
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
  },
  {
    id: 4,
    title: 'Performance Spike',
    message: 'Real-time intelligence engine detected a 24% increase in API calls.',
    time: '5 hours ago',
    type: 'performance',
    icon: Zap,
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20'
  }
];

const NotificationDrawer = ({ isOpen, onClose, onClear }) => {
  const { t } = useTranslation('dialog');
  const [localNotifications, setLocalNotifications] = React.useState(notificationsData);

  const handleClear = () => {
    setLocalNotifications([]);
    onClear();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{ width: UI_CONFIG.notifications.width }}
            className="fixed top-0 right-0 h-screen bg-white dark:bg-slate-900 shadow-2xl z-[101] border-l border-slate-100 dark:border-slate-800 flex flex-col"
          >
            <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-600 rounded-md text-white shadow-lg shadow-indigo-600/20">
                  <Bell size={12} />
                </div>
                <div>
                  <h2 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{t('notification_title')}</h2>
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">Event Monitor</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar p-2 space-y-1.5">
              {localNotifications.length > 0 ? (
                localNotifications.map((n) => (
                  <motion.div 
                    layout
                    key={n.id}
                    className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-transparent hover:border-indigo-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex gap-2">
                      <div className={`p-1.5 h-7 w-7 rounded-md flex items-center justify-center flex-shrink-0 ${n.color}`}>
                        <n.icon size={12} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest truncate">
                            {n.title}
                          </h4>
                          <span className="text-[7px] font-bold text-slate-400 uppercase whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 line-clamp-2">
                          {n.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-50">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-3">
                    <CheckCircle size={24} />
                  </div>
                  <h3 className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest">System Clear</h3>
                  <p className="text-[8px] text-slate-500 dark:text-slate-400 mt-0.5">No active alerts detected.</p>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <button 
                onClick={handleClear}
                disabled={localNotifications.length === 0}
                className="w-full py-1.5 bg-indigo-600 text-white disabled:opacity-30 disabled:grayscale text-[9px] font-black uppercase tracking-widest rounded-md transition-all shadow-lg shadow-indigo-600/20"
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
