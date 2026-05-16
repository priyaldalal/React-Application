import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Save, Mail, Phone, MapPin, Briefcase, DollarSign } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { UI_CONFIG } from '../../config/uiConfig';

const UserForm = ({ user, onSubmit, onCancel }) => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    age: '',
    address: '',
    city: '',
    state: '',
    country: 'USA',
    zipCode: '',
    company: '',
    department: 'IT',
    designation: '',
    salary: '',
    status: 'Active',
    joiningDate: new Date().toISOString().split('T')[0],
    experience: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col border border-slate-100 dark:border-slate-800"
      >
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div>
            <h3 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
              {user ? t('modify_profile') : t('new_user_provisioning')}
            </h3>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">{t('enterprise_directory')}</p>
          </div>
          <button onClick={onCancel} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-slate-400">
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="space-y-4">
              <h4 className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-indigo-50 dark:border-indigo-900/20 pb-1.5">{t('personal_identity')}</h4>
              <div className="grid grid-cols-2 gap-3">
                <Input label={t('first_name')} name="firstName" value={formData.firstName} onChange={handleChange} required />
                <Input label={t('last_name')} name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
              <Input label={t('email_address')} icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} required />
              <div className="grid grid-cols-2 gap-3">
                <Input label={t('age')} type="number" name="age" value={formData.age} onChange={handleChange} required />
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-black uppercase text-slate-400 tracking-wider ml-1">{t('gender')}</label>
                  <select 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange} 
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2 py-1.5 text-[10px] font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-indigo-50 dark:border-indigo-900/20 pb-1.5">{t('work_contact')}</h4>
              <Input label={t('phone_number')} icon={Phone} name="phone" value={formData.phone} onChange={handleChange} required />
              <Input label={t('company_name')} icon={Briefcase} name="company" value={formData.company} onChange={handleChange} required />
              <div className="grid grid-cols-2 gap-3">
                <Input label={t('department')} name="department" value={formData.department} onChange={handleChange} required />
                <Input label={t('designation')} name="designation" value={formData.designation} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label={t('salary_annual')} icon={DollarSign} type="number" name="salary" value={formData.salary} onChange={handleChange} required />
                <Input label={t('experience_yrs')} type="number" name="experience" value={formData.experience} onChange={handleChange} required />
              </div>
            </div>

            <div className="md:col-span-2 space-y-4 pt-2">
              <h4 className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-indigo-50 dark:border-indigo-900/20 pb-1.5">{t('geographic_data')}</h4>
              <Input label={t('street_address')} icon={MapPin} name="address" value={formData.address} onChange={handleChange} required />
              <div className="grid grid-cols-3 gap-3">
                <Input label={t('city')} name="city" value={formData.city} onChange={handleChange} required />
                <Input label={t('state')} name="state" value={formData.state} onChange={handleChange} required />
                <Input label={t('zip_code')} name="zipCode" value={formData.zipCode} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2 pt-4 border-t border-slate-50 dark:border-slate-800">
            <Button type="button" variant="secondary" onClick={onCancel} size="sm">
              {t('discard_changes')}
            </Button>
            <Button type="submit" size="sm" className="shadow-lg shadow-indigo-600/20">
              <Save size={12} className="mr-2" /> {user ? t('commit_updates') : t('provision_account')}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserForm;
