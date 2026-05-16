import React from 'react';
import FormWrapper from './FormWrapper';

const TextArea = ({ label, error, helperText, required, maxLength, value = '', ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <div className="relative group/textarea">
        <textarea
          className={`w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border rounded-md outline-none min-h-[60px] resize-none transition-all duration-200 text-[10px]
            ${error 
              ? 'border-rose-500 focus:ring-1 focus:ring-rose-500/20' 
              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10'
            } dark:text-white placeholder:text-slate-400 font-medium`}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        {maxLength && (
          <div className="absolute bottom-1.5 right-1.5 px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-black text-slate-500 uppercase">
            {value.length} / {maxLength}
          </div>
        )}
      </div>
    </FormWrapper>
  );
};

export default TextArea;
