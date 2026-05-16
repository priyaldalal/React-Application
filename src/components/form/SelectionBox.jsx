import React from 'react';
import FormWrapper from './FormWrapper';

const SelectionBox = ({ label, options = [], placeholder, error, helperText, required, ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <div className="relative">
        <select
          className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border rounded-lg outline-none appearance-none transition-all duration-200 
            ${error 
              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]' 
              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
            } dark:text-white`}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled} className="dark:bg-slate-800">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </FormWrapper>
  );
};

export default SelectionBox;

