
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Content } from '@/types';
import { Calendar, MessageSquare, ThumbsUp, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface ContentCardProps {
  content: Content;
}

export function ContentCard({ content }: ContentCardProps) {
  const platformIcons = {
    facebook: <Badge className="bg-blue-500">Facebook</Badge>,
    instagram: <Badge className="bg-pink-500">Instagram</Badge>,
    tiktok: <Badge className="bg-black">TikTok</Badge>,
    threads: <Badge className="bg-purple-500">Threads</Badge>,
    linkedin: <Badge className="bg-blue-700">LinkedIn</Badge>,
  };
  
  const statusColors = {
    draft: "bg-gray-200 text-gray-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    scheduled: "bg-yellow-100 text-yellow-800",
    published: "bg-blue-100 text-blue-800",
  };
  
  const getStatusInfo = () => {
    if (content.status === 'scheduled' && content.scheduledAt) {
      return (
        <div className="flex items-center text-yellow-600">
          <Calendar className="mr-1 h-4 w-4" />
          <span className="text-xs">
            {format(content.scheduledAt, 'MMM dd, yyyy HH:mm')}
          </span>
        </div>
      );
    }
    
    if (content.status === 'published' && content.publishedAt) {
      return (
        <div className="flex items-center text-blue-600">
          <Eye className="mr-1 h-4 w-4" />
          <span className="text-xs">
            {format(content.publishedAt, 'MMM dd, yyyy')}
          </span>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Card className="overflow-hidden">
      {content.imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={content.imageUrl} 
            alt="Content preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            {platformIcons[content.platform]}
          </div>
        </div>
      )}
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className={statusColors[content.status]}>
            {content.status}
          </Badge>
          {getStatusInfo()}
        </div>
        
        <p className="line-clamp-3 text-sm">
          {content.text}
        </p>
        
        <div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>0</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>0</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-900 p-4">
        <Button variant="outline" size="sm" className="w-full">
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
