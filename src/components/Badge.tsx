import React from 'react';
import { cn } from '../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
    error: 'bg-red-50 text-red-700 border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
    outline: 'border border-gray-200 text-gray-600 dark:border-gray-800 dark:text-gray-400',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
