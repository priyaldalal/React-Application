import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('auth_user');

  useEffect(() => { setIsMobileOpen(false); }, [location]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300 overflow-hidden">
      {/* Sidebar — Desktop */}
      <div className="hidden md:block">
        <Sidebar isCollapsed={isCollapsed} toggleCollapse={() => setIsCollapsed(!isCollapsed)} />
      </div>

      {/* Sidebar — Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] md:hidden"
            />
            <motion.div
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-screen w-[240px] z-[60] md:hidden"
            >
              <Sidebar isCollapsed={false} toggleCollapse={() => setIsMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-200 ${isCollapsed ? 'md:ml-[52px]' : 'md:ml-[200px]'}`}>
        <Navbar onMenuClick={() => setIsMobileOpen(true)} />

        <main className="flex-1 px-2 md:px-3 pb-2 flex flex-col overflow-hidden">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 py-1.5 text-[8px] font-bold uppercase tracking-wider text-slate-400 flex-shrink-0">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Console</span>
            <span className="opacity-30">/</span>
            <span className="text-slate-600 dark:text-slate-300">
              {location.pathname.substring(1) || 'Dashboard'}
            </span>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
