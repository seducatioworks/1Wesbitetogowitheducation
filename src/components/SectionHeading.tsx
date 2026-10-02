import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentClasses = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl mb-12 ${alignmentClasses} ${className}`}>
      {badge && (
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-trust bg-trust-light px-2.5 py-1 rounded-sm mb-3">
          {badge}
        </span>
      )}
      <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-ink-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
