import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  className = '',
  icon: Icon,
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`
                        w-full rounded-xl border bg-slate-50 dark:bg-slate-900/50
                        text-slate-900 dark:text-white placeholder-slate-400
                        focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                        transition-all hover:bg-slate-100 dark:hover:bg-slate-900/70
                        ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3
                        ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700/50'}
                        ${className}
                    `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
