
export const translations = {
  products: {
    en: 'Products & Services',
    vi: 'Sản phẩm & Dịch vụ',
    fr: 'Produits & Services',
    es: 'Productos y servicios',
    th: 'สินค้าและบริการ',
  },
  addProduct: {
    en: 'Add Product/Service',
    vi: 'Thêm Sản phẩm/Dịch vụ',
    fr: 'Ajouter Produit/Service',
    es: 'Añadir Producto/Servicio',
    th: 'เพิ่มสินค้า/บริการ',
  },
  productName: {
    en: 'Product Name',
    vi: 'Tên sản phẩm',
    fr: 'Nom du produit',
    es: 'Nombre del producto',
    th: 'ชื่อสินค้า',
  },
  productDescription: {
    en: 'Description',
    vi: 'Mô tả',
    fr: 'Description',
    es: 'Descripción',
    th: 'คำอธิบาย',
  },
  features: {
    en: 'Features (one per line)',
    vi: 'Tính năng (mỗi dòng một tính năng)',
    fr: 'Caractéristiques (une par ligne)',
    es: 'Características (una por línea)',
    th: 'คุณสมบัติ (หนึ่งบรรทัดต่อหนึ่งคุณสมบัติ)',
  },
  pricing: {
    en: 'Pricing',
    vi: 'Giá sản phẩm',
    fr: 'Prix',
    es: 'Precio',
    th: 'ราคา',
  },
  benefits: {
    en: 'Benefits',
    vi: 'Công dụng sản phẩm',
    fr: 'Avantages',
    es: 'Beneficios',
    th: 'ประโยชน์',
  },
  noProducts: {
    en: 'No products or services added yet. Click the button below to add your first product.',
    vi: 'Chưa có sản phẩm hoặc dịch vụ nào được thêm. Nhấn nút bên dưới để thêm sản phẩm đầu tiên của bạn.',
    fr: 'Aucun produit ou service ajouté pour l\'instant. Cliquez sur le bouton ci-dessous pour ajouter votre premier produit.',
    es: 'Aún no se han añadido productos o servicios. Haga clic en el botón de abajo para añadir su primer producto.',
    th: 'ยังไม่มีสินค้าหรือบริการที่เพิ่ม คลิกปุ่มด้านล่างเพื่อเพิ่มสินค้าแรกของคุณ',
  },
  importProducts: {
    en: 'Import Products',
    vi: 'Nhập sản phẩm',
    fr: 'Importer des produits',
    es: 'Importar productos',
    th: 'นำเข้าสินค้า',
  },
};

export interface Product {
  id?: string;
  brandId?: string;
  name: string;
  description: string;
  features: string[];
  pricing: string;
  benefits: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductSelectorProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}
