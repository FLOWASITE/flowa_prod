
import React from 'react';
import { FileItem } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Download, Trash, Edit } from 'lucide-react';

interface FileDetailsProps {
  file: FileItem | null;
  onEdit: (fileId: string) => void;
  onDelete: (fileId: string) => void;
  onDownload: (file: FileItem) => void;
}

export const FileDetails: React.FC<FileDetailsProps> = ({ file, onEdit, onDelete, onDownload }) => {
  if (!file) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <p className="text-center text-muted-foreground">Chọn một file để xem chi tiết</p>
        </CardContent>
      </Card>
    );
  }

  const isImage = file.fileType.startsWith('image/');
  const isVideo = file.fileType.startsWith('video/');
  const isDocument = !isImage && !isVideo;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{file.name}</CardTitle>
        <CardDescription>
          Loại file: {file.fileType} | Kích thước: {file.fileSize ? `${Math.round(file.fileSize / 1024)} KB` : 'Không xác định'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {isImage && file.filePath && (
          <div className="flex justify-center mb-4">
            <img 
              src={file.filePath} 
              alt={file.name}
              className="max-h-[300px] object-contain rounded-md"
            />
          </div>
        )}
        
        {isVideo && file.filePath && (
          <div className="flex justify-center mb-4">
            <video 
              src={file.filePath}
              controls
              className="max-h-[300px] rounded-md"
            />
          </div>
        )}

        {isDocument && file.content && (
          <div className="border rounded-md p-4 mb-4 max-h-[300px] overflow-y-auto whitespace-pre-wrap">
            {file.content}
          </div>
        )}

        <div className="space-y-2">
          <div>
            <span className="font-medium">Ngày tạo:</span>{' '}
            {format(new Date(file.createdAt), 'dd/MM/yyyy HH:mm')}
          </div>
          <div>
            <span className="font-medium">Cập nhật lần cuối:</span>{' '}
            {format(new Date(file.updatedAt), 'dd/MM/yyyy HH:mm')}
          </div>
          {file.tags && file.tags.length > 0 && (
            <div className="mt-2">
              <span className="font-medium block mb-1">Tags:</span>
              <div className="flex flex-wrap gap-1">
                {file.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 border-t flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(file.id)}>
            <Edit className="h-4 w-4 mr-1" /> Sửa
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(file.id)}>
            <Trash className="h-4 w-4 mr-1" /> Xóa
          </Button>
        </div>
        <Button variant="secondary" size="sm" onClick={() => onDownload(file)}>
          <Download className="h-4 w-4 mr-1" /> Tải xuống
        </Button>
      </CardFooter>
    </Card>
  );
};
