import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLayout, FiUsers, FiGrid, FiLogOut, FiX, FiPlus } from 'react-icons/fi';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiLayout size={20} /> },
    { name: 'User List', path: '/users', icon: <FiUsers size={20} /> },
    { name: 'Card View', path: '/cards', icon: <FiGrid size={20} /> },
    { name: 'Registration', path: '/registration', icon: <FiPlus size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-screen transition-transform duration-300 transform 
        bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-slate-700">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">ReCT Admin</span>
            <button className="md:hidden" onClick={toggleSidebar}>
              <FiX size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'}
                `}
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-gray-200 dark:border-slate-700">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all"
            >
              <FiLogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
