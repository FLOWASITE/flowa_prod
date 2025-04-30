
import React from 'react';
import { Crown, Star, Award, Diamond } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type AccountType = 'free' | 'basic' | 'professional' | 'enterprise';

interface AccountTypeBadgeProps {
  type: AccountType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  clickable?: boolean;
}

export function AccountTypeBadge({ 
  type = 'free', 
  size = 'md', 
  showLabel = true,
  className,
  clickable = true
}: AccountTypeBadgeProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };
  
  const typeConfig = {
    free: {
      color: 'bg-gray-200 text-gray-700',
      gradient: 'from-gray-200 to-gray-300',
      icon: <Star className="h-3 w-3" />,
      label: 'Free'
    },
    basic: {
      color: 'bg-blue-200 text-blue-700',
      gradient: 'from-blue-200 to-blue-300',
      icon: <Award className="h-3 w-3" />,
      label: 'Basic'
    },
    professional: {
      color: 'bg-primary text-white',
      gradient: 'from-primary via-primary-container to-secondary-container',
      icon: <Crown className="h-3 w-3" />,
      label: 'Professional'
    },
    enterprise: {
      color: 'bg-purple-600 text-white',
      gradient: 'from-purple-400 to-purple-700',
      icon: <Diamond className="h-3 w-3" />,
      label: 'Enterprise'
    }
  };

  const config = typeConfig[type];
  
  const badgeContent = (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className={cn(
          "rounded-full flex items-center justify-center",
          sizeClasses[size],
          "bg-gradient-to-br shadow-md transition-all duration-300",
          config.gradient,
          "ring-2 ring-offset-2",
          type === 'professional' ? 'ring-primary-container' : 'ring-transparent'
        )}
        title={config.label}
      >
        {config.icon}
      </div>
      
      {showLabel && (
        <span className={cn(
          "font-medium text-sm",
          type === 'professional' && "text-primary",
          type === 'enterprise' && "text-purple-600"
        )}>
          {config.label}
        </span>
      )}
    </div>
  );

  return clickable ? (
    <Link to="/account-type" className="hover:opacity-80 transition-opacity">
      {badgeContent}
    </Link>
  ) : (
    badgeContent
  );
}
