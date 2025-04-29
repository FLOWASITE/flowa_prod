
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, Image, Video } from 'lucide-react';
import { FileTopic, Platform, FileItem } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface FileTreeProps {
  topics: FileTopic[];
  platforms: Platform[];
  files: FileItem[];
  onSelectFile: (file: FileItem) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({ topics, platforms, files, onSelectFile }) => {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [expandedPlatforms, setExpandedPlatforms] = useState<Record<string, boolean>>({});

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const togglePlatform = (platformId: string) => {
    setExpandedPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  const getPlatformIcon = (platformType: string) => {
    switch (platformType) {
      case 'facebook':
        return <Badge className="bg-blue-500">FB</Badge>;
      case 'instagram':
        return <Badge className="bg-pink-500">IG</Badge>;
      case 'tiktok':
        return <Badge className="bg-black">TT</Badge>;
      case 'threads':
        return <Badge className="bg-purple-500">TH</Badge>;
      case 'linkedin':
        return <Badge className="bg-blue-700">LI</Badge>;
      default:
        return null;
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-4 w-4 text-blue-500" />;
    } else if (fileType.startsWith('video/')) {
      return <Video className="h-4 w-4 text-red-500" />;
    } else {
      return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md border overflow-y-auto max-h-[600px]">
      <ul className="space-y-1 p-2">
        {topics.map(topic => (
          <li key={topic.id}>
            <div 
              className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => toggleTopic(topic.id)}
            >
              {expandedTopics[topic.id] ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
              <Folder className="h-5 w-5 text-yellow-500 mr-2" />
              <span>{topic.name}</span>
            </div>
            
            {expandedTopics[topic.id] && (
              <ul className="ml-6 space-y-1 mt-1">
                {platforms
                  .filter(platform => platform.topicId === topic.id)
                  .map(platform => (
                    <li key={platform.id}>
                      <div 
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => togglePlatform(platform.id)}
                      >
                        {expandedPlatforms[platform.id] ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
                        <Folder className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="mr-2">{platform.name}</span>
                        {getPlatformIcon(platform.platformType)}
                      </div>
                      
                      {expandedPlatforms[platform.id] && (
                        <ul className="ml-6 space-y-1 mt-1">
                          {files
                            .filter(file => file.platformId === platform.id)
                            .map(file => (
                              <li key={file.id}>
                                <div 
                                  className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                  onClick={() => onSelectFile(file)}
                                >
                                  {getFileIcon(file.fileType)}
                                  <span className="ml-2 truncate">{file.name}</span>
                                </div>
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
