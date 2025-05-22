import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Topic, Content } from '@/types';
import { toast } from 'sonner';
import { apiClient } from '@/api/apiClient';
import { ContentSuggestionGenerator } from './ContentSuggestionGenerator';
import { ContentPreview } from './ContentPreview';
import { ImageUploader } from './ImageUploader';
import { useApprovedTopicsFetch } from '@/hooks/useApprovedTopicsFetch';

interface CreateContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  approvedTopics?: Topic[];
  onSuccess?: (content: Content) => void;
  isLoading?: boolean;
}

export const CreateContentDialog: React.FC<CreateContentDialogProps> = ({
  open,
  onOpenChange,
  approvedTopics: propApprovedTopics,
  onSuccess,
  isLoading: propIsLoading = false
}) => {
  // Use the hook directly in the component to get the latest data and generation function
  const { 
    approvedTopics: fetchedApprovedTopics, 
    isTopicsLoading,
    generateContentFromTopic,
    isGenerating
  } = useApprovedTopicsFetch();
  
  // Use either the props or the fetched data
  const approvedTopics = propApprovedTopics?.length ? propApprovedTopics : fetchedApprovedTopics;
  const isLoading = propIsLoading || isTopicsLoading;
  
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('facebook');
  const [customText, setCustomText] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<string>('edit');

  // Update selected topic when topic ID changes
  useEffect(() => {
    if (selectedTopicId) {
      const topic = approvedTopics.find(t => t.id === selectedTopicId);
      setSelectedTopic(topic || null);
      
      // Pre-fill custom text with topic title if empty
      if (!customText && topic) {
        setCustomText(topic.title);
      }
    }
  }, [selectedTopicId, approvedTopics, customText]);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedTopicId('');
      setSelectedPlatform('facebook');
      setCustomText('');
      setImageUrl('');
      setIsSubmitting(false);
      setActiveTab('edit');
    }
  }, [open]);

  // Function to generate content from selected topic
  const handleGenerateFromTopic = async () => {
    if (!selectedTopicId) {
      toast.error('Vui lòng chọn một chủ đề');
      return;
    }
    
    // Use the isGenerating state from the hook
    try {
      const response = await generateContentFromTopic(selectedTopicId);
      console.log('Generate content response:', response);
      
      if (response && response.content) {
        // Check if the response has social_media structure (from backend)
        if (response.content.social_media && response.content.social_media.facebook) {
          // Use Facebook content as the default text
          setCustomText(response.content.social_media.facebook);
          toast.success('Đã tạo nội dung từ chủ đề thành công');
        } 
        // Fallback to text property if it exists
        else if (response.content.text) {
          setCustomText(response.content.text);
          toast.success('Đã tạo nội dung từ chủ đề thành công');
        }
        // Check for image URL in various possible locations
        if (response.content.image_url) {
          setImageUrl(response.content.image_url);
        } else if (response.content.social_media && response.content.social_media.image) {
          setImageUrl(response.content.social_media.image);
        }
      } else if (response && response.error) {
        // Handle specific error from the API
        toast.error(response.error || 'Lỗi khi tạo nội dung');
      } else {
        toast.info('Đã tạo nội dung nhưng không có dữ liệu trả về');
      }
    } catch (error) {
      console.error('Error generating content from topic:', error);
      
      // Check for specific error messages
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes('quá tải')) {
        toast.error('Hệ thống đang tạm thời quá tải. Vui lòng thử lại sau ít phút.');
      } else if (
        // @ts-expect-error - Safely check for response properties
        error?.response?.status === 429 || 
        (error?.response?.status === 500 && 
         error?.response?.data?.error?.includes('quota'))
      ) {
        toast.error('Hệ thống đang tạm thời quá tải. Vui lòng thử lại sau ít phút.');
      } else {
        toast.error('Lỗi khi tạo nội dung từ chủ đề');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTopicId) {
      toast.error('Vui lòng chọn một chủ đề');
      return;
    }

    if (!customText.trim()) {
      toast.error('Vui lòng nhập nội dung');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new content with the selected topic, text and image
      const newContent: Partial<Content> = {
        topicId: selectedTopicId,
        platform: selectedPlatform as 'facebook' | 'instagram' | 'tiktok' | 'threads' | 'linkedin' | 'twitter' | 'youtube',
        text: customText,
        imageUrl: imageUrl,
        status: 'draft'
      };

      const response = await apiClient.post<Content>('/api/content', newContent);
      
      toast.success('Đã tạo nội dung mới thành công');
      
      if (onSuccess && response) {
        onSuccess(response);
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating content:', error);
      toast.error('Lỗi khi tạo nội dung mới');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tạo nội dung mới</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="edit">Chỉnh sửa</TabsTrigger>
            <TabsTrigger value="preview">Xem trước</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="topic">Chủ đề đã duyệt</Label>
                  <span className="text-xs text-gray-500">
                    {isLoading ? "Đang tải..." : `${approvedTopics.length} chủ đề`}
                  </span>
                </div>
                
                <Select 
                  value={selectedTopicId} 
                  onValueChange={setSelectedTopicId}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isLoading ? "Đang tải chủ đề..." : "Chọn một chủ đề đã duyệt"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {isLoading ? (
                      <div className="p-4 text-center">
                        <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                        <p className="text-sm text-gray-500">Đang tải chủ đề đã duyệt...</p>
                      </div>
                    ) : approvedTopics.length > 0 ? (
                      approvedTopics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id} className="py-2">
                          <div className="flex flex-col">
                            <span className="font-medium">{topic.title}</span>
                            {topic.description && (
                              <span className="text-xs text-gray-500 truncate max-w-[250px]">
                                {topic.description}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-center text-sm text-gray-500">
                        Không có chủ đề đã duyệt
                      </div>
                    )}
                  </SelectContent>
                </Select>
                
                {selectedTopicId && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="mt-2 w-full"
                    onClick={handleGenerateFromTopic}
                    disabled={isGenerating || !selectedTopicId}
                  >
                    {isGenerating ? 'Đang tạo nội dung...' : 'Tạo nội dung từ chủ đề'}
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform">Nền tảng</Label>
                <Select 
                  value={selectedPlatform} 
                  onValueChange={setSelectedPlatform}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nền tảng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="threads">Threads</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="content">Nội dung</Label>
                  {selectedTopicId && !isGenerating && (
                    <ContentSuggestionGenerator
                      selectedTopic={selectedTopic}
                      selectedPlatform={selectedPlatform}
                      onSuggestionGenerated={(suggestion) => setCustomText(suggestion)}
                    />
                  )}
                </div>
                <Textarea
                  id="content"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Nhập nội dung của bạn hoặc sử dụng nút 'Tạo gợi ý' để tạo nội dung tự động"
                  rows={5}
                  className="resize-none"
                />
              </div>
              
              <ImageUploader 
                onImageSelect={setImageUrl}
                currentImage={imageUrl}
              />
              
              {selectedTopic && (
                <div className="bg-gray-50 p-3 rounded-md text-sm">
                  <p className="font-medium">Thông tin chủ đề:</p>
                  <p><span className="font-medium">Tiêu đề:</span> {selectedTopic.title}</p>
                  <p><span className="font-medium">Mô tả:</span> {selectedTopic.description}</p>
                </div>
              )}
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Hủy
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !selectedTopicId || !customText.trim()}
                >
                  {isSubmitting ? 'Đang tạo...' : 'Tạo nội dung'}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Xem trước nội dung</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab('edit')}
                >
                  Quay lại chỉnh sửa
                </Button>
              </div>
              
              {customText ? (
                <div className="space-y-4">
                  <ContentPreview 
                    text={customText} 
                    platform={selectedPlatform} 
                    topicTitle={selectedTopic?.title}
                  />
                  {imageUrl && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Hình ảnh đính kèm:</p>
                      <img 
                        src={imageUrl} 
                        alt="Content image" 
                        className="max-h-60 rounded-md object-contain"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 border rounded-md">
                  Chưa có nội dung để hiển thị
                </div>
              )}
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Hủy
                </Button>
                <Button 
                  type="button" 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedTopicId || !customText.trim()}
                >
                  {isSubmitting ? 'Đang tạo...' : 'Tạo nội dung'}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
