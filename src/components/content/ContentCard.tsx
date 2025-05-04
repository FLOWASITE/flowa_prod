
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Content, Topic } from '@/types';
import { format } from 'date-fns';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Share2, 
  Trash2 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { platformIcons } from '../chat/PlatformIcons';
import { ContentCardHeader } from './card/ContentCardHeader';
import { ContentCardBody } from './card/ContentCardBody';
import { ContentCardFooter } from './card/ContentCardFooter';

interface ContentCardProps {
  content: Content;
  topic?: Topic;
  onApprove?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onEdit?: () => void;
  compact?: boolean;
}

export const ContentCard: React.FC<ContentCardProps> = ({ 
  content, 
  topic, 
  onApprove, 
  onDelete, 
  onView,
  onEdit,
  compact = false 
}) => {
  return (
    <Card className={`h-full flex flex-col ${compact ? 'shadow-sm' : 'shadow'}`}>
      <ContentCardHeader 
        content={content} 
        platformIcons={platformIcons} 
      />
      
      <ContentCardBody 
        content={content} 
        topic={topic} 
        compact={compact} 
      />
      
      <ContentCardFooter 
        content={content}
        onApprove={onApprove}
        onDelete={onDelete}
        onView={onView}
        onEdit={onEdit}
      />
    </Card>
  );
};
