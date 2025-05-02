
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ProductActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
}

export function ProductActionButton({ 
  icon: Icon, 
  label, 
  onClick, 
  className 
}: ProductActionButtonProps) {
  return (
    <Button 
      type="button" 
      variant="outline" 
      onClick={onClick}
      className={`flex-1 bg-primary/5 border-primary/20 hover:bg-primary/10 ${className || ''}`}
    >
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );
}
