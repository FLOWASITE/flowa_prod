
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Upload } from 'lucide-react';

interface LogoUploadProps {
  onLogoChange: (logo: string) => void;
  translations: {
    uploadLogo: string;
    dragAndDrop: string;
  };
}

export function LogoUpload({ onLogoChange, translations }: LogoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      onLogoChange(imageUrl);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      onLogoChange(imageUrl);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div 
      className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById('logo-upload')?.click()}
    >
      {previewUrl ? (
        <div className="relative w-24 h-24 mx-auto">
          <img 
            src={previewUrl} 
            alt="Logo preview" 
            className="w-full h-full object-contain rounded-lg"
          />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute -top-2 -right-2"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewUrl('');
              setSelectedFile(null);
              onLogoChange('');
            }}
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 mx-auto flex items-center justify-center">
            <Image className="w-6 h-6 text-gray-400" />
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">{translations.uploadLogo}</p>
            <p>{translations.dragAndDrop}</p>
          </div>
        </div>
      )}
      <input
        id="logo-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
