import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentTopics } from '@/components/dashboard/RecentTopics';
import { ContentOverview } from '@/components/dashboard/ContentOverview';
import { OnboardingSteps } from '@/components/dashboard/OnboardingSteps';
import { SocialConnections } from '@/components/dashboard/SocialConnections';
import { 
  Layers, 
  MessageSquare, 
  PenTool, 
  Share2
} from 'lucide-react';
import { mockTopics } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { isSupabaseConnected } from '@/integrations/supabase/client';
import { useState } from 'react';

interface DashboardProps {
  backendStatus?: 'checking' | 'connected' | 'disconnected';
}

const Dashboard = ({ backendStatus: initialStatus }: DashboardProps) => {
  const { currentLanguage } = useLanguage();
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>(
    initialStatus || 'checking'
  );

  useEffect(() => {
    if (initialStatus) {
      setStatus(initialStatus);
    }
  }, [initialStatus]);

  const checkSupabaseConnection = async () => {
    setStatus('checking');
    const connected = await isSupabaseConnected();
    setStatus(connected ? 'connected' : 'disconnected');
  };
  
  const contentStatusData = [
    { 
      name: currentLanguage.code === 'vi' ? 'Nháp' : 'Draft', 
      value: 12, 
      color: '#94a3b8' 
    },
    { 
      name: currentLanguage.code === 'vi' ? 'Đã duyệt' : 'Approved', 
      value: 8, 
      color: '#22c55e' 
    },
    { 
      name: currentLanguage.code === 'vi' ? 'Đã lên lịch' : 'Scheduled', 
      value: 5, 
      color: '#eab308' 
    },
    { 
      name: currentLanguage.code === 'vi' ? 'Đã xuất bản' : 'Published', 
      value: 20, 
      color: '#3b82f6' 
    },
  ];

  const translations = {
    dashboard: {
      vi: 'Bảng điều khiển',
      en: 'Dashboard',
      fr: 'Tableau de bord',
      es: 'Panel de control',
      th: 'แดชบอร์ด',
      id: 'Dasbor'
    },
    welcome: {
      vi: 'Chào mừng bạn quay trở lại!',
      en: 'Welcome back!',
      fr: 'Bienvenue à nouveau!',
      es: '¡Bienvenido de nuevo!',
      th: 'ยินดีต้อนรับกลับ!',
      id: 'Selamat datang kembali!'
    },
    totalBrands: {
      vi: 'Tổng số thương hiệu',
      en: 'Total Brands',
      fr: 'Total des marques',
      es: 'Marcas totales',
      th: 'แบรนด์ทั้งหมด',
      id: 'Total Merek'
    },
    activeTopics: {
      vi: 'Chủ đề đang hoạt động',
      en: 'Active Topics',
      fr: 'Sujets actifs',
      es: 'Temas activos',
      th: 'หัวข้อที่ใช้งานอยู่',
      id: 'Topik Aktif'
    },
    publishedContent: {
      vi: 'Nội dung đã xuất bản',
      en: 'Published Content',
      fr: 'Contenu publié',
      es: 'Contenido publicado',
      th: 'เนื้อหาที่เผยแพร่',
      id: 'Konten Terpublikasi'
    },
    conversations: {
      vi: 'Cuộc trò chuyện',
      en: 'Conversations',
      fr: 'Conversations',
      es: 'Conversaciones',
      th: 'บทสนทนา',
      id: 'Percakapan'
    }
  };

  const getTranslation = (key: keyof typeof translations) => {
    const lang = currentLanguage.code;
    return translations[key][lang] || translations[key]['en'];
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Duy Vo</h1>
      </div>

      <OnboardingSteps />
      
      <SocialConnections />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title={getTranslation('totalBrands')}
          value="3"
          icon={<Layers className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title={getTranslation('activeTopics')}
          value="6"
          icon={<PenTool className="h-5 w-5 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title={getTranslation('publishedContent')}
          value="24"
          icon={<Share2 className="h-5 w-5 text-primary" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title={getTranslation('conversations')}
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
