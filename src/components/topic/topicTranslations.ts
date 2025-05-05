// Topic translations interface to define the nested structure
interface TopicTranslationsType {
  cardTitle: Record<string, string>;
  cardDescription: Record<string, string>;
  placeholder: Record<string, string>;
  submitButton: Record<string, string>;
  examplesLabel: Record<string, string>;
  sending: Record<string, string>;
  topicStatus: {
    draft: Record<string, string>;
    approved: Record<string, string>;
    rejected: Record<string, string>;
  };
}

// Topic translations for multiple languages
export const topicTranslations = {
  cardTitle: {
    vi: 'Tạo chủ đề nội dung',
    en: 'Create Content Topic',
    fr: 'Créer un sujet de contenu',
    es: 'Crear tema de contenido',
    th: 'สร้างหัวข้อเนื้อหา',
    id: 'Buat Topik Konten'
  },
  cardDescription: {
    vi: 'Mô tả ngắn gọn chủ đề bạn muốn tạo nội dung',
    en: 'Briefly describe the topic you want to create content for',
    fr: 'Décrivez brièvement le sujet pour lequel vous souhaitez créer du contenu',
    es: 'Describe brevemente el tema para el que deseas crear contenido',
    th: 'อธิบายสั้น ๆ เกี่ยวกับหัวข้อที่คุณต้องการสร้างเนื้อหา',
    id: 'Jelaskan secara singkat topik yang ingin Anda buat kontennya'
  },
  placeholder: {
    vi: 'Ví dụ: Chia sẻ về tính năng mới của sản phẩm X...',
    en: 'Example: Share about new features of product X...',
    fr: 'Exemple: Partagez les nouvelles fonctionnalités du produit X...',
    es: 'Ejemplo: Comparte sobre las nuevas funciones del producto X...',
    th: 'ตัวอย่าง: แชร์เกี่ยวกับคุณสมบัติใหม่ของผลิตภัณฑ์ X...',
    id: 'Contoh: Bagikan tentang fitur baru dari produk X...'
  },
  submitButton: {
    vi: 'Tạo chủ đề',
    en: 'Create Topic',
    fr: 'Créer un sujet',
    es: 'Crear tema',
    th: 'สร้างหัวข้อ',
    id: 'Buat Topik'
  },
  examplesLabel: {
    vi: 'Hoặc chọn từ ví dụ:',
    en: 'Or choose from examples:',
    fr: 'Ou choisissez parmi les exemples:',
    es: 'O elige entre ejemplos:',
    th: 'หรือเลือกจากตัวอย่าง:',
    id: 'Atau pilih dari contoh:'
  },
  sending: {
    vi: 'Đang gửi...',
    en: 'Sending...',
    fr: 'Envoi en cours...',
    es: 'Enviando...',
    th: 'กำลังส่ง...',
    id: 'Mengirim...'
  },
  // Status translations for topics - updated to only include the three statuses
  topicStatus: {
    draft: {
      vi: 'Chờ duyệt',
      en: 'Pending',
      fr: 'En attente',
      es: 'Pendiente',
      th: 'รอดำเนินการ',
      id: 'Tertunda'
    },
    approved: {
      vi: 'Đã duyệt',
      en: 'Approved',
      fr: 'Approuvé',
      es: 'Aprobado',
      th: 'อนุมัติแล้ว',
      id: 'Disetujui'
    },
    rejected: {
      vi: 'Từ chối',
      en: 'Rejected',
      fr: 'Rejeté',
      es: 'Rechazado',
      th: 'ปฏิเสธ',
      id: 'Ditolak'
    }
  },
  
  // New keys
  generateTopic: {
    en: 'Generate Topic with AI',
    vi: 'Tạo chủ đề với AI'
  },
  generateTopicPrompt: {
    en: 'Please generate 3 content topics for our brand that would engage our audience.',
    vi: 'Vui lòng tạo 3 chủ đề nội dung cho thương hiệu của chúng tôi để thu hút khán giả.'
  }
};
