import React from 'react';

const RadioGroup = ({ label, name, options = [], value, onChange, error, required }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex flex-wrap gap-6">
        {options.map(opt => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 dark:border-slate-600 transition-all checked:border-indigo-600"
              />
              <div className="absolute h-2.5 w-2.5 rounded-full bg-indigo-600 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 transition-colors">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default RadioGroup;
