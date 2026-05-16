import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, User, Mail, Phone, MapPin, Briefcase, DollarSign } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const UserForm = ({ user, onSubmit, onCancel }) => {
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-card rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-border"
      >
        {/* Modal Header */}
        <div className="p-8 border-b border-border flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <div>
            <h3 className="text-2xl font-black text-foreground tracking-tight">
              {user ? 'Modify Profile' : 'New User Provisioning'}
            </h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Enterprise Directory System</p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-6">
              <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-indigo-100 dark:border-indigo-900/30 pb-2">Personal Identity</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
              <Input label="Email Address" icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Age" type="number" name="age" value={formData.age} onChange={handleChange} required />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="input-premium py-2 bg-transparent">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-indigo-100 dark:border-indigo-900/30 pb-2">Work & Contact</h4>
              <Input label="Phone Number" icon={Phone} name="phone" value={formData.phone} onChange={handleChange} required />
              <Input label="Company Name" icon={Briefcase} name="company" value={formData.company} onChange={handleChange} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Department" name="department" value={formData.department} onChange={handleChange} required />
                <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Annual Salary" icon={DollarSign} type="number" name="salary" value={formData.salary} onChange={handleChange} required />
                <Input label="Experience (Yrs)" type="number" name="experience" value={formData.experience} onChange={handleChange} required />
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-indigo-100 dark:border-indigo-900/30 pb-2">Geographic Data</h4>
              <Input label="Street Address" icon={MapPin} name="address" value={formData.address} onChange={handleChange} required />
              <div className="grid grid-cols-3 gap-4">
                <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
                <Input label="State" name="state" value={formData.state} onChange={handleChange} required />
                <Input label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-end gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="secondary" onClick={onCancel} className="px-10">
              Discard Changes
            </Button>
            <Button type="submit" className="px-10">
              <Save size={18} className="mr-2" /> {user ? 'Commit Updates' : 'Provision Account'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserForm;
