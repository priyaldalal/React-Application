import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  ArrowUpDown,
  Mail,
  Phone
} from 'lucide-react';
import { userService } from '../services/userService';
import UserForm from '../components/users/UserForm';
import Button from '../ui/Button';
import Skeleton from '../components/loaders/Skeleton';
import { toast } from 'react-toastify';
import { exportToCSV } from '../utils/csvExport';
import Pagination from '../components/common/Pagination';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { UI_CONFIG } from '../config/uiConfig';

const UserList = () => {
  const { t } = useTranslation('common');
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
      toast.success(t('success'));
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden gap-3">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 flex-shrink-0">
        <div>
          <h1 className="text-[16px] font-black text-slate-900 dark:text-white tracking-tight uppercase">{t('active_accounts')}</h1>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{t('enterprise_directory')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => exportToCSV(users, 'users.csv')} size="sm">
            <Download size={10} className="mr-2" /> {t('export')}
          </Button>
          <Button onClick={() => { setEditingUser(null); setIsFormOpen(true); }} size="sm">
            <Plus size={10} className="mr-2" /> {t('provision_account')}
          </Button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="premium-card p-1.5 flex gap-2 items-center flex-shrink-0 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={12} />
          <input 
            type="text" 
            placeholder={t('search_accounts')} 
            className="w-full bg-slate-50/50 dark:bg-slate-950 border border-transparent focus:border-indigo-500/30 rounded-md pl-8 pr-4 py-1 text-[10px] focus:ring-2 focus:ring-indigo-500/10 transition-all font-black placeholder:text-slate-400 uppercase tracking-tight"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="secondary" size="sm" className="px-2 py-1 h-auto"><Filter size={12} /></Button>
      </div>

      {/* Table Container */}
      <div className="premium-card flex-1 flex flex-col overflow-hidden border-slate-100 dark:border-slate-800">
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          <table className="w-full text-left table-auto">
            <thead className="bg-slate-50/80 dark:bg-slate-900/80 sticky top-0 z-20 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
              <tr>
                {[
                  { label: t('user_details'), key: 'firstName', minWidth: '150px' },
                  { label: t('contact'), key: 'email', minWidth: '180px' },
                  { label: t('employment'), key: 'company', minWidth: '150px' },
                  { label: t('status'), key: 'status', minWidth: '100px' },
                  { label: t('salary'), key: 'salary', minWidth: '100px' }
                ].map(col => (
                  <th 
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{ minWidth: col.minWidth }}
                    className="px-3 py-2 text-[8px] font-black uppercase tracking-widest text-slate-400 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      {col.label} <ArrowUpDown size={8} className="opacity-40" />
                    </div>
                  </th>
                ))}
                <th className="px-3 py-2 text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array.from({ length: 15 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan="6" className="px-3 py-2"><Skeleton className="h-4 w-full" /></td>
                    </tr>
                  ))
                ) : currentRows.length === 0 ? (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td colSpan="6" className="px-3 py-20 text-center">
                      <div className="max-w-xs mx-auto space-y-2 opacity-50">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-300">
                          <Search size={24} />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{t('no_accounts_found')}</h3>
                        <p className="text-[9px] text-slate-500">{t('adjust_filters')}</p>
                      </div>
                    </td>
                  </motion.tr>
                ) : (
                  currentRows.map((user, idx) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all"
                    >
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-md bg-indigo-600/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-[9px] border border-indigo-100 dark:border-indigo-900/30">
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-900 dark:text-white leading-none truncate uppercase tracking-tight">{user.firstName} {user.lastName}</p>
                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-0.5 truncate">{user.designation}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-600 dark:text-slate-400">
                            <Mail size={10} className="text-indigo-500/50" /> {user.email}
                          </div>
                          <div className="flex items-center gap-1 text-[7px] font-black text-slate-400 uppercase tracking-tighter">
                            <Phone size={8} /> {user.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <p className="text-[9px] font-black text-slate-700 dark:text-slate-300 leading-none truncate uppercase tracking-tight">{user.company}</p>
                        <p className="text-[7px] font-black text-indigo-500/60 uppercase tracking-widest mt-0.5">{user.department}</p>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <span className={clsx(
                          "inline-flex items-center px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest",
                          user.status === 'Active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" :
                          user.status === 'Inactive' ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400" :
                          "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                        )}>
                          <span className={clsx(
                            "w-1 h-1 rounded-full mr-1",
                            user.status === 'Active' ? "bg-emerald-500" : "bg-slate-400"
                          )}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <p className="text-[10px] font-black text-slate-900 dark:text-white leading-none">${user.salary.toLocaleString()}</p>
                        <p className="text-[7px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">{user.experience}Y EXP</p>
                      </td>
                      <td className="px-3 py-1.5 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditingUser(user); setIsFormOpen(true); }} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 rounded transition-all">
                            <Edit3 size={12} />
                          </button>
                          <button onClick={() => handleDeleteClick(user)} className="p-1 text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 rounded transition-all">
                            <Trash2 size={12} />
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
          onSubmit={(data) => {
            toast.success(t('success'));
            setIsFormOpen(false);
          }} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}

      <ConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title={t('revoke_provision_title')}
        message={t('revoke_provision_msg', { name: `${userToDelete?.firstName} ${userToDelete?.lastName}` })}
        confirmText={t('confirm_revocation')}
      />
    </div>
  );
};

export default UserList;
