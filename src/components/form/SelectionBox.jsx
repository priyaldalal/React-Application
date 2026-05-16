import React from 'react';
import FormWrapper from './FormWrapper';
import { ChevronDown } from 'lucide-react';

const SelectionBox = ({ label, options = [], placeholder, error, helperText, required, ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <div className="relative">
        <select
          className={`input-field appearance-none pr-7 cursor-pointer ${
            error ? 'border-rose-400 focus:ring-rose-500/10' : ''
          }`}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <ChevronDown size={10} strokeWidth={2.5} />
        </div>
      </div>
    </FormWrapper>
  );
};

export default SelectionBox;
