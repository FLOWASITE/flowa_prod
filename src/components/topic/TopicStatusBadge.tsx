
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { topicTranslations } from './topicTranslations';

interface TopicStatusBadgeProps {
  status: string;
  className?: string;
}

export const TopicStatusBadge: React.FC<TopicStatusBadgeProps> = ({ status, className = '' }) => {
  const { currentLanguage } = useLanguage();
  
  const getStatusTranslation = (status: string) => {
    const lang = currentLanguage.code;
    return topicTranslations.topicStatus[status]?.[lang] || status;
  };
  
  const statusClasses = {
    draft: "bg-gray-100 text-gray-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    generating: "bg-blue-100 text-blue-800",
    completed: "bg-purple-100 text-purple-800",
  };
  
  return (
    <Badge variant="outline" className={`${statusClasses[status]} ${className}`}>
      {getStatusTranslation(status)}
    </Badge>
  );
};
