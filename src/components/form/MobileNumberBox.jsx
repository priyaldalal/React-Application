import React from 'react';
import { Phone } from 'lucide-react';
import FormWrapper from './FormWrapper';

const MobileNumberBox = ({ label, error, helperText, required, countryCodes = ['+91', '+1', '+44', '+61'], ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <div className="flex gap-1.5 group/phone">
        <select className="px-1.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md outline-none text-[10px] font-bold dark:text-white focus:border-indigo-500 transition-colors cursor-pointer">
          {countryCodes.map(code => <option key={code} value={code}>{code}</option>)}
        </select>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 group-focus-within/phone:text-indigo-500 transition-colors">
            <Phone size={12} />
          </div>
          <input
            type="tel"
            className={`w-full pl-8 pr-2 py-1 bg-white dark:bg-slate-900 border rounded-md outline-none transition-all duration-200 text-[10px]
              ${error 
                ? 'border-rose-500 focus:ring-1 focus:ring-rose-500/20' 
                : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10'
              } dark:text-white placeholder:text-slate-400 font-medium`}
            {...props}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default MobileNumberBox;
