import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { Topic } from '@/types';
import { toast } from 'sonner';

interface ContentSuggestionGeneratorProps {
  selectedTopic: Topic | null;
  selectedPlatform: string;
  onSuggestionGenerated: (suggestion: string) => void;
}

export const ContentSuggestionGenerator: React.FC<ContentSuggestionGeneratorProps> = ({
  selectedTopic,
  selectedPlatform,
  onSuggestionGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSuggestion = async () => {
    if (!selectedTopic) {
      toast.error('Vui lòng chọn một chủ đề');
      return;
    }

    setIsGenerating(true);

    try {
      // Generate a suggestion based on the topic and platform
      // This is a simple implementation; in a real app, you would call an AI API
      const platformSpecificPrompts = {
        facebook: 'một bài đăng Facebook ngắn gọn, thân thiện',
        instagram: 'một caption Instagram hấp dẫn với hashtag',
        tiktok: 'một script TikTok ngắn và thu hút',
        threads: 'một thread ngắn gọn và thú vị',
        linkedin: 'một bài đăng LinkedIn chuyên nghiệp',
        twitter: 'một tweet ngắn gọn và ấn tượng',
        youtube: 'một mô tả video YouTube hấp dẫn'
      };

      const platformPrompt = platformSpecificPrompts[selectedPlatform as keyof typeof platformSpecificPrompts] || 'một bài đăng mạng xã hội';
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate content based on topic information
      let suggestion = '';
      
      if (selectedTopic.title.includes('Sữa') || selectedTopic.title.includes('Milk')) {
        suggestion = `🥛 ${selectedTopic.title}\n\nBạn đã biết? ${selectedTopic.description}\n\nHãy cho con yêu của bạn trải nghiệm hương vị tuyệt vời và dinh dưỡng đầy đủ từ sản phẩm của chúng tôi! 💪\n\n#SứcKhỏeTrẻEm #DinhDưỡng #PhátTriểnToànDiện`;
      } else {
        suggestion = `✨ ${selectedTopic.title}\n\n${selectedTopic.description}\n\nHãy khám phá ngay hôm nay để không bỏ lỡ cơ hội tuyệt vời này!\n\n#${selectedTopic.title.replace(/\s+/g, '')} #SảnPhẩmChấtLượng`;
      }
      
      // Adjust based on platform
      if (selectedPlatform === 'twitter') {
        // Make it shorter for Twitter
        suggestion = suggestion.split('\n\n')[0] + '\n\n' + suggestion.split('\n\n')[1];
      } else if (selectedPlatform === 'linkedin') {
        // Make it more professional for LinkedIn
        suggestion = `${selectedTopic.title}\n\nKính gửi quý khách hàng,\n\n${selectedTopic.description}\n\nChúng tôi cam kết mang đến những sản phẩm chất lượng cao nhất cho bạn và gia đình.\n\n#${selectedTopic.title.replace(/\s+/g, '')} #ChấtLượngCaoNhất`;
      }
      
      onSuggestionGenerated(suggestion);
      toast.success('Đã tạo gợi ý nội dung thành công');
    } catch (error) {
      console.error('Error generating suggestion:', error);
      toast.error('Lỗi khi tạo gợi ý nội dung');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={generateSuggestion}
      disabled={isGenerating || !selectedTopic}
      className="flex items-center gap-1"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Đang tạo gợi ý...</span>
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          <span>Tạo gợi ý</span>
        </>
      )}
    </Button>
  );
};
