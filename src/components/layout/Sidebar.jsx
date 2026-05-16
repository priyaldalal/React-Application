import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, Users, FileText, BarChart3, Settings, 
  LogOut, ChevronLeft, Zap, LayoutGrid, Package
} from 'lucide-react';
import { clsx } from 'clsx';
import Tooltip from '../ui/Tooltip';
import { UI_CONFIG } from '../../config/uiConfig';

const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const { t } = useTranslation('navbar');
  const navigate = useNavigate();

  const menuItems = [
    { name: t('dashboard'),     path: '/dashboard',     icon: LayoutDashboard },
    { name: t('users'),         path: '/users',         icon: Users },
    { name: t('products'),      path: '/products',      icon: Package },
    { name: t('card_view'),     path: '/cards',         icon: LayoutGrid },
    { name: t('registration'),  path: '/registration',  icon: FileText },
    { name: t('analytics'),     path: '/analytics',     icon: BarChart3 },
    { name: t('settings'),      path: '/settings',      icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    navigate('/login');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? UI_CONFIG.sidebar.collapsedWidth : UI_CONFIG.sidebar.width }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 left-0 h-screen bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-r border-slate-100/50 dark:border-slate-800/50 z-50 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
    >
      {/* ── Header ── */}
      <div className="h-10 flex items-center px-3 border-b border-slate-100/50 dark:border-slate-800/50 relative flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-indigo-500/30">
            <Zap size={12} fill="currentColor" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-[13px] font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap overflow-hidden"
              >
                RECT.IO
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={toggleCollapse}
          className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform hidden md:flex z-50"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronLeft size={11} />
          </motion.div>
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-1.5 py-4 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {menuItems.map((item) => (
          <Tooltip key={item.path} content={item.name} position="right" disabled={!isCollapsed}>
            <NavLink
              to={item.path}
              className={({ isActive }) => clsx(
                "w-full flex items-center gap-2.5 px-2.5 rounded-lg transition-all duration-300 relative group overflow-hidden",
                isCollapsed ? "justify-center px-0" : "",
                isActive
                  ? "bg-gradient-to-r from-indigo-500/10 to-transparent text-indigo-600 dark:text-indigo-400 active-glow"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 hover:text-slate-700 dark:hover:text-slate-200"
              )}
              style={{ height: UI_CONFIG.sidebar.itemHeight }}
            >
              {({ isActive }) => (
                <>
                  {/* Left active indicator */}
                  <div className={clsx(
                    "absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-r-full transition-all duration-300 shadow-[0_0_8px_rgba(79,70,229,0.4)]",
                    isActive ? "bg-indigo-600 dark:bg-indigo-400" : "bg-transparent -translate-x-full"
                  )} />

                  <item.icon size={14} className={clsx(
                    "flex-shrink-0 transition-all duration-300 group-hover:scale-110",
                    isActive ? "text-indigo-600 dark:text-indigo-400 drop-shadow-[0_0_3px_rgba(99,102,241,0.3)]" : ""
                  )} />

                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className={clsx(
                          "text-[10px] uppercase tracking-wider whitespace-nowrap overflow-hidden",
                          isActive ? "font-black" : "font-bold"
                        )}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          </Tooltip>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="p-1.5 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
        <button
          onClick={handleLogout}
          className={clsx(
            "flex items-center gap-2.5 w-full px-2.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-md transition-all group",
            isCollapsed ? "justify-center px-0" : ""
          )}
          style={{ height: UI_CONFIG.sidebar.itemHeight }}
        >
          <LogOut size={14} className="flex-shrink-0 group-hover:scale-105 transition-transform" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap overflow-hidden"
              >
                {t('sign_out')}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
