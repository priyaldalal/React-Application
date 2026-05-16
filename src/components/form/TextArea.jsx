import React from 'react';
import FormWrapper from './FormWrapper';

const TextArea = ({ label, error, helperText, required, maxLength, value = '', ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <div className="relative group/textarea">
        <textarea
          className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border rounded-lg outline-none min-h-[120px] resize-none transition-all duration-200 
            ${error 
              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]' 
              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
            } dark:text-white placeholder:text-slate-400`}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        {maxLength && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold text-slate-500 uppercase">
            {value.length} / {maxLength}
          </div>
        )}
      </div>
    </FormWrapper>
  );
};

export default TextArea;

