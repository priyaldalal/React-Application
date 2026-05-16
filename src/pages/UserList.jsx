import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  MoreVertical,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { userService } from '../services/userService';
import UserForm from '../components/users/UserForm';
import Button from '../components/ui/Button';
import Skeleton from '../components/loaders/Skeleton';
import { toast } from 'react-toastify';
import { exportToCSV } from '../utils/csvExport';

import Pagination from '../components/common/Pagination';
import ConfirmDialog from '../components/common/ConfirmDialog';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Deletion State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers(userService.getUsers());
      setLoading(false);
    }, 800);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = useMemo(() => {
    const sortableItems = [...users];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [users, sortConfig]);

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter(user => 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.city.toLowerCase().includes(search.toLowerCase())
    );
  }, [sortedUsers, search]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      userService.deleteUser(userToDelete.id);
      loadUsers();
      toast.success('Account provision revoked successfully');
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden gap-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Active Accounts</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Enterprise Directory System</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => exportToCSV(users, 'users.csv')}>
            <Download size={14} className="mr-2" /> Export
          </Button>
          <Button onClick={() => { setEditingUser(null); setIsFormOpen(true); }}>
            <Plus size={14} className="mr-2" /> Provision Account
          </Button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="premium-card p-4 flex gap-4 items-center flex-shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search accounts by name, email or department..." 
            className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="secondary" className="px-3"><Filter size={18} /></Button>
      </div>

      {/* Table Container */}
      <div className="premium-card flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          <table className="w-full text-left min-w-full border-separate border-spacing-0">
            <thead className="bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-20 shadow-sm border-b border-slate-200 dark:border-slate-700">
              <tr>
                {[
                  { label: 'User Details', key: 'firstName', minWidth: '200px' },
                  { label: 'Contact', key: 'email', minWidth: '250px' },
                  { label: 'Employment', key: 'company', minWidth: '200px' },
                  { label: 'Status', key: 'status', minWidth: '150px' },
                  { label: 'Salary', key: 'salary', minWidth: '150px' }
                ].map(col => (
                  <th 
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{ minWidth: col.minWidth }}
                    className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors"
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      {col.label} <ArrowUpDown size={12} className="opacity-40" />
                    </div>
                  </th>
                ))}
                <th className="px-6 py-5 text-right sticky right-0 bg-slate-50 dark:bg-slate-800/50 z-10"><MoreVertical size={16} className="ml-auto text-slate-400" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-6"><Skeleton className="h-10 w-40" /></td>
                      <td className="px-6 py-6"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-6 py-6"><Skeleton className="h-4 w-48" /></td>
                      <td className="px-6 py-6"><Skeleton className="h-6 w-20 rounded-full" /></td>
                      <td className="px-6 py-6"><Skeleton className="h-4 w-16" /></td>
                      <td className="px-6 py-6"><Skeleton className="h-8 w-8 ml-auto rounded-lg" /></td>
                    </tr>
                  ))
                ) : currentRows.length === 0 ? (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td colSpan="6" className="px-6 py-24 text-center">
                      <div className="max-w-xs mx-auto space-y-3">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                          <Search size={32} />
                        </div>
                        <p className="text-slate-900 dark:text-white font-black">No accounts found</p>
                        <p className="text-sm text-slate-500">Try adjusting your search filters to find what you're looking for.</p>
                      </div>
                    </td>
                  </motion.tr>
                ) : (
                  currentRows.map((user, idx) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-300"
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black shadow-sm border border-indigo-100 dark:border-indigo-900/30">
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">{user.firstName} {user.lastName}</p>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{user.designation}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                            <Mail size={12} className="text-indigo-500" /> {user.email}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                            <Phone size={10} /> {user.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{user.company}</p>
                        <p className="text-[10px] font-black text-indigo-500/60 uppercase tracking-widest">{user.department}</p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={clsx(
                          "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                          user.status === 'Active' ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                          user.status === 'Inactive' ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400" :
                          "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                        )}>
                          <span className={clsx(
                            "w-1.5 h-1.5 rounded-full mr-2",
                            user.status === 'Active' ? "bg-green-500" : "bg-slate-400"
                          )}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <p className="text-sm font-black text-slate-900 dark:text-white">${user.salary.toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{user.experience}Y EXP</p>
                      </td>
                      <td className="px-6 py-5 text-right sticky right-0 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition-colors z-10 shadow-[-10px_0_10px_-10px_rgba(0,0,0,0.1)]">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => { setEditingUser(user); setIsFormOpen(true); }} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => handleDeleteClick(user)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={(size) => {
          setRowsPerPage(size);
          setCurrentPage(1);
        }}
      />

      {isFormOpen && (
        <UserForm 
          user={editingUser} 
          onSubmit={loading ? () => {} : (data) => {
            // Simplified for this demo
            toast.success('Record Updated');
            setIsFormOpen(false);
          }} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}

      <ConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Revoke Account Provision"
        message={`Are you sure you want to permanently remove ${userToDelete?.firstName} ${userToDelete?.lastName} from the system? This action will immediately terminate all access.`}
        confirmText="Confirm Revocation"
      />
    </div>
  );
};

export default UserList;
