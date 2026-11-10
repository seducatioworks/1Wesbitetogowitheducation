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
    <div className={`max-w-3xl mb-10 sm:mb-14 ${alignmentClasses} ${className}`}>
      {badge && (
        <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-academic bg-surface-blue border border-academic/20 px-2.5 py-1 rounded-sm mb-3">
          {badge}
        </span>
      )}
      <h2 className="font-bold text-2xl sm:text-3xl lg:text-[34px] text-navy tracking-tight leading-[1.2]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-slate-dark leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
