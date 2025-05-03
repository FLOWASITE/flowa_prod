
export interface Product {
  id?: string;
  brandId?: string;
  name: string;
  description: string;
  features: string[];
  pricing?: string;
  benefits?: string;
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
};
