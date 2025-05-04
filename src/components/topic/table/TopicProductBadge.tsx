
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { mockProductTypes } from '@/data/mock/products';

interface TopicProductBadgeProps {
  productTypeId?: string;
  getTranslation?: (key: string) => string;
}

export const TopicProductBadge: React.FC<TopicProductBadgeProps> = ({
  productTypeId,
  getTranslation
}) => {
  // Function to get product name from product ID
  const getProductNameById = (productId?: string) => {
    if (!productId) return null;
    
    const product = mockProductTypes.find(product => product.id === productId);
    return product ? product.name : productId;
  };

  const productName = getProductNameById(productTypeId);
  const noProductText = getTranslation ? getTranslation('noProduct') : 'Không có';
  
  if (!productName) {
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
        {noProductText}
      </Badge>
    );
  }
  
  return (
    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">
      {productName}
    </Badge>
  );
};
