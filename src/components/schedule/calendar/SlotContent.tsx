
import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Content } from '@/types/content';
import { ScheduledPost } from '../ScheduledPost';
import { PostCard } from '../PostCard';

interface SlotContentProps {
  contentForSlot: Content[];
  date: Date;
  timeSlot: string;
  handleOpenNewPostDialog: (date: Date, timeSlot: string) => void;
  handleOpenEditDialog: (post: Content) => void;
  getTopicTitle: (content: Content) => string;
}

// Group content by topic
const groupContentByTopic = (contentList: Content[]) => {
  const groupedContent: Record<string, Content[]> = {};
  
  contentList.forEach(content => {
    const topicId = content.topicId || 'no-topic';
    if (!groupedContent[topicId]) {
      groupedContent[topicId] = [];
    }
    groupedContent[topicId].push(content);
  });
  
  return groupedContent;
};

export const SlotContent: React.FC<SlotContentProps> = ({
  contentForSlot,
  date,
  timeSlot,
  handleOpenNewPostDialog,
  handleOpenEditDialog,
  getTopicTitle
}) => {
  if (contentForSlot.length === 0) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity"
        onClick={() => handleOpenNewPostDialog(date, timeSlot)}
      >
        <Plus className="h-4 w-4 mr-1" />
        Thêm bài viết
      </Button>
    );
  }

  // Group content by topic ID
  const groupedContent = groupContentByTopic(contentForSlot);
  
  const handleDelete = (post: Content) => {
    // For now, just show a console log - you can connect this to real functionality later
    console.log("Delete post:", post);
  };
  
  return (
    <>
      {Object.keys(groupedContent).map((topicId, groupIndex) => {
        const postsForTopic = groupedContent[topicId];
        const firstPost = postsForTopic[0];
        const topicTitle = getTopicTitle(firstPost);
        
        // Always render posts in a group style, even if there's only one post
        return (
          <div key={`group-${groupIndex}`} className="mb-2 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Topic header */}
            <div className="px-3 pt-2 pb-1 border-b flex justify-between items-center">
              <div className="text-sm font-medium">{topicTitle}</div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleOpenEditDialog(firstPost)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(firstPost)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            {/* Posts in the group */}
            <div className="p-2">
              {postsForTopic.map((post, postIndex) => (
                <div 
                  key={`post-${postIndex}`} 
                  onClick={() => handleOpenEditDialog(post)}
                  className="cursor-pointer"
                >
                  <PostCard 
                    content={post}
                    index={postIndex}
                    topicTitle={topicTitle}
                    isInGroup={true}
                    onEdit={() => handleOpenEditDialog(post)}
                    onDelete={() => handleDelete(post)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};
