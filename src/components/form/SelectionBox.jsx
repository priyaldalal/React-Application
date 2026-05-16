import React from 'react';
import FormWrapper from './FormWrapper';
import { ChevronDown } from 'lucide-react';

const SelectionBox = ({ label, options = [], placeholder, error, helperText, required, ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <div className="relative group/select">
        <select
          className={`w-full pl-2.5 pr-8 py-1 text-[10px] font-bold bg-white dark:bg-slate-900 border rounded-md outline-none appearance-none transition-all duration-200 
            ${error 
              ? 'border-rose-500 focus:ring-1 focus:ring-rose-500/20' 
              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10'
            } dark:text-white cursor-pointer`}
          {...props}
        >
          {placeholder && <option value="" disabled className="dark:bg-slate-900 text-slate-400">{placeholder}</option>}
          {options.map(opt => (
            <option 
              key={opt.value} 
              value={opt.value} 
              disabled={opt.disabled} 
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-1 text-[10px] font-bold"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within/select:text-indigo-500 transition-colors">
          <ChevronDown size={10} strokeWidth={3} />
        </div>
      </div>
    </FormWrapper>
  );
};

export default SelectionBox;
