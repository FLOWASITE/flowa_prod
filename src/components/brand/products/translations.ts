
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

export const translations = {
  manageProducts: {
    vi: 'Quản lý sản phẩm',
    en: 'Manage Products',
    fr: 'Gérer les produits',
    es: 'Gestionar productos',
    th: 'จัดการสินค้า',
  },
  addProduct: {
    vi: 'Thêm sản phẩm',
    en: 'Add Product',
    fr: 'Ajouter un produit',
    es: 'Añadir producto',
    th: 'เพิ่มสินค้า',
  },
  importProducts: {
    vi: 'Nhập sản phẩm',
    en: 'Import Products',
    fr: 'Importer des produits',
    es: 'Importar productos',
    th: 'นำเข้าสินค้า',
  },
  productName: {
    vi: 'Tên sản phẩm',
    en: 'Product Name',
    fr: 'Nom du produit',
    es: 'Nombre del producto',
    th: 'ชื่อสินค้า',
  },
  productDescription: {
    vi: 'Mô tả sản phẩm',
    en: 'Product Description',
    fr: 'Description du produit',
    es: 'Descripción del producto',
    th: 'คำอธิบายสินค้า',
  },
  features: {
    vi: 'Tính năng',
    en: 'Features',
    fr: 'Fonctionnalités',
    es: 'Características',
    th: 'คุณสมบัติ',
  },
  pricing: {
    vi: 'Giá sản phẩm',
    en: 'Pricing',
    fr: 'Tarification',
    es: 'Precios',
    th: 'ราคา',
  },
  benefits: {
    vi: 'Công dụng sản phẩm',
    en: 'Benefits',
    fr: 'Avantages',
    es: 'Beneficios',
    th: 'ประโยชน์',
  },
  totalProducts: {
    vi: 'Tổng số sản phẩm',
    en: 'Total Products',
    fr: 'Nombre total de produits',
    es: 'Total de productos',
    th: 'สินค้าทั้งหมด',
  },
  back: {
    vi: 'Quay lại',
    en: 'Back',
    fr: 'Retour',
    es: 'Volver',
    th: 'กลับ',
  },
  noProducts: {
    vi: 'Chưa có sản phẩm nào',
    en: 'No products yet',
    fr: 'Pas encore de produits',
    es: 'No hay productos todavía',
    th: 'ยังไม่มีสินค้า',
  }
};
