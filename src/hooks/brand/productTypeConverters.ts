
import { ProductType } from '@/types';
import { Product } from '@/components/brand/products/translations';

// Function to convert between Product and ProductType
export const convertToProduct = (productType: ProductType): Product => {
  return {
    id: productType.id,
    brandId: productType.brandId,
    name: productType.name,
    description: productType.description,
    features: productType.features,
    pricing: productType.pricing || '',
    benefits: productType.benefits || '',
    image: productType.image,
    createdAt: productType.createdAt,
    updatedAt: productType.updatedAt
  };
};

export const convertToProductType = (product: Product): ProductType => {
  return {
    id: product.id || '',
    brandId: product.brandId || '',
    name: product.name,
    description: product.description,
    features: product.features,
    pricing: product.pricing,
    benefits: product.benefits,
    image: product.image,
    createdAt: product.createdAt || new Date(),
    updatedAt: product.updatedAt || new Date()
  };
};
