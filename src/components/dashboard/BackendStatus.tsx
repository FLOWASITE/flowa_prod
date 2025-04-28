
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DatabaseZap, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { isSupabaseConnected } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface BackendStatusProps {
  status: 'checking' | 'connected' | 'disconnected';
  onRefresh: () => void;
}

const translations = {
  title: {
    en: 'Backend Status',
    vi: 'Trạng thái Backend',
    fr: 'État du Backend',
    es: 'Estado del Backend',
    th: 'สถานะแบ็กเอนด์',
  },
  connected: {
    en: 'Connected to Supabase',
    vi: 'Đã kết nối với Supabase',
    fr: 'Connecté à Supabase',
    es: 'Conectado a Supabase',
    th: 'เชื่อมต่อกับ Supabase แล้ว',
  },
  disconnected: {
    en: 'Disconnected from backend',
    vi: 'Đã ngắt kết nối với backend',
    fr: 'Déconnecté du backend',
    es: 'Desconectado del backend',
    th: 'ตัดการเชื่อมต่อจากแบ็กเอนด์',
  },
  checking: {
    en: 'Checking connection...',
    vi: 'Đang kiểm tra kết nối...',
    fr: 'Vérification de la connexion...',
    es: 'Verificando conexión...',
    th: 'กำลังตรวจสอบการเชื่อมต่อ...',
  },
  refresh: {
    en: 'Refresh Connection',
    vi: 'Làm mới kết nối',
    fr: 'Rafraîchir la connexion',
    es: 'Actualizar conexión',
    th: 'รีเฟรชการเชื่อมต่อ',
  },
};

export function BackendStatus({ status, onRefresh }: BackendStatusProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleRefresh = async () => {
    onRefresh();
  };
  
  return (
    <Card>
      <CardHeader className={`${status === 'connected' ? 'bg-green-50 dark:bg-green-900/20' : status === 'disconnected' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'} rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <DatabaseZap size={18} />
            {t('title')}
          </CardTitle>
          
          {status === 'connected' && (
            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-medium">
              <CheckCircle2 size={16} />
              Online
            </span>
          )}
          
          {status === 'disconnected' && (
            <span className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 font-medium">
              <AlertTriangle size={16} />
              Offline
            </span>
          )}
          
          {status === 'checking' && (
            <span className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400 font-medium">
              <RefreshCw size={16} className="animate-spin" />
              Checking
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <CardDescription>
          {status === 'connected' && t('connected')}
          {status === 'disconnected' && t('disconnected')}
          {status === 'checking' && t('checking')}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={status === 'checking'}
          className="w-full flex items-center gap-2"
        >
          <RefreshCw size={14} className={status === 'checking' ? 'animate-spin' : ''} />
          {t('refresh')}
        </Button>
      </CardFooter>
    </Card>
  );
}
