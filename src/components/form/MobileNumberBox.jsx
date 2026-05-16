import React from 'react';
import { FiPhone } from 'react-icons/fi';
import FormWrapper from './FormWrapper';

const MobileNumberBox = ({ label, error, helperText, required, countryCodes = ['+91', '+1', '+44', '+61'], ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <div className="flex gap-2 group/phone">
        <select className="px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-sm font-medium dark:text-white focus:border-indigo-500 transition-colors">
          {countryCodes.map(code => <option key={code} value={code}>{code}</option>)}
        </select>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within/phone:text-indigo-500 transition-colors">
            <FiPhone size={18} />
          </div>
          <input
            type="tel"
            className={`w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border rounded-lg outline-none transition-all duration-200 
              ${error 
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]' 
                : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
              } dark:text-white placeholder:text-slate-400`}
            {...props}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default MobileNumberBox;

