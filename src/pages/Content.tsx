
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
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
import { Filter, Plus, Edit, Check, X } from 'lucide-react';
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
      "đã duyệt": "bg-green-100 text-green-800",
      "chờ duyệt": "bg-yellow-100 text-yellow-800",
      "từ chối": "bg-red-100 text-red-800",
      "đã lên lịch": "bg-blue-100 text-blue-800",
    };
    
    return (
      <Badge variant="outline" className={statusClasses[status] || ""}>
        {status}
      </Badge>
    );
  };

  // Group contents by topicId
  const groupedContents = mockContents.reduce((acc, content) => {
    if (!acc[content.topicId]) {
      acc[content.topicId] = [];
    }
    acc[content.topicId].push(content);
    return acc;
  }, {} as Record<string, typeof mockContents>);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Nội dung</h1>
          <p className="text-muted-foreground">
            Xem và quản lý nội dung từ các chủ đề đã được phê duyệt trên các nền tảng
          </p>
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
              <DropdownMenuItem>Trạng thái</DropdownMenuItem>
              <DropdownMenuItem>Nền tảng</DropdownMenuItem>
              <DropdownMenuItem>Chủ đề gốc</DropdownMenuItem>
              <DropdownMenuItem>Ngày tạo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tạo nội dung mới
          </Button>
        </div>
      </div>
      
      {Object.entries(groupedContents).map(([topicId, contents]) => (
        <div key={topicId} className="mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Chủ đề: {topicId}</h2>
          </div>
          
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Nền tảng</TableHead>
                  <TableHead>Nội dung (Preview)</TableHead>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Người duyệt</TableHead>
                  <TableHead>Ngày duyệt</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contents.map((content, index) => (
                  <TableRow key={content.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{platformBadge(content.platform)}</TableCell>
                    <TableCell className="max-w-[300px]">
                      <p className="line-clamp-2">{content.text}</p>
                    </TableCell>
                    <TableCell>
                      {content.imageUrl && (
                        <img 
                          src={content.imageUrl} 
                          alt="" 
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      )}
                    </TableCell>
                    <TableCell>{format(new Date(content.createdAt), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>AI Assistant</TableCell>
                    <TableCell>
                      {content.publishedAt ? format(new Date(content.publishedAt), 'dd/MM/yyyy') : '-'}
                    </TableCell>
                    <TableCell>{statusBadge(content.status)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-green-600">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}

      {Object.keys(groupedContents).length === 0 && (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">
            Chưa có nội dung nào. Hãy tạo nội dung đầu tiên của bạn!
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Content;
