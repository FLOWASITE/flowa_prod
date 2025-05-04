
import React from 'react';
import { Check, Eye, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Topic } from '@/types';

interface TopicActionsProps {
  topic: Topic;
  isMobile: boolean;
  handleViewTopic?: (topic: Topic) => void;
  handleApproveTopic?: (topic: Topic) => void;
  handleEditTopic?: (topic: Topic) => void;
  handleRejectTopic?: (topic: Topic) => void;
}

export const TopicActions: React.FC<TopicActionsProps> = ({
  topic,
  isMobile,
  handleViewTopic,
  handleApproveTopic,
  handleEditTopic,
  handleRejectTopic
}) => {
  if (isMobile) {
    return (
      <>
        {/* View Button */}
        {handleViewTopic && (
          <Button 
            variant="ghost" 
            size="sm"
            className="text-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-full"
            onClick={() => handleViewTopic(topic)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Xem
          </Button>
        )}
        
        {/* Approve Button - only show for draft topics */}
        {topic.status === 'draft' && handleApproveTopic && (
          <Button 
            variant="ghost" 
            size="sm"
            className="text-green-500 hover:bg-green-50 hover:text-green-700 rounded-full"
            onClick={() => handleApproveTopic(topic)}
          >
            <Check className="h-4 w-4 mr-1" />
            Duyệt
          </Button>
        )}
        
        {/* Edit Button */}
        {handleEditTopic && (
          <Button 
            variant="ghost" 
            size="sm"
            className="text-amber-500 hover:bg-amber-50 hover:text-amber-700 rounded-full"
            onClick={() => handleEditTopic(topic)}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Sửa
          </Button>
        )}
        
        {/* Reject Button - only show for draft topics */}
        {topic.status === 'draft' && handleRejectTopic && (
          <Button 
            variant="ghost" 
            size="sm"
            className="text-red-500 hover:bg-red-50 hover:text-red-700 rounded-full"
            onClick={() => handleRejectTopic(topic)}
          >
            <X className="h-4 w-4 mr-1" />
            Từ chối
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      {/* View Button */}
      {handleViewTopic && (
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 p-1 text-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-full"
          onClick={() => handleViewTopic(topic)}
          title="Xem"
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}
      
      {/* Approve Button - only show for draft topics */}
      {topic.status === 'draft' && handleApproveTopic && (
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 p-1 text-green-500 hover:bg-green-50 hover:text-green-700 rounded-full"
          onClick={() => handleApproveTopic(topic)}
          title="Duyệt"
        >
          <Check className="h-4 w-4" />
        </Button>
      )}
      
      {/* Edit Button */}
      {handleEditTopic && (
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 p-1 text-amber-500 hover:bg-amber-50 hover:text-amber-700 rounded-full"
          onClick={() => handleEditTopic(topic)}
          title="Sửa"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
      
      {/* Reject Button - only show for draft topics */}
      {topic.status === 'draft' && handleRejectTopic && (
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 p-1 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-full"
          onClick={() => handleRejectTopic(topic)}
          title="Từ chối"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
