
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { mockContents } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ContentCard } from '@/components/content/ContentCard';
import { CalendarIcon, Grid, List, Plus } from 'lucide-react';
import { format } from 'date-fns';

const Schedule = () => {
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
  
  const scheduledContent = mockContents.filter(
    content => content.status === 'scheduled'
  );
  
  const platformBadge = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Badge className="bg-blue-500">Facebook</Badge>;
      case 'instagram':
        return <Badge className="bg-pink-500">Instagram</Badge>;
      case 'tiktok':
        return <Badge className="bg-black">TikTok</Badge>;
      case 'threads':
        return <Badge className="bg-purple-500">Threads</Badge>;
      case 'linkedin':
        return <Badge className="bg-blue-700">LinkedIn</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Lịch post</h1>
          <p className="text-muted-foreground">Lên lịch và quản lý nội dung của bạn trên các nền tảng</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-r-none"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-l-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm lịch post
          </Button>
        </div>
      </div>
      
      {viewMode === 'list' ? (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nội dung</TableHead>
                <TableHead>Nền tảng</TableHead>
                <TableHead>Ngày đăng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledContent.map(content => (
                <TableRow key={content.id}>
                  <TableCell className="max-w-xs">
                    <p className="line-clamp-2">{content.text}</p>
                  </TableCell>
                  <TableCell>{platformBadge(content.platform)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {content.scheduledAt ? (
                        format(content.scheduledAt, 'MMM dd, yyyy HH:mm')
                      ) : (
                        'Chưa lên lịch'
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Đã lên lịch
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Sửa</Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {scheduledContent.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Không có nội dung nào được lên lịch
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {scheduledContent.map(content => (
            <ContentCard key={content.id} content={content} />
          ))}
          
          {scheduledContent.length === 0 && (
            <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Không có nội dung nào được lên lịch</p>
              <Button className="mt-4">Lên lịch ngay</Button>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Schedule;
