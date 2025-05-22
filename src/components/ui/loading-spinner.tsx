import React from 'react';
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "animate-spin rounded-full border-2 border-t-transparent",
        sizeClasses[size],
        size === 'sm' ? 'border-[2px]' : size === 'md' ? 'border-[3px]' : 'border-[4px]',
        "border-red-600"
      )}></div>
    </div>
  );
}
