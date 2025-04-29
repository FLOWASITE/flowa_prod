
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface FileUploadProps {
  platformId: string;
  onFileUpload: (file: File, name: string, tags: string[]) => Promise<void>;
}

export const FileUpload: React.FC<FileUploadProps> = ({ platformId, onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !fileName) {
      toast.error('Vui lòng chọn file và nhập tên file');
      return;
    }
    
    try {
      setIsUploading(true);
      const tagsList = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      await onFileUpload(selectedFile, fileName, tagsList);
      
      // Reset form
      setSelectedFile(null);
      setFileName('');
      setTags('');
      toast.success('Tải file lên thành công');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Có lỗi xảy ra khi tải file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      <div className="space-y-2">
        <Label htmlFor="file-upload">Chọn file</Label>
        <div className="flex items-center gap-2">
          <Input 
            id="file-upload" 
            type="file" 
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          {selectedFile && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSelectedFile(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file-name">Tên file</Label>
        <Input 
          id="file-name" 
          value={fileName} 
          onChange={(e) => setFileName(e.target.value)} 
          placeholder="Nhập tên file"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file-tags">Tags (cách nhau bởi dấu phẩy)</Label>
        <Input 
          id="file-tags" 
          value={tags} 
          onChange={(e) => setTags(e.target.value)} 
          placeholder="ví dụ: summer, campaign, promotion"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isUploading}>
        {isUploading ? (
          <span className="flex items-center">
            <Upload className="mr-2 h-4 w-4 animate-spin" />
            Đang tải lên...
          </span>
        ) : (
          <span className="flex items-center">
            <Upload className="mr-2 h-4 w-4" />
            Tải lên
          </span>
        )}
      </Button>
    </form>
  );
};
