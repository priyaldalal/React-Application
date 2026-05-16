import React from 'react';

const Checkbox = ({ label, checked, error, onChange, required, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-300 dark:border-slate-600 transition-all checked:bg-indigo-600 checked:border-indigo-600"
            checked={checked}
            onChange={onChange}
            required={required}
            {...props}
          />
          <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span className="text-sm text-gray-700 dark:text-gray-300 select-none group-hover:text-indigo-600 transition-colors">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      </label>
      {error && <p className="text-xs text-red-500 font-medium ml-8">{error}</p>}
    </div>
  );
};

export default Checkbox;
