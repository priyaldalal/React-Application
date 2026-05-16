import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Download, 
  Edit3, 
  Trash2, 
  Mail,
  Phone,
  User as UserIcon
} from 'lucide-react';
import { userService } from '../services/userService';
import UserForm from '../components/users/UserForm';
import Button from '../components/ui/Button';
import DataTable from '../components/ui/DataTable';
import { toast } from 'react-toastify';
import { exportToCSV } from '../utils/csvExport';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { clsx } from 'clsx';

const UserList = () => {
  const { t } = useTranslation('common');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
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

  const confirmDelete = () => {
    if (userToDelete) {
      userService.deleteUser(userToDelete.id);
      loadUsers();
      toast.success(t('success'));
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const columns = useMemo(() => [
    {
      id: 'name',
      header: t('user_details'),
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-indigo-600/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-[9px] border border-indigo-100 dark:border-indigo-900/30">
            {row.original.firstName[0]}{row.original.lastName[0]}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black text-slate-900 dark:text-white leading-none truncate uppercase tracking-tight">
              {row.original.firstName} {row.original.lastName}
            </p>
            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-0.5 truncate">
              {row.original.designation}
            </p>
          </div>
        </div>
      ),
      size: 180,
    },
    {
      accessorKey: 'email',
      header: t('contact'),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-600 dark:text-slate-400">
            <Mail size={10} className="text-indigo-500/50" /> {row.original.email}
          </div>
          <div className="flex items-center gap-1 text-[7px] font-black text-slate-400 uppercase tracking-tighter">
            <Phone size={8} /> {row.original.phone}
          </div>
        </div>
      ),
      size: 200,
    },
    {
      id: 'employment',
      header: t('employment'),
      accessorFn: (row) => `${row.company} ${row.department}`,
      cell: ({ row }) => (
        <div>
          <p className="text-[9px] font-black text-slate-700 dark:text-slate-300 leading-none truncate uppercase tracking-tight">
            {row.original.company}
          </p>
          <p className="text-[7px] font-black text-indigo-500/60 uppercase tracking-widest mt-0.5">
            {row.original.department}
          </p>
        </div>
      ),
      size: 150,
    },
    {
      accessorKey: 'status',
      header: t('status'),
      cell: ({ getValue }) => {
        const status = getValue();
        return (
          <span className={clsx(
            "badge",
            status === 'Active' ? "badge-success" : status === 'Inactive' ? "badge-neutral" : "badge-warning"
          )}>
            <div className={clsx("w-1 h-1 rounded-full", status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400')} />
            {status}
          </span>
        );
      },
      size: 100,
    },
    {
      accessorKey: 'salary',
      header: t('salary'),
      cell: ({ row }) => (
        <div>
          <p className="text-[10px] font-black text-slate-900 dark:text-white leading-none">
            ${row.original.salary.toLocaleString()}
          </p>
          <p className="text-[7px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">
            {row.original.experience}Y EXP
          </p>
        </div>
      ),
      size: 100,
    },
    {
      id: 'actions',
      header: t('actions'),
      cell: ({ row }) => (
        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.stopPropagation(); setEditingUser(row.original); setIsFormOpen(true); }} 
            className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 rounded transition-all"
          >
            <Edit3 size={12} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setUserToDelete(row.original); setIsDeleteDialogOpen(true); }} 
            className="p-1 text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 rounded transition-all"
          >
            <Trash2 size={12} />
          </button>
        </div>
      ),
      size: 80,
    },
  ], [t]);

  return (
    <div className="h-full flex flex-col overflow-hidden gap-2">
      <DataTable
        data={users}
        columns={columns}
        isLoading={loading}
        title={t('active_accounts')}
        onRowClick={(user) => { setEditingUser(user); setIsFormOpen(true); }}
        actions={
          <>
            <Button variant="secondary" onClick={() => exportToCSV(users, 'users.csv')} size="sm">
              <Download size={10} className="mr-2" /> {t('export')}
            </Button>
            <Button onClick={() => { setEditingUser(null); setIsFormOpen(true); }} size="sm">
              <Plus size={10} className="mr-2" /> {t('provision_account')}
            </Button>
          </>
        }
      />

      {isFormOpen && (
        <UserForm 
          user={editingUser} 
          onSubmit={() => {
            toast.success(t('success'));
            setIsFormOpen(false);
            loadUsers();
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
