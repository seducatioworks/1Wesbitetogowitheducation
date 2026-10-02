import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 select-none disabled:opacity-60 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-sm px-3.5 py-1.5 rounded-sm',
    md: 'text-base px-5 py-2.5 rounded-md',
    lg: 'text-base sm:text-lg px-6 py-3.5 rounded-md font-semibold',
  }[size];

  const variantStyles = {
    primary: 'bg-navy text-white hover:bg-navy-dark focus:ring-navy border border-navy shadow-sm',
    secondary: 'bg-white text-navy hover:bg-slate-50 focus:ring-slate-300 border border-border-subtle shadow-sm',
    outline: 'bg-transparent text-navy hover:bg-navy/5 border border-navy/30 focus:ring-navy',
    subtle: 'bg-trust-light text-trust hover:bg-trust-light/80 border border-trust/20 focus:ring-trust',
  }[variant];

  const combinedStyles = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
