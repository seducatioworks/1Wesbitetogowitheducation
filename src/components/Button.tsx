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
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none disabled:opacity-60 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-sm tracking-wide',
    md: 'text-xs sm:text-sm px-4 py-2 rounded-sm tracking-wide',
    lg: 'text-sm sm:text-base px-5 py-2.5 rounded-sm tracking-wide',
  }[size];

  const variantStyles = {
    primary: 'bg-navy text-white hover:bg-midnight focus:ring-navy border border-navy shadow-xs',
    secondary: 'bg-white text-navy hover:bg-surface focus:ring-academic border border-navy/40 shadow-xs',
    outline: 'bg-transparent text-navy hover:bg-navy/5 border border-navy/30 focus:ring-academic',
    subtle: 'bg-surface text-navy hover:bg-surface-blue border border-border focus:ring-academic',
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
