
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  brandKnowledge: {
    vi: 'Kiến thức Brand',
    en: 'Brand Knowledge',
    fr: 'Connaissances de la marque',
    es: 'Conocimiento de marca',
    th: 'ความรู้แบรนด์',
  },
  brandKnowledgeDescription: {
    vi: 'Thêm kiến thức về thương hiệu để AI học và tạo nội dung tốt hơn',
    en: 'Add brand knowledge for AI to learn and generate better content',
    fr: 'Ajouter des connaissances sur la marque pour que l\'IA apprenne et génère un meilleur contenu',
    es: 'Agregue conocimiento de marca para que la IA aprenda y genere mejor contenido',
    th: 'เพิ่มความรู้เกี่ยวกับแบรนด์เพื่อให้ AI เรียนรู้และสร้างเนื้อหาที่ดีขึ้น',
  },
  brandInfo: {
    vi: 'Thông tin thương hiệu',
    en: 'Brand Information',
    fr: 'Informations sur la marque',
    es: 'Información de la marca',
    th: 'ข้อมูลแบรนด์',
  },
  brandInfoPlaceholder: {
    vi: 'Nhập thông tin về lịch sử thương hiệu, giá trị cốt lõi, đối tượng mục tiêu và hướng dẫn thương hiệu...',
    en: 'Enter information about brand history, core values, target audience and brand guidelines...',
    fr: 'Entrez des informations sur l\'histoire de la marque, les valeurs fondamentales, le public cible et les directives de la marque...',
    es: 'Ingrese información sobre la historia de la marca, valores fundamentales, público objetivo y directrices de la marca...',
    th: 'ป้อนข้อมูลเกี่ยวกับประวัติแบรนด์ ค่านิยมหลัก กลุ่มเป้าหมาย และแนวทางแบรนด์...',
  },
  manageQA: {
    vi: 'Quản lý câu hỏi & trả lời',
    en: 'Manage Q&A',
    fr: 'Gérer Q&R',
    es: 'Gestionar preguntas y respuestas',
    th: 'จัดการคำถามและคำตอบ',
  }
};

export function useBrandKnowledge() {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return { t };
}
