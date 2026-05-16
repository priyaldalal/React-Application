import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Bell, Menu, LogOut, User, Settings, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../ui/Tooltip';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';
import NotificationDrawer from './NotificationDrawer';
import { UI_CONFIG } from '../../config/uiConfig';

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
    <header className="sticky top-1.5 z-40 w-[calc(100%-1.25rem)] mx-auto h-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Side: Search */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="p-1.5 md:hidden text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            <Menu size={18} />
          </button>
          
          <div className="relative hidden sm:block w-48 group">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={10} />
            <input 
              type="text" 
              placeholder={t('search_placeholder')} 
              className="w-full bg-slate-100/50 dark:bg-slate-800/50 border border-transparent focus:border-indigo-500/30 rounded-md pl-7 pr-2.5 py-1 text-[9px] focus:ring-2 focus:ring-indigo-500/10 transition-all font-bold placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Side: Utilities */}
        <div className="flex items-center gap-1.5">
          <Tooltip content={t('notifications')} position="bottom">
            <button 
              onClick={() => setShowNotifications(true)}
              className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all relative group"
            >
              <Bell size={12} className="group-hover:rotate-12 transition-transform" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-600 rounded-full border border-white dark:border-slate-900 animate-pulse"></span>
              )}
            </button>
          </Tooltip>

          <LanguageSelector />

          <Tooltip content={t('theme_mode')} position="bottom">
            <ThemeToggle />
          </Tooltip>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Tooltip content={t('profile_menu')} position="bottom">
              <div 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1.5 group cursor-pointer pl-1 py-1 px-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="text-right hidden sm:block leading-none">
                  <p className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    {authUser.firstName} {authUser.lastName || ''}
                  </p>
                  <p className="text-[7px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mt-0.5 opacity-80">
                    {t('owner')}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white text-[9px] font-black shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                  {authUser.firstName?.[0]}
                </div>
              </div>
            </Tooltip>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl z-50 overflow-hidden"
                >
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('welcome')}</p>
                    <p className="text-[10px] font-black text-slate-900 dark:text-white truncate">{authUser.firstName}</p>
                  </div>
                  
                  <div className="p-1">
                    <button className="flex items-center gap-2 w-full px-2 py-1.5 text-[9px] font-black text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors uppercase tracking-widest">
                      <User size={12} /> {t('settings')}
                    </button>
                    <button className="flex items-center gap-2 w-full px-2 py-1.5 text-[9px] font-black text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors uppercase tracking-widest">
                      <Shield size={12} /> Privacy
                    </button>
                  </div>

                  <div className="p-1 border-t border-slate-100 dark:border-slate-800">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-2 py-1.5 text-[9px] font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-md transition-colors uppercase tracking-widest"
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
