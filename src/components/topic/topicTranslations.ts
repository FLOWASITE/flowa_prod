
// Topic translations interface to define the nested structure
interface Translation {
  vi: string;
  en: string;
  fr: string;
  es: string;
  th: string;
  id: string;
}

interface TopicTranslationsType {
  cardTitle: Translation;
  cardDescription: Translation;
  promptPlaceholder: Translation;
  generateButton: Translation;
  generatingButton: Translation;
  productA: Translation;
  productB: Translation;
  productC: Translation;
  selectBrandPlaceholder: Translation;
  selectProductPlaceholder: Translation;
  selectBrandRequired: Translation;
  promptRequired: Translation;
  brandApiError: Translation;
  productApiError: Translation;
  topicsCreated: Translation;
  apiError: Translation;
  examplesLabel: Translation;
  sending: Translation;
  loading: Translation;
  noProductsFound: Translation;
  selectBrand: Translation;
  selectProduct: Translation;
  submitButton: Translation;
  topicStatus: {
    draft: Translation;
    approved: Translation;
    rejected: Translation;
  };
}

// Topic translations for multiple languages
export const topicTranslations: TopicTranslationsType = {
  cardTitle: {
    vi: 'Tạo chủ đề nội dung',
    en: 'Create Content Topics',
    fr: 'Créer des sujets de contenu',
    es: 'Crear temas de contenido',
    th: 'สร้างหัวข้อเนื้อหา',
    id: 'Buat Topik Konten'
  },
  topicsCreated: {
    vi: 'Đã tạo chủ đề thành công',
    en: 'Topics created successfully',
    fr: 'Sujets créés avec succès',
    es: 'Temas creados con éxito',
    th: 'สร้างหัวข้อสำเร็จแล้ว',
    id: 'Topik berhasil dibuat'
  },
  apiError: {
    vi: 'Lỗi khi tạo chủ đề. Vui lòng thử lại sau',
    en: 'Error creating topics. Please try again later',
    fr: 'Erreur lors de la création des sujets. Veuillez réessayer plus tard',
    es: 'Error al crear temas. Por favor, inténtelo de nuevo más tarde',
    th: 'เกิดข้อผิดพลาดในการสร้างหัวข้อ โปรดลองอีกครั้งในภายหลัง',
    id: 'Kesalahan saat membuat topik. Silakan coba lagi nanti'
  },
  cardDescription: {
    vi: 'Mô tả ngắn gọn chủ đề bạn muốn tạo nội dung',
    en: 'Briefly describe the topic you want to create content for',
    fr: 'Décrivez brièvement le sujet pour lequel vous souhaitez créer du contenu',
    es: 'Describa brevemente el tema para el que desea crear contenido',
    th: 'อธิบายหัวข้อที่คุณต้องการสร้างเนื้อหาโดยย่อ',
    id: 'Jelaskan secara singkat topik yang ingin Anda buat kontennya'
  },
  promptPlaceholder: {
    vi: 'Ví dụ: Chia sẻ về tính năng mới của sản phẩm X...',
    en: 'Example: Share about the new features of product X...',
    fr: 'Exemple : Partager les nouvelles fonctionnalités du produit X...',
    es: 'Ejemplo: Compartir sobre las nuevas características del producto X...',
    th: 'ตัวอย่าง: แบ่งปันเกี่ยวกับคุณสมบัติใหม่ของผลิตภัณฑ์ X...',
    id: 'Contoh: Bagikan tentang fitur baru produk X...'
  },
  generateButton: {
    vi: 'Tạo chủ đề',
    en: 'Generate Topics',
    fr: 'Générer des sujets',
    es: 'Generar temas',
    th: 'สร้างหัวข้อ',
    id: 'Buat Topik'
  },
  generatingButton: {
    vi: 'Đang tạo...',
    en: 'Generating...',
    fr: 'Génération...',
    es: 'Generando...',
    th: 'กำลังสร้าง...',
    id: 'Membuat...'
  },
  productA: {
    vi: 'Sản phẩm A',
    en: 'Product A',
    fr: 'Produit A',
    es: 'Producto A',
    th: 'สินค้า A',
    id: 'Produk A'
  },
  productB: {
    vi: 'Sản phẩm B',
    en: 'Product B',
    fr: 'Produit B',
    es: 'Producto B',
    th: 'สินค้า B',
    id: 'Produk B'
  },
  productC: {
    vi: 'Sản phẩm C',
    en: 'Product C',
    fr: 'Produit C',
    es: 'Producto C',
    th: 'สินค้า C',
    id: 'Produk C'
  },
  brandApiError: {
    vi: 'Không thể tải thương hiệu. Đang sử dụng dữ liệu mẫu.',
    en: 'Could not load brands. Using sample data.',
    fr: "Impossible de charger les marques. Utilisation des données d'échantillon.",
    es: 'No se pudieron cargar las marcas. Usando datos de muestra.',
    th: 'ไม่สามารถโหลดแบรนด์ได้ กำลังใช้ข้อมูลตัวอย่าง',
    id: 'Tidak dapat memuat merek. Menggunakan data sampel.'
  },
  productApiError: {
    vi: 'Không thể tải sản phẩm. Đang sử dụng dữ liệu mẫu.',
    en: 'Could not load products. Using sample data.',
    fr: "Impossible de charger les produits. Utilisation des données d'échantillon.",
    es: 'No se pudieron cargar los productos. Usando datos de muestra.',
    th: 'ไม่สามารถโหลดสินค้าได้ กำลังใช้ข้อมูลตัวอย่าง',
    id: 'Tidak dapat memuat produk. Menggunakan data sampel.'
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
  loading: {
    vi: 'Đang tải...',
    en: 'Loading...',
    fr: 'Chargement...',
    es: 'Cargando...',
    th: 'กำลังโหลด...',
    id: 'Memuat...'
  },
  noProductsFound: {
    vi: 'Không tìm thấy sản phẩm nào',
    en: 'No products found',
    fr: 'Aucun produit trouvé',
    es: 'No se encontraron productos',
    th: 'ไม่พบสินค้า',
    id: 'Tidak ada produk ditemukan'
  },
  selectBrand: {
    vi: 'Chọn thương hiệu',
    en: 'Select Brand',
    fr: 'Sélectionner la marque',
    es: 'Seleccionar marca',
    th: 'เลือกแบรนด์',
    id: 'Pilih Merek'
  },
  selectProduct: {
    vi: 'Chọn sản phẩm',
    en: 'Select Product',
    fr: 'Sélectionner le produit',
    es: 'Seleccionar producto',
    th: 'เลือกสินค้า',
    id: 'Pilih Produk'
  },
  selectBrandPlaceholder: {
    vi: 'Chọn một thương hiệu',
    en: 'Select a brand',
    fr: 'Sélectionner une marque',
    es: 'Seleccionar una marca',
    th: 'เลือกแบรนด์',
    id: 'Pilih sebuah merek'
  },
  selectProductPlaceholder: {
    vi: 'Chọn một sản phẩm (tùy chọn)',
    en: 'Select a product (optional)',
    fr: 'Sélectionner un produit (optionnel)',
    es: 'Seleccionar un producto (opcional)',
    th: 'เลือกสินค้า (ไม่บังคับ)',
    id: 'Pilih sebuah produk (opsional)'
  },
  selectBrandRequired: {
    vi: 'Vui lòng chọn một thương hiệu',
    en: 'Please select a brand',
    fr: 'Veuillez sélectionner une marque',
    es: 'Por favor seleccione una marca',
    th: 'โปรดเลือกแบรนด์',
    id: 'Silakan pilih merek'
  },
  promptRequired: {
    vi: 'Vui lòng nhập nội dung chủ đề',
    en: 'Please enter a prompt',
    fr: 'Veuillez entrer une invite',
    es: 'Por favor ingrese un prompt',
    th: 'โปรดป้อนข้อความ',
    id: 'Silakan masukkan prompt'
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
  }
};
