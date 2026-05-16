import React from 'react';
import FormWrapper from './FormWrapper';

export const TextBox = ({ label, error, helperText, required, ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <input
        className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border rounded-lg outline-none transition-all duration-200 
          ${error 
            ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]' 
            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
          } dark:text-white placeholder:text-slate-400`}
        {...props}
      />
    </FormWrapper>
  );
};

export default TextBox;


