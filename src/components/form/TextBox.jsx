import React from 'react';
import FormWrapper from './FormWrapper';

export const TextBox = ({ label, error, helperText, required, ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <input
        className={`w-full px-2 py-1 bg-white dark:bg-slate-900 border rounded-md outline-none transition-all duration-200 text-[10px]
          ${error 
            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500/20' 
            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10'
          } dark:text-white placeholder:text-slate-400 font-medium`}
        {...props}
      />
    </FormWrapper>
  );
};

export default TextBox;
