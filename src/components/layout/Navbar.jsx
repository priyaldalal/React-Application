import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Bell, Menu, LogOut, User, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../ui/Tooltip';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';
import NotificationDrawer from './NotificationDrawer';

const Navbar = ({ onMenuClick }) => {
  const { t } = useTranslation(['navbar', 'common']);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const dropdownRef = useRef(null);

  const authUser = JSON.parse(localStorage.getItem('auth_user') || '{"firstName":"Guest"}');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    navigate('/login');
  };

  return (
    <header className="sticky top-2 z-40 w-[calc(100%-1rem)] mx-auto h-10 glass-effect !bg-white/70 dark:!bg-slate-900/70 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-shrink-0">
      <div className="h-full px-3 flex items-center justify-between gap-3">
        {/* Left: Menu + Search */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button 
            onClick={onMenuClick}
            className="p-1.5 md:hidden text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            <Menu size={16} />
          </button>
          
          <div className="relative hidden sm:flex items-center flex-1 max-w-[220px] group">
            <Search className="absolute left-2.5 text-slate-400 group-focus-within:text-indigo-500 transition-all pointer-events-none" size={11} />
            <input 
              type="text" 
              placeholder={t('search_placeholder')} 
              className="w-full bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 focus:border-indigo-500/30 rounded-lg pl-8 pr-3 py-1 text-[9px] font-bold focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-inner"
            />
          </div>
        </div>

        {/* Right: Utilities */}
        <div className="flex items-center gap-1">
          <Tooltip content={t('notifications')} position="bottom">
            <button 
              onClick={() => setShowNotifications(true)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all relative"
            >
              <Bell size={14} />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-600 rounded-full border border-white dark:border-slate-900" />
              )}
            </button>
          </Tooltip>

          <LanguageSelector />

          <Tooltip content={t('theme_mode')} position="bottom">
            <ThemeToggle />
          </Tooltip>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1.5 py-1 pl-1.5 pr-2 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all group border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
            >
              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {authUser.firstName} {authUser.lastName || ''}
                </p>
                <p className="text-[7px] font-bold text-indigo-500 uppercase tracking-wider mt-0.5 opacity-80">
                  {t('owner')}
                </p>
              </div>
              <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-[9px] font-black shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                {authUser.firstName?.[0]}
              </div>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg shadow-xl z-50 overflow-hidden"
                >
                  <div className="px-3 py-2 border-b border-slate-50 dark:border-slate-800">
                    <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{t('navbar:profile_menu')}</p>
                    <p className="text-[10px] font-black text-slate-900 dark:text-white truncate mt-0.5">{authUser.firstName}</p>
                  </div>
                  <div className="p-0.5">
                    <button className="flex items-center gap-2 w-full px-2.5 py-1.5 text-[9px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">
                      <User size={12} /> {t('settings')}
                    </button>
                    <button className="flex items-center gap-2 w-full px-2.5 py-1.5 text-[9px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">
                      <Shield size={12} /> Privacy
                    </button>
                  </div>
                  <div className="p-0.5 border-t border-slate-50 dark:border-slate-800">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-2.5 py-1.5 text-[9px] font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-md transition-colors"
                    >
                      <LogOut size={12} /> {t('sign_out')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <NotificationDrawer 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
        onClear={() => setNotificationCount(0)}
      />
    </header>
  );
};

export default Navbar;
