import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { formatDateSafely } from '@/lib/utils';

interface ContentPreviewProps {
  text: string;
  platform: string;
  topicTitle?: string;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({
  text,
  platform,
  topicTitle
}) => {
  // Get the platform icon
  const getPlatformIcon = () => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-blue-700" />;
      case 'youtube':
        return <Youtube className="h-5 w-5 text-red-600" />;
      default:
        return <Facebook className="h-5 w-5 text-blue-600" />;
    }
  };

  // Get platform-specific styling
  const getPlatformStyle = () => {
    switch (platform) {
      case 'facebook':
        return 'bg-white border-blue-100';
      case 'instagram':
        return 'bg-gradient-to-br from-purple-100 to-pink-100 border-pink-200';
      case 'twitter':
        return 'bg-white border-blue-100';
      case 'linkedin':
        return 'bg-white border-blue-200';
      case 'youtube':
        return 'bg-white border-red-100';
      default:
        return 'bg-white';
    }
  };

  // Format the text with line breaks
  const formattedText = text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <Card className={`overflow-hidden ${getPlatformStyle()}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          {getPlatformIcon()}
          <div>
            <p className="text-sm font-medium">
              {platform.charAt(0).toUpperCase() + platform.slice(1)} Preview
            </p>
            <p className="text-xs text-gray-500">
              {formatDateSafely(new Date())}
            </p>
          </div>
        </div>
        
        {topicTitle && (
          <p className="text-sm font-medium mb-2">{topicTitle}</p>
        )}
        
        <div className="text-sm whitespace-pre-line">
          {formattedText}
        </div>
      </CardContent>
    </Card>
  );
};
