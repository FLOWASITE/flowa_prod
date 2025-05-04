
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Content, Topic } from '@/types';
import { AccordionItem as AccordionContentItem } from './AccordionItem';
import { format } from 'date-fns';

interface AccordionGroupProps {
  topicId: string;
  contents: Content[];
  topics: Topic[];
  onApprove: (content: Content) => void;
  onView: (content: Content) => void;
  onDelete: (contentId: string) => void;
  showApproveColumn?: boolean;
  formatDate: (date: Date | undefined) => string;
}

export const AccordionGroup: React.FC<AccordionGroupProps> = ({
  topicId,
  contents,
  topics,
  onApprove,
  onView,
  onDelete,
  showApproveColumn = true,
  formatDate
}) => {
  // Get topic name by ID
  const getTopicName = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    return topic?.title || 'Không có chủ đề';
  };

  // Count number of items for each topic
  const getTopicItemsCount = () => {
    return contents?.length || 0;
  };

  return (
    <AccordionItem key={topicId} value={topicId} className="border-b border-gray-100">
      <AccordionTrigger className="hover:bg-gray-50 px-4 py-3 text-left">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-800">{getTopicName(topicId)}</span>
            <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
              {getTopicItemsCount()} nội dung
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pt-2 pb-4">
        <div className="space-y-4">
          {contents.map((content) => (
            <AccordionContentItem
              key={content.id}
              content={content}
              onApprove={onApprove}
              onView={onView}
              onDelete={onDelete}
              showApproveColumn={showApproveColumn}
              formatDate={formatDate}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
