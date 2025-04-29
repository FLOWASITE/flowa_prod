
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { FileTree } from '@/components/filemanager/FileTree';
import { FileUpload } from '@/components/filemanager/FileUpload';
import { FileDetails } from '@/components/filemanager/FileDetails';
import { FileSearch } from '@/components/filemanager/FileSearch';
import { TopicDialog } from '@/components/filemanager/TopicDialog';
import { PlatformDialog } from '@/components/filemanager/PlatformDialog';
import { FileTopic, Platform, FileItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, FolderPlus, Plus } from 'lucide-react';
import { api } from '@/integrations/supabase/client';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const FileManager = () => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('');
  const [isTopicDialogOpen, setIsTopicDialogOpen] = useState(false);
  const [isPlatformDialogOpen, setIsPlatformDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({ query: '', tag: '', date: null as Date | null });
  const [isEditingTopic, setIsEditingTopic] = useState(false);
  const [isEditingPlatform, setIsEditingPlatform] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<FileTopic | null>(null);
  const [currentPlatform, setCurrentPlatform] = useState<Platform | null>(null);
  
  const queryClient = useQueryClient();

  // Fetch topics from Supabase
  const { data: topics = [], isLoading: isTopicsLoading, error: topicsError } = useQuery({
    queryKey: ['fileTopics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      return data.map(topic => ({
        id: topic.id,
        name: topic.name,
        description: topic.description || '',
        createdAt: new Date(topic.created_at),
        updatedAt: new Date(topic.updated_at),
      })) as FileTopic[];
    }
  });

  // Fetch platforms from Supabase
  const { data: platforms = [], isLoading: isPlatformsLoading, error: platformsError } = useQuery({
    queryKey: ['filePlatforms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('platforms')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      return data.map(platform => ({
        id: platform.id,
        topicId: platform.topic_id,
        platformType: platform.platform_type,
        name: platform.name,
        description: platform.description || '',
        createdAt: new Date(platform.created_at),
        updatedAt: new Date(platform.updated_at),
      })) as Platform[];
    }
  });

  // Fetch files from Supabase
  const { data: files = [], isLoading: isFilesLoading, error: filesError } = useQuery({
    queryKey: ['files', searchParams],
    queryFn: async () => {
      let query = supabase.from('files').select('*');
      
      if (searchParams.query) {
        query = query.ilike('name', `%${searchParams.query}%`);
      }
      
      if (searchParams.tag) {
        query = query.contains('tags', [searchParams.tag]);
      }
      
      if (searchParams.date) {
        const startOfDay = new Date(searchParams.date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(searchParams.date);
        endOfDay.setHours(23, 59, 59, 999);
        
        query = query.gte('created_at', startOfDay.toISOString())
                     .lte('created_at', endOfDay.toISOString());
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(file => ({
        id: file.id,
        platformId: file.platform_id,
        name: file.name,
        fileType: file.file_type,
        content: file.content,
        filePath: file.file_path,
        fileSize: file.file_size,
        tags: file.tags || [],
        createdAt: new Date(file.created_at),
        updatedAt: new Date(file.updated_at),
      })) as FileItem[];
    }
  });

  // Check for loading and error states
  const isLoading = isTopicsLoading || isPlatformsLoading || isFilesLoading;
  const error = topicsError || platformsError || filesError;

  // Handle file selection
  const handleSelectFile = (file: FileItem) => {
    setSelectedFile(file);
  };

  // Handle file upload
  const handleFileUpload = async (file: File, name: string, tags: string[]) => {
    if (!selectedPlatformId) {
      toast.error("Vui lòng chọn một nền tảng trước khi tải lên");
      return;
    }

    try {
      // For document files, read the content
      let content: string | null = null;
      let filePath: string | null = null;
      let fileSize = file.size;

      if (file.type.startsWith('text/') || file.type === 'application/json') {
        content = await file.text();
      } else {
        // Upload the file to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('file_assets')
          .upload(`uploads/${fileName}`, file);

        if (uploadError) throw uploadError;

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('file_assets')
          .getPublicUrl(`uploads/${fileName}`);

        filePath = urlData.publicUrl;
      }

      // Save the file metadata to the database
      const { error } = await supabase.from('files').insert({
        platform_id: selectedPlatformId,
        name: name,
        file_type: file.type,
        content: content,
        file_path: filePath,
        file_size: fileSize,
        tags: tags
      });

      if (error) throw error;

      // Refresh the files list
      queryClient.invalidateQueries({ queryKey: ['files'] });

    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Có lỗi xảy ra khi tải file lên');
      throw error;
    }
  };

  // Handle file edit
  const handleEditFile = (fileId: string) => {
    toast.info("Tính năng chỉnh sửa file đang được phát triển");
  };

  // Handle file delete
  const handleDeleteFile = async (fileId: string) => {
    try {
      const fileToDelete = files.find(f => f.id === fileId);
      
      if (!fileToDelete) {
        toast.error('Không tìm thấy file');
        return;
      }
      
      // If the file has a file path, delete it from storage
      if (fileToDelete.filePath) {
        const filePathParts = fileToDelete.filePath.split('/');
        const fileName = filePathParts[filePathParts.length - 1];
        const { error: storageError } = await supabase.storage
          .from('file_assets')
          .remove([`uploads/${fileName}`]);
          
        if (storageError) {
          console.error('Error deleting file from storage:', storageError);
        }
      }
      
      // Delete the file record from the database
      const { error } = await supabase
        .from('files')
        .delete()
        .eq('id', fileId);
        
      if (error) throw error;
      
      // Update state
      if (selectedFile && selectedFile.id === fileId) {
        setSelectedFile(null);
      }
      
      toast.success('Xóa file thành công');
      queryClient.invalidateQueries({ queryKey: ['files'] });
      
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Có lỗi xảy ra khi xóa file');
    }
  };

  // Handle file download
  const handleDownloadFile = async (file: FileItem) => {
    if (file.filePath) {
      // For files with a URL, open in a new tab
      window.open(file.filePath, '_blank');
    } else if (file.content) {
      // For text content, create a blob and download
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      toast.error('Không có nội dung để tải xuống');
    }
  };

  // Handle topic creation/edit
  const handleTopicSubmit = async (data: { name: string; description: string }) => {
    try {
      if (isEditingTopic && currentTopic) {
        const { error } = await supabase
          .from('topics')
          .update({
            name: data.name,
            description: data.description,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentTopic.id);
          
        if (error) throw error;
        toast.success('Cập nhật chủ đề thành công');
      } else {
        const { error } = await supabase
          .from('topics')
          .insert({
            name: data.name,
            description: data.description
          });
          
        if (error) throw error;
        toast.success('Tạo chủ đề thành công');
      }
      
      queryClient.invalidateQueries({ queryKey: ['fileTopics'] });
      setIsTopicDialogOpen(false);
      
    } catch (error) {
      console.error('Error saving topic:', error);
      toast.error('Có lỗi xảy ra khi lưu chủ đề');
    }
  };

  // Handle platform creation/edit
  const handlePlatformSubmit = async (data: { topicId: string; platformType: string; name: string; description: string }) => {
    try {
      if (isEditingPlatform && currentPlatform) {
        const { error } = await supabase
          .from('platforms')
          .update({
            name: data.name,
            description: data.description,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentPlatform.id);
          
        if (error) throw error;
        toast.success('Cập nhật nền tảng thành công');
      } else {
        // Check if platform already exists for this topic
        const { data: existingPlatforms, error: checkError } = await supabase
          .from('platforms')
          .select('*')
          .eq('topic_id', data.topicId)
          .eq('platform_type', data.platformType);
          
        if (checkError) throw checkError;
        
        if (existingPlatforms && existingPlatforms.length > 0) {
          toast.error('Nền tảng này đã tồn tại cho chủ đề này');
          return;
        }
          
        const { error } = await supabase
          .from('platforms')
          .insert({
            topic_id: data.topicId,
            platform_type: data.platformType,
            name: data.name,
            description: data.description
          });
          
        if (error) throw error;
        toast.success('Tạo nền tảng thành công');
      }
      
      queryClient.invalidateQueries({ queryKey: ['filePlatforms'] });
      setIsPlatformDialogOpen(false);
      
    } catch (error) {
      console.error('Error saving platform:', error);
      toast.error('Có lỗi xảy ra khi lưu nền tảng');
    }
  };

  // Handle search
  const handleSearch = (query: string, tag: string, date: Date | null) => {
    setSearchParams({ query, tag, date });
  };

  // Component to show when there's no data
  const NoData = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <FolderPlus className="h-12 w-12 text-muted-foreground" />
      <div className="text-center">
        <h3 className="text-lg font-medium">Chưa có dữ liệu</h3>
        <p className="text-muted-foreground">Bắt đầu bằng cách tạo chủ đề và nền tảng</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => {
          setIsEditingTopic(false);
          setCurrentTopic(null);
          setIsTopicDialogOpen(true);
        }}>
          Tạo chủ đề mới
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quản lý dữ liệu</h1>
          <p className="text-muted-foreground">Quản lý các tài liệu theo chủ đề và nền tảng</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => {
              setIsEditingTopic(false);
              setCurrentTopic(null);
              setIsTopicDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm chủ đề
          </Button>
          <Button
            onClick={() => {
              if (topics.length === 0) {
                toast.error("Vui lòng tạo chủ đề trước khi thêm nền tảng");
                return;
              }
              setIsEditingPlatform(false);
              setCurrentPlatform(null);
              setIsPlatformDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm nền tảng
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      ) : topics.length === 0 ? (
        <NoData />
      ) : (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="space-y-4">
              <FileTree 
                topics={topics} 
                platforms={platforms} 
                files={files} 
                onSelectFile={handleSelectFile} 
              />
              
              <Tabs defaultValue="search">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="search">Tìm kiếm</TabsTrigger>
                  <TabsTrigger value="upload">Tải lên</TabsTrigger>
                </TabsList>
                <TabsContent value="search" className="mt-2">
                  <FileSearch onSearch={handleSearch} />
                </TabsContent>
                <TabsContent value="upload" className="mt-2">
                  <div className="mb-2">
                    <label className="text-sm font-medium">Chọn nền tảng để tải lên:</label>
                    <select 
                      className="mt-1 block w-full p-2 border rounded-md"
                      value={selectedPlatformId}
                      onChange={(e) => setSelectedPlatformId(e.target.value)}
                    >
                      <option value="">-- Chọn nền tảng --</option>
                      {platforms.map(platform => (
                        <option key={platform.id} value={platform.id}>
                          {platform.name} ({topics.find(t => t.id === platform.topicId)?.name})
                        </option>
                      ))}
                    </select>
                  </div>
                  <FileUpload 
                    platformId={selectedPlatformId} 
                    onFileUpload={handleFileUpload} 
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-9">
            <FileDetails 
              file={selectedFile} 
              onEdit={handleEditFile} 
              onDelete={handleDeleteFile} 
              onDownload={handleDownloadFile} 
            />
          </div>
        </div>
      )}
      
      {/* Dialogs */}
      <TopicDialog 
        open={isTopicDialogOpen}
        onOpenChange={setIsTopicDialogOpen}
        onSubmit={handleTopicSubmit}
        isEditing={isEditingTopic}
        defaultValues={currentTopic ? { name: currentTopic.name, description: currentTopic.description || '' } : undefined}
      />
      
      <PlatformDialog 
        open={isPlatformDialogOpen}
        onOpenChange={setIsPlatformDialogOpen}
        onSubmit={handlePlatformSubmit}
        isEditing={isEditingPlatform}
        topics={topics}
        defaultValues={currentPlatform ? {
          topicId: currentPlatform.topicId,
          platformType: currentPlatform.platformType,
          name: currentPlatform.name,
          description: currentPlatform.description || ''
        } : undefined}
      />
    </Layout>
  );
};

export default FileManager;
