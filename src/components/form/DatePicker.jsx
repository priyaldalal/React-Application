import React from 'react';
import { Calendar } from 'lucide-react';
import FormWrapper from './FormWrapper';

const DatePicker = ({ label, error, helperText, required, ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <div className="relative group/date">
        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 group-focus-within/date:text-indigo-500 transition-colors">
          <Calendar size={12} />
        </div>
        <input
          type="date"
          className={`w-full pl-8 pr-2.5 py-1 text-[10px] font-bold bg-white dark:bg-slate-900 border rounded-md outline-none transition-all duration-200 
            ${error 
              ? 'border-rose-500 focus:ring-1 focus:ring-rose-500/20' 
              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10'
            } dark:text-white dark:color-scheme-dark`}
          style={{ colorScheme: 'light dark' }}
          {...props}
        />
      </div>
    </FormWrapper>
  );
};

export default DatePicker;
