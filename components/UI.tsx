
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  loading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-tight";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-black shadow-lg shadow-black/10",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
    outline: "border border-gray-900 bg-transparent text-gray-900 hover:bg-gray-50 focus:ring-gray-900",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-black focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-lg shadow-red-600/10"
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`
            block w-full rounded-2xl border bg-gray-50 py-4 
            ${icon ? 'pl-12' : 'pl-5'} pr-5
            text-gray-900 placeholder:text-gray-400
            transition-all duration-300
            focus:bg-white focus:ring-4 focus:ring-black/5 focus:outline-none focus:border-black
            ${error ? 'border-red-500 ring-red-500/5' : 'border-gray-100'}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-2 text-xs text-red-500 font-bold ml-1">{error}</p>}
    </div>
  );
};

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }> = ({ label, error, children, className = '', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">{label}</label>}
      <div className="relative">
        <select
          className={`
            block w-full rounded-2xl border border-gray-100 bg-gray-50 py-4 pl-5 pr-10
            text-gray-900 font-medium transition-all duration-300
            focus:bg-white focus:ring-4 focus:ring-black/5 focus:outline-none focus:border-black
            ${error ? 'border-red-500' : ''}
            appearance-none
          `}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
      {error && <p className="mt-2 text-xs text-red-500 font-bold ml-1">{error}</p>}
    </div>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'dark' | 'light' }> = ({ children, variant = 'dark' }) => (
  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${variant === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
    {children}
  </span>
);
