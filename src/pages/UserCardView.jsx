import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Mail, 
  Phone, 
  Briefcase, 
  MoreHorizontal,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { userService } from '../services/userService';
import Skeleton from '../components/loaders/Skeleton';
import Button from '../components/ui/Button';

const UserCardView = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

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

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div className="h-full flex flex-col overflow-hidden gap-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 flex-shrink-0">
        <div>
          <h1 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight">Organization Map</h1>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Visual representation of your global workforce.</p>
        </div>
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="Find team members..." 
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-10">
        <AnimatePresence>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="premium-card p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="pt-4 flex gap-2">
                  <Skeleton className="h-8 w-full rounded-lg" />
                  <Skeleton className="h-8 w-full rounded-lg" />
                </div>
              </div>
            ))
          ) : filteredUsers.length === 0 ? (
            <div className="col-span-full py-40 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4">
                <Zap size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">No matches found</h3>
              <p className="text-slate-500">We couldn't find anyone matching your search criteria.</p>
            </div>
          ) : (
            filteredUsers.map((user, idx) => (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ y: -8 }}
                className="premium-card group relative overflow-hidden flex flex-col h-full"
              >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-500/20">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center text-indigo-600 border border-slate-100 dark:border-slate-700">
                        <ShieldCheck size={10} fill="currentColor" fillOpacity={0.2} />
                      </div>
                    </div>
                    <button className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{user.firstName} {user.lastName}</h3>
                    <p className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-0.5">{user.designation}</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                      <div className="w-6 h-6 rounded-md bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <Briefcase size={10} className="text-indigo-500" />
                      </div>
                      <span className="truncate">{user.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                      <div className="w-6 h-6 rounded-md bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <Mail size={10} className="text-purple-500" />
                      </div>
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                      <div className="w-6 h-6 rounded-md bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <MapPin size={10} className="text-pink-500" />
                      </div>
                      <span className="truncate">{user.city}, {user.state}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <Button variant="secondary" className="flex-1 text-[9px] font-black py-2">
                      PROFILE
                    </Button>
                    <Button className="flex-1 text-[9px] font-black py-2">
                      <ExternalLink size={10} className="mr-1.5" /> CONNECT
                    </Button>
                  </div>
                </div>
                
                {/* Bottom Status Bar */}
                <div className={`h-1.5 w-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserCardView;
