
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ContentCard } from '@/components/content/ContentCard';
import { mockContents } from '@/data/mockData';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Plus } from 'lucide-react';
import { format } from 'date-fns';

const Content = () => {
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

  const statusBadge = (status: string) => {
    const statusClasses = {
      draft: "bg-gray-200 text-gray-800",
      scheduled: "bg-yellow-100 text-yellow-800",
      published: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge variant="outline" className={statusClasses[status] || ""}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Nội dung</h1>
          <p className="text-muted-foreground">Xem và quản lý nội dung của bạn trên các nền tảng</p>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Bộ lọc
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Lọc theo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Trạng thái
              </DropdownMenuItem>
              <DropdownMenuItem>
                Nền tảng
              </DropdownMenuItem>
              <DropdownMenuItem>
                Ngày tạo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tạo nội dung mới
          </Button>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nội dung</TableHead>
              <TableHead>Nền tảng</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockContents.map((content) => (
              <TableRow key={content.id}>
                <TableCell className="max-w-xs">
                  <div className="flex items-center gap-4">
                    {content.imageUrl && (
                      <img 
                        src={content.imageUrl} 
                        alt="" 
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    )}
                    <p className="line-clamp-2">{content.text}</p>
                  </div>
                </TableCell>
                <TableCell>{platformBadge(content.platform)}</TableCell>
                <TableCell>{format(new Date(content.createdAt), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{statusBadge(content.status)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Chỉnh sửa</Button>
                </TableCell>
              </TableRow>
            ))}
            
            {mockContents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-muted-foreground">Chưa có nội dung nào. Hãy tạo nội dung đầu tiên của bạn!</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Content;
