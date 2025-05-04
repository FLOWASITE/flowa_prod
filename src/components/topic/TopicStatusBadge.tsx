
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
    if (topicTranslations.topicStatus?.[status as keyof typeof topicTranslations.topicStatus]?.[lang]) {
      return topicTranslations.topicStatus[status as keyof typeof topicTranslations.topicStatus][lang];
    }
    return status;
  };
  
  // Updated to only include the three status types with their corresponding styles
  const statusClasses = {
    draft: "bg-gray-100 text-gray-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  
  return (
    <Badge variant="outline" className={`${statusClasses[status as keyof typeof statusClasses] || ''} ${className}`}>
      {getStatusTranslation(status)}
    </Badge>
  );
};
