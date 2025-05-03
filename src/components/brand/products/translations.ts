export interface Product {
  id?: string;
  brandId?: string;
  name: string;           // Product name
  pricing: string;        // Price
  description: string;    // Description
  features: string[];     // We'll keep this but de-emphasize in UI
  benefits?: string;      // We'll keep this but de-emphasize in UI
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const productTranslations = {
  name: {
    en: 'Name',
    vi: 'Tên sản phẩm',
    fr: 'Nom',
    es: 'Nombre',
    th: 'ชื่อ',
  },
  description: {
    en: 'Description',
    vi: 'Mô tả',
    fr: 'Description',
    es: 'Descripción',
    th: 'คำอธิบาย',
  },
  features: {
    en: 'Features',
    vi: 'Tính năng',
    fr: 'Caractéristiques',
    es: 'Características',
    th: 'คุณสมบัติ',
  },
  pricing: {
    en: 'Pricing',
    vi: 'Giá cả',
    fr: 'Tarification',
    es: 'Precios',
    th: 'ราคา',
  },
  benefits: {
    en: 'Benefits',
    vi: 'Lợi ích',
    fr: 'Avantages',
    es: 'Beneficios',
    th: 'ประโยชน์',
  },
  featuresList: {
    en: 'Features List',
    vi: 'Danh sách tính năng',
    fr: 'Liste des caractéristiques',
    es: 'Lista de características',
    th: 'รายการคุณสมบัติ',
  },
  addFeature: {
    en: 'Add Feature',
    vi: 'Thêm tính năng',
    fr: 'Ajouter une caractéristique',
    es: 'Añadir característica',
    th: 'เพิ่มคุณสมบัติ',
  },
  removeFeature: {
    en: 'Remove',
    vi: 'Xóa',
    fr: 'Supprimer',
    es: 'Eliminar',
    th: 'ลบ',
  },
  manageProducts: {
    en: 'Manage Products',
    vi: 'Quản lý sản phẩm',
    fr: 'Gérer les produits',
    es: 'Gestionar productos',
    th: 'จัดการผลิตภัณฑ์',
  },
  noProducts: {
    en: 'No products added yet. Add your first product!',
    vi: 'Chưa có sản phẩm nào. Thêm sản phẩm đầu tiên của bạn!',
    fr: 'Aucun produit ajouté pour l\'instant. Ajoutez votre premier produit !',
    es: 'No hay productos añadidos todavía. ¡Añada su primer producto!',
    th: 'ยังไม่มีผลิตภัณฑ์ เพิ่มผลิตภัณฑ์แรกของคุณ!',
  },
  addProduct: {
    en: 'Add Product',
    vi: 'Thêm sản phẩm',
    fr: 'Ajouter un produit',
    es: 'Añadir producto',
    th: 'เพิ่มผลิตภัณฑ์',
  },
  cancel: {
    en: 'Cancel',
    vi: 'Hủy',
    fr: 'Annuler',
    es: 'Cancelar',
    th: 'ยกเลิก',
  },
  save: {
    en: 'Save',
    vi: 'Lưu',
    fr: 'Enregistrer',
    es: 'Guardar',
    th: 'บันทึก',
  },
  importExcel: {
    en: 'Import from Excel',
    vi: 'Nhập từ Excel',
    fr: 'Importer d\'Excel',
    es: 'Importar de Excel',
    th: 'นำเข้าจาก Excel',
  },
  productName: {
    en: 'Product Name',
    vi: 'Tên sản phẩm',
    fr: 'Nom du produit',
    es: 'Nombre del producto',
    th: 'ชื่อสินค้า',
  },
  productDescription: {
    en: 'Product Description',
    vi: 'Mô tả sản phẩm',
    fr: 'Description du produit',
    es: 'Descripción del producto',
    th: 'รายละเอียดสินค้า',
  },
  price: {
    en: 'Price',
    vi: 'Giá',
    fr: 'Prix',
    es: 'Precio',
    th: 'ราคา',
  },
  totalProducts: {
    en: 'Total Products',
    vi: 'Tổng số sản phẩm',
    fr: 'Total des produits',
    es: 'Total de productos',
    th: 'จำนวนสินค้าทั้งหมด',
  },
  back: {
    en: 'Back',
    vi: 'Quay lại',
    fr: 'Retour',
    es: 'Volver',
    th: 'กลับ',
  },
  importCSV: {
    en: 'Import CSV',
    vi: 'Nhập CSV',
    fr: 'Importer CSV',
    es: 'Importar CSV',
    th: 'นำเข้า CSV',
  },
  importProducts: {
    en: 'Import Products',
    vi: 'Nhập sản phẩm',
    fr: 'Importer des produits',
    es: 'Importar productos',
    th: 'นำเข้าสินค้า',
  },
  previewCSV: {
    en: 'Preview CSV',
    vi: 'Xem trước CSV',
    fr: 'Aperçu CSV',
    es: 'Vista previa CSV',
    th: 'ดูตัวอย่าง CSV',
  },
  importSuccess: {
    en: 'Import Success',
    vi: 'Nhập thành công',
    fr: 'Importation réussie',
    es: 'Importación exitosa',
    th: 'นำเข้าสำเร็จ',
  },
  importUsingCSV: {
    en: 'You can import products using CSV',
    vi: 'Bạn có thể nhập sản phẩm bằng CSV',
    fr: 'Vous pouvez importer des produits en utilisant CSV',
    es: 'Puede importar productos usando CSV',
    th: 'คุณสามารถนำเข้าสินค้าโดยใช้ CSV',
  },
  importOrAddDirectly: {
    en: 'Import products from a CSV file or add them directly below',
    vi: 'Nhập sản phẩm từ tệp CSV hoặc thêm trực tiếp bên dưới',
    fr: 'Importer des produits à partir d\'un fichier CSV ou les ajouter directement ci-dessous',
    es: 'Importar productos desde un archivo CSV o añadirlos directamente a continuación',
    th: 'นำเข้าสินค้าจากไฟล์ CSV หรือเพิ่มโดยตรงด้านล่าง',
  },
};

// Alias for backwards compatibility with existing components
export const translations = productTranslations;
