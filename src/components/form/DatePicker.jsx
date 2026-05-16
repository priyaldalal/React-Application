import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import FormWrapper from './FormWrapper';

const DatePicker = ({ label, error, helperText, required, ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <div className="relative group/date">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within/date:text-indigo-500 transition-colors">
          <FiCalendar size={18} />
        </div>
        <input
          type="date"
          className={`w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border rounded-lg outline-none transition-all duration-200 
            ${error 
              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]' 
              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
            } dark:text-white dark:fill-white`}
          {...props}
        />
      </div>
    </FormWrapper>
  );
};

export default DatePicker;

