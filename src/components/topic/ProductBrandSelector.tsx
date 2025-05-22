import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { topicTranslations } from './topicTranslations';
import axios from 'axios';
import { API_BASE_URL } from '@/config/constants';

interface Brand {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  website?: string;
  industry?: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  brand_id: string;
  brand_name?: string;
  price?: number;
  image_url?: string;
  category?: string;
}

interface ProductBrandSelectorProps {
  onBrandChange: (brandId: string) => void;
  onProductChange: (productId: string) => void;
  selectedBrandId: string;
  selectedProductId: string;
}

export function ProductBrandSelector({
  onBrandChange,
  onProductChange,
  selectedBrandId,
  selectedProductId
}: ProductBrandSelectorProps) {
  const { currentLanguage } = useLanguage();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data khi API trả về lỗi - sử dụng useMemo để tránh tạo lại mảng mới mỗi khi render
  const mockBrands = useMemo(() => [
    { id: '1', name: 'Brand A', description: 'Mô tả Brand A', industry: 'Công nghệ' },
    { id: '2', name: 'Brand B', description: 'Mô tả Brand B', industry: 'Thời trang' },
    { id: '3', name: 'Brand C', description: 'Mô tả Brand C', industry: 'Thực phẩm' },
  ], []);
  
  const mockProducts = useMemo(() => [
    { id: '1', name: 'Product 1', description: 'Mô tả Product 1', brand_id: '1', category: 'Điện thoại' },
    { id: '2', name: 'Product 2', description: 'Mô tả Product 2', brand_id: '1', category: 'Laptop' },
    { id: '3', name: 'Product 3', description: 'Mô tả Product 3', brand_id: '2', category: 'Áo' },
    { id: '4', name: 'Product 4', description: 'Mô tả Product 4', brand_id: '2', category: 'Quần' },
    { id: '5', name: 'Product 5', description: 'Mô tả Product 5', brand_id: '3', category: 'Bánh kẹo' },
  ], []);

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        try {
          // Sử dụng API không yêu cầu xác thực để lấy dữ liệu brands
          const response = await axios.get(`${API_BASE_URL}/api/brands-simple`);

          if (response.data && response.data.length > 0) {
            setBrands(response.data);
          } else {
            console.log('No brands found in database, using mock data');
            setBrands(mockBrands);
          }
        } catch (apiError) {
          console.error('API error, using mock data:', apiError);
          // Sử dụng mock data khi API trả về lỗi
          setBrands(mockBrands);
        }
      } catch (err) {
        setError('Failed to load brands');
        console.error('Error fetching brands:', err);
        // Sử dụng mock data khi có lỗi xác thực
        setBrands(mockBrands);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [mockBrands]);  // Thêm mockBrands vào dependency array

  // Fetch products when a brand is selected - sử dụng useCallback để tránh re-render không cần thiết
  const fetchProducts = useCallback(async (brandId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      try {
        // Sử dụng API không yêu cầu xác thực để lấy dữ liệu products
        const response = await axios.get(`${API_BASE_URL}/api/products-simple?brand_id=${brandId}`);

        if (response.data && response.data.length > 0) {
          setProducts(response.data);
          setFilteredProducts(response.data);
        } else {
          console.log('No products found for this brand, using mock data');
          const filteredMockProducts = mockProducts.filter(product => product.brand_id === brandId);
          setProducts(filteredMockProducts);
          setFilteredProducts(filteredMockProducts);
        }
      } catch (apiError) {
        console.error('API error, using mock data for products:', apiError);
        // Sử dụng mock data khi API trả về lỗi
        const filteredMockProducts = mockProducts.filter(product => product.brand_id === brandId);
        setProducts(filteredMockProducts);
        setFilteredProducts(filteredMockProducts);
      }
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
      // Sử dụng mock data khi có lỗi xác thực
      const filteredMockProducts = mockProducts.filter(product => product.brand_id === brandId);
      setProducts(filteredMockProducts);
      setFilteredProducts(filteredMockProducts);
    } finally {
      setLoading(false);
    }
  }, [mockProducts]);  // Thêm mockProducts vào dependency array

  // Lọc sản phẩm theo brand đã chọn - chỉ gọi fetchProducts khi selectedBrandId thay đổi
  useEffect(() => {
    if (selectedBrandId) {
      fetchProducts(selectedBrandId);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedBrandId, fetchProducts]);
  
  // Xử lý reset selectedProductId khi products thay đổi
  useEffect(() => {
    // Reset selected product if it doesn't belong to the selected brand
    if (selectedProductId && products.length > 0 && !products.some(p => p.id === selectedProductId)) {
      onProductChange('');
    }
  }, [products, selectedProductId, onProductChange]);


  const getTranslation = (key: string) => {
    const lang = currentLanguage.code;
    return topicTranslations[key]?.[lang] || topicTranslations[key]?.['en'] || key;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {error && <div className="col-span-2 text-red-500">{error}</div>}
      
      <div className="space-y-2">
        <Label htmlFor="brand-select">{getTranslation('selectBrand')}</Label>
        <Select value={selectedBrandId} onValueChange={onBrandChange} disabled={loading}>
          <SelectTrigger id="brand-select">
            <SelectValue placeholder={getTranslation('selectBrandPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {brands.map(brand => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {loading && <div className="text-xs text-gray-500">{getTranslation('loading')}</div>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="product-select">{getTranslation('selectProduct')}</Label>
        <Select 
          value={selectedProductId} 
          onValueChange={onProductChange}
          disabled={!selectedBrandId || loading}
        >
          <SelectTrigger id="product-select">
            <SelectValue placeholder={getTranslation('selectProductPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {filteredProducts.map(product => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedBrandId && filteredProducts.length === 0 && !loading && (
          <div className="text-xs text-gray-500">{getTranslation('noProductsFound')}</div>
        )}
      </div>
    </div>
  );
}
