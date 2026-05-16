import React from 'react';
import { FiMenu, FiMoon, FiSun, FiUser, FiBell } from 'react-icons/fi';
import { useDarkMode } from '../../hooks/useDarkMode';

const Navbar = ({ toggleSidebar }) => {
  const [dark, setDark] = useDarkMode();
  const authUser = JSON.parse(localStorage.getItem('auth_user') || '{"email": "Guest"}');

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 md:hidden"
          >
            <FiMenu size={20} />
          </button>
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider">Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <button className="p-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 relative">
            <FiBell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={() => setDark(!dark)}
            className="p-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            {dark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <div className="h-8 w-px bg-gray-200 dark:bg-slate-700 mx-2"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{authUser.email.split('@')[0]}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border-2 border-indigo-200 dark:border-indigo-800">
              <FiUser size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
