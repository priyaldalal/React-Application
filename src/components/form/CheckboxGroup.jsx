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
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="grid grid-cols-2 gap-3 p-4 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50/50 dark:bg-slate-900/50">
        {options.map(opt => (
          <Checkbox 
            key={opt.value}
            label={opt.label}
            checked={value.includes(opt.value)}
            onChange={() => handleToggle(opt.value)}
          />
        ))}
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
