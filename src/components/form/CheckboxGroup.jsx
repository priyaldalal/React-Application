import React from 'react';
import Checkbox from './Checkbox';

const CheckboxGroup = ({ label, options = [], value = [], onChange, error, required }) => {
  const handleToggle = (optValue) => {
    const newValue = value.includes(optValue)
      ? value.filter(v => v !== optValue)
      : [...value, optValue];
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="grid grid-cols-2 gap-2 p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50">
        {options.map(opt => (
          <Checkbox 
            key={opt.value}
            label={opt.label}
            checked={value.includes(opt.value)}
            onChange={() => handleToggle(opt.value)}
          />
        ))}
      </div>
      {error && <p className="text-[10px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
