import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageIcon, X, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  currentImage
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Kích thước file quá lớn. Tối đa 5MB.');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Chỉ chấp nhận file hình ảnh.');
      return;
    }

    setIsUploading(true);

    // Create a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
      onImageSelect(reader.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => {
      toast.error('Lỗi khi đọc file.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageSelect('');
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Hình ảnh</Label>
      
      {previewUrl ? (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-40 object-cover rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-md p-4 text-center">
          <ImageIcon className="h-10 w-10 mx-auto text-gray-400" />
          <p className="text-sm text-gray-500 mt-2">Chưa có hình ảnh</p>
          <div className="mt-2">
            <Label 
              htmlFor="image-upload" 
              className="cursor-pointer inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Upload className="h-4 w-4" />
              Tải lên hình ảnh
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>
        </div>
      )}
    </div>
  );
};
