// web_src/components/Utility/Grid.jsx
import React from 'react';

/**
 * Grid layout wrapper for responsive layouts
 *
 * Props:
 *  - children: React nodes inside the grid
 *  - cols: default number of columns (mobile-first)
 *  - sm, md, lg, xl: responsive column counts
 *  - gap: Tailwind gap class (default '4')
 *  - className: additional classes
 */
export default function Grid({
  children,
  cols = 1,
  sm,
  md,
  lg,
  xl,
  gap = '4',
  className = '',
  ...props
}) {
  let classList = `grid gap-${gap} ${className}`;

  // Add mobile + responsive columns
  classList += ` grid-cols-${cols}`;
  if (sm) classList += ` sm:grid-cols-${sm}`;
  if (md) classList += ` md:grid-cols-${md}`;
  if (lg) classList += ` lg:grid-cols-${lg}`;
  if (xl) classList += ` xl:grid-cols-${xl}`;

  return (
    <div className={classList} {...props}>
      {children}
    </div>
  );
}