import React from 'react';
import { cn } from '../lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  disabled,
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand/90 shadow-sm shadow-brand/20',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800 dark:hover:bg-gray-800',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400',
    outline: 'border border-gray-200 bg-transparent hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    icon: 'h-10 w-10 p-0',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 disabled:pointer-events-none gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </motion.button>
  );
}
