import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Save, Mail, Phone, MapPin, Briefcase, DollarSign } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { UI_CONFIG } from '../../config/uiConfig';

const UserForm = ({ user, onSubmit, onCancel }) => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    gender: 'Male', age: '', address: '', city: '',
    state: '', country: 'USA', zipCode: '', company: '',
    department: 'IT', designation: '', salary: '',
    status: 'Active', joiningDate: new Date().toISOString().split('T')[0], experience: ''
  });

  useEffect(() => { if (user) setFormData(user); }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onCancel}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.15 }}
        style={{ maxWidth: UI_CONFIG.dialog.lg }}
        className="relative bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-h-[80vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800"
      >
        {/* Header — sticky */}
        <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center flex-shrink-0">
          <div>
            <h3 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
              {user ? t('modify_profile') : t('new_user_provisioning')}
            </h3>
            <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{t('enterprise_directory')}</p>
          </div>
          <button onClick={onCancel} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Body — scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {/* Personal */}
            <div className="space-y-2.5">
              <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 dark:border-indigo-900/20 pb-1">{t('personal_identity')}</p>
              <div className="grid grid-cols-2 gap-2">
                <Input label={t('first_name')} name="firstName" value={formData.firstName} onChange={handleChange} required />
                <Input label={t('last_name')} name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
              <Input label={t('email_address')} icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} required />
              <div className="grid grid-cols-2 gap-2">
                <Input label={t('age')} type="number" name="age" value={formData.age} onChange={handleChange} />
                <div className="flex flex-col gap-1">
                  <label className="field-label">{t('gender')}</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="input-field">
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Work */}
            <div className="space-y-2.5">
              <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 dark:border-indigo-900/20 pb-1">{t('work_contact')}</p>
              <Input label={t('phone_number')} icon={Phone} name="phone" value={formData.phone} onChange={handleChange} />
              <Input label={t('company_name')} icon={Briefcase} name="company" value={formData.company} onChange={handleChange} />
              <div className="grid grid-cols-2 gap-2">
                <Input label={t('department')} name="department" value={formData.department} onChange={handleChange} />
                <Input label={t('designation')} name="designation" value={formData.designation} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input label={t('salary_annual')} icon={DollarSign} type="number" name="salary" value={formData.salary} onChange={handleChange} />
                <Input label={t('experience_yrs')} type="number" name="experience" value={formData.experience} onChange={handleChange} />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2 space-y-2.5 pt-1">
              <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 dark:border-indigo-900/20 pb-1">{t('geographic_data')}</p>
              <Input label={t('street_address')} icon={MapPin} name="address" value={formData.address} onChange={handleChange} />
              <div className="grid grid-cols-3 gap-2">
                <Input label={t('city')} name="city" value={formData.city} onChange={handleChange} />
                <Input label={t('state')} name="state" value={formData.state} onChange={handleChange} />
                <Input label={t('zip_code')} name="zipCode" value={formData.zipCode} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-end gap-2 pt-3 border-t border-slate-50 dark:border-slate-800">
            <Button type="button" variant="secondary" onClick={onCancel} size="sm">{t('discard_changes')}</Button>
            <Button type="submit" size="sm">
              <Save size={10} className="mr-1" /> {user ? t('commit_updates') : t('provision_account')}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserForm;
