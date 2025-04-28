
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentTopics } from '@/components/dashboard/RecentTopics';
import { ContentOverview } from '@/components/dashboard/ContentOverview';
import { 
  Layers, 
  MessageSquare, 
  PenTool, 
  Calendar,
  Share2
} from 'lucide-react';
import { mockTopics } from '@/data/mockData';

const Dashboard = () => {
  const contentStatusData = [
    { name: 'Nháp', value: 12, color: '#94a3b8' },
    { name: 'Đã duyệt', value: 8, color: '#22c55e' },
    { name: 'Đã lên lịch', value: 5, color: '#eab308' },
    { name: 'Đã xuất bản', value: 20, color: '#3b82f6' },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
        <p className="text-muted-foreground">Chào mừng bạn quay trở lại!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Tổng số thương hiệu"
          value="3"
          icon={<Layers className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Chủ đề đang hoạt động"
          value="6"
          icon={<PenTool className="h-5 w-5 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Nội dung đã xuất bản"
          value="24"
          icon={<Share2 className="h-5 w-5 text-primary" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Cuộc trò chuyện"
          value="18"
          icon={<MessageSquare className="h-5 w-5 text-primary" />}
          trend={{ value: 5, isPositive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RecentTopics topics={mockTopics} />
        </div>
        <div>
          <ContentOverview data={contentStatusData} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
