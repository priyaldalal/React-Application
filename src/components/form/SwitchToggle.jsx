import React from 'react';

const SwitchToggle = ({ label, helperText, checked, onChange, disabled }) => {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none group">
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div className={`w-8 h-[18px] rounded-full transition-colors duration-200 ${
          checked ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
        } ${disabled ? 'opacity-40' : ''}`} />
        <div className={`absolute left-0.5 top-0.5 bg-white w-[14px] h-[14px] rounded-full shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-[14px]' : 'translate-x-0'
        }`} />
      </div>
      {(label || helperText) && (
        <div className="min-w-0">
          {label && <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-none">{label}</span>}
          {helperText && <p className="text-[8px] text-slate-400 mt-0.5 leading-tight">{helperText}</p>}
        </div>
      )}
    </label>
  );
};

export default SwitchToggle;
