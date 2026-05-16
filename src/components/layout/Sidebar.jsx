import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  Zap,
  LayoutGrid,
  Package
} from 'lucide-react';
import { clsx } from 'clsx';
import ThemeToggle from '../ui/ThemeToggle';
import Tooltip from '../ui/Tooltip';
import { UI_CONFIG } from '../../config/uiConfig';

const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const { t } = useTranslation('navbar');
  const navigate = useNavigate();

  const menuItems = [
    { name: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('users'), path: '/users', icon: Users },
    { name: t('products'), path: '/products', icon: Package },
    { name: t('card_view'), path: '/cards', icon: LayoutGrid },
    { name: t('registration'), path: '/registration', icon: FileText },
    { name: t('analytics'), path: '/analytics', icon: BarChart3 },
    { name: t('settings'), path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    navigate('/login');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? UI_CONFIG.sidebar.collapsedWidth : UI_CONFIG.sidebar.width }}
      className="fixed top-0 left-0 h-screen bg-card border-r border-border z-50 flex flex-col transition-all duration-300 shadow-xl dark:shadow-none"
    >
      {/* Sidebar Header */}
      <div className="h-10 flex items-center px-3 relative border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-indigo-500/30">
            <Zap size={14} fill="currentColor" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-md font-black tracking-tighter text-foreground whitespace-nowrap"
              >
                RECT.IO
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={toggleCollapse}
          className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform hidden md:flex z-50"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
            <ChevronLeft size={12} />
          </motion.div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {menuItems.map((item) => (
          <Tooltip key={item.path} content={item.name} position="right" disabled={!isCollapsed}>
            <NavLink
              to={item.path}
              className={({ isActive }) => clsx(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all duration-200 relative group overflow-hidden",
                isActive 
                  ? "text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-500/10" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {/* Active Indicator Bar */}
              <NavLink 
                to={item.path} 
                className={({ isActive }) => clsx(
                  "absolute left-0 top-1.5 bottom-1.5 w-1 bg-indigo-600 rounded-r-full transition-transform duration-300",
                  isActive ? "translate-x-0" : "-translate-x-full"
                )}
              />

              <item.icon size={14} className={clsx(
                "flex-shrink-0 transition-colors duration-200",
                "group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
              )} />
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-black text-[9px] uppercase tracking-widest whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Hover Highlight */}
              <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 dark:group-hover:bg-indigo-400/5 transition-colors pointer-events-none" />
            </NavLink>
          </Tooltip>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-2 border-t border-border space-y-2">
        <div className="px-2 py-1.5 flex items-center justify-between bg-slate-100/50 dark:bg-slate-800/50 rounded-md">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[8px] font-black text-slate-400 uppercase tracking-widest"
              >
                {t('theme_mode')}
              </motion.span>
            )}
          </AnimatePresence>
          <ThemeToggle className={isCollapsed ? "scale-75 -ml-1" : ""} />
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-2.5 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-all group relative overflow-hidden"
        >
          <LogOut size={12} className="flex-shrink-0 transition-transform group-hover:scale-110" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-black text-[9px] uppercase tracking-widest whitespace-nowrap"
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
