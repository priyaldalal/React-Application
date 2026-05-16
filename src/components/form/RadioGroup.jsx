import React from 'react';

const RadioGroup = ({ label, name, options = [], value, onChange, error, required }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="flex flex-wrap gap-4 py-1">
        {options.map(opt => (
          <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="peer h-3.5 w-3.5 cursor-pointer appearance-none rounded-full border-2 border-slate-300 dark:border-slate-600 transition-all checked:border-indigo-600"
              />
              <div className="absolute h-1.5 w-1.5 rounded-full bg-indigo-600 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-[10px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
};

export default RadioGroup;
