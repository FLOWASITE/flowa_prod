
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BriefcaseBusiness, 
  FileText, 
  Image, 
  MessageCircle, 
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { currentLanguage } = useLanguage();
  
  const translations = {
    dashboard: {
      vi: 'Bảng điều khiển',
      en: 'Dashboard',
      fr: 'Tableau de bord',
      es: 'Panel de control',
      th: 'แดชบอร์ด',
      id: 'Dasbor'
    },
    brands: {
      vi: 'Thương hiệu',
      en: 'Brands',
      fr: 'Marques',
      es: 'Marcas',
      th: 'แบรนด์',
      id: 'Merek'
    },
    topics: {
      vi: 'Chủ đề',
      en: 'Topics',
      fr: 'Sujets',
      es: 'Temas',
      th: 'หัวข้อ',
      id: 'Topik'
    },
    content: {
      vi: 'Nội dung',
      en: 'Content',
      fr: 'Contenu',
      es: 'Contenido',
      th: 'เนื้อหา',
      id: 'Konten'
    },
    chat: {
      vi: 'Chatbot AI',
      en: 'Chatbot AI',
      fr: 'Chatbot IA',
      es: 'Chatbot IA',
      th: 'แชทบอท AI',
      id: 'Chatbot AI'
    },
    schedule: {
      vi: 'Lịch trình',
      en: 'Schedule',
      fr: 'Calendrier',
      es: 'Horario',
      th: 'กำหนดการ',
      id: 'Jadwal'
    }
  };
  
  const getTranslation = (key) => {
    const lang = currentLanguage.code;
    return translations[key][lang] || translations[key]['en']; // Fallback to English
  };
  
  const navItems = [
    {
      label: getTranslation('dashboard'),
      icon: LayoutDashboard,
      href: '/dashboard',
    },
    {
      label: getTranslation('brands'),
      icon: BriefcaseBusiness,
      href: '/brands',
    },
    {
      label: getTranslation('topics'),
      icon: FileText,
      href: '/topics',
    },
    {
      label: getTranslation('content'),
      icon: Image,
      href: '/content',
    },
    {
      label: getTranslation('chat'),
      icon: MessageCircle,
      href: '/chat',
    },
    {
      label: getTranslation('schedule'),
      icon: Calendar,
      href: '/schedule',
    },
  ];
  
  return (
    <aside 
      className={cn(
        "min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-all duration-300 border-r border-gray-200 dark:border-gray-800",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        {!collapsed ? (
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/3d095938-a60f-4b3e-ae18-df47874ddf1f.png" 
              alt="Flowa Logo" 
              className="h-[100px] object-contain" 
            />
          </Link>
        ) : (
          <Link to="/" className="flex items-center justify-center w-full">
            <img 
              src="/lovable-uploads/3d095938-a60f-4b3e-ae18-df47874ddf1f.png" 
              alt="Flowa Logo" 
              className="h-[80px] w-[80px] object-contain"
            />
          </Link>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors relative",
                  location.pathname.startsWith(item.href)
                    ? "bg-primary/20 text-primary"
                    : "text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  location.pathname.startsWith(item.href) 
                    ? "text-primary" 
                    : "text-gray-500"
                )} />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-2 border-t border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex justify-center hover:bg-primary/10 hover:text-primary"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </aside>
  );
}
