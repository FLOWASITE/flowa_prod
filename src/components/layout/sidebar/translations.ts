
import { Language } from '@/types/language';

export const sidebarTranslations = {
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
    vi: 'Lịch đăng bài',
    en: 'Post Schedule',
    fr: 'Calendrier de publication',
    es: 'Calendario de publicación',
    th: 'ตารางโพสต์',
    id: 'Jadwal Posting'
  },
  users: {
    vi: 'Người dùng',
    en: 'Users',
    fr: 'Utilisateurs',
    es: 'Usuarios',
    th: 'ผู้ใช้',
    id: 'Pengguna'
  },
  crm: {
    vi: 'Quản lý CRM',
    en: 'CRM',
    fr: 'CRM',
    es: 'CRM',
    th: 'CRM',
    id: 'CRM'
  },
  fileManager: {
    vi: 'Quản lý dữ liệu',
    en: 'Data Management',
    fr: 'Gestion de données',
    es: 'Gestión de datos',
    th: 'จัดการข้อมูล',
    id: 'Manajemen Data'
  }
};

export const getTranslation = (key: string, language: Language) => {
  const lang = language.code;
  return sidebarTranslations[key][lang] || sidebarTranslations[key]['en']; // Fallback to English
};
