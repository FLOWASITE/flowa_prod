import React, { useEffect, useState } from 'react';
import { Brand, brandService } from '@/services/brandService';
import { Product, productService } from '@/services/productService';

interface ProductBrandSelectorProps {
  onBrandSelect: (brand: Brand | null) => void;
  onProductSelect: (product: Product | null) => void;
  selectedBrandId?: string;
  selectedProductId?: string;
}

const ProductBrandSelector: React.FC<ProductBrandSelectorProps> = ({
  onBrandSelect,
  onProductSelect,
  selectedBrandId,
  selectedProductId,
}) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await brandService.getBrands();
        setBrands(data);
        
        // If selectedBrandId is provided, fetch products for that brand
        if (selectedBrandId) {
          const selectedBrand = data.find(brand => brand.id === selectedBrandId);
          if (selectedBrand) {
            onBrandSelect(selectedBrand);
            fetchProducts(selectedBrandId);
          }
        }
      } catch (err) {
        setError('Failed to load brands. Please try again.');
        console.error('Error fetching brands:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [selectedBrandId, onBrandSelect]);

  // Fetch products when a brand is selected
  const fetchProducts = async (brandId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts(brandId);
      setProducts(data);
      
      // If selectedProductId is provided, select that product
      if (selectedProductId) {
        const selectedProduct = data.find(product => product.id === selectedProductId);
        if (selectedProduct) {
          onProductSelect(selectedProduct);
        }
      }
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle brand selection
  const handleBrandChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = e.target.value;
    if (brandId === '') {
      onBrandSelect(null);
      onProductSelect(null);
      setProducts([]);
      return;
    }

    const selectedBrand = brands.find(brand => brand.id === brandId);
    if (selectedBrand) {
      onBrandSelect(selectedBrand);
      await fetchProducts(brandId);
    }
  };

  // Handle product selection
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    if (productId === '') {
      onProductSelect(null);
      return;
    }

    const selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
      onProductSelect(selectedProduct);
    }
  };

  return (
    <div className="mb-6">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="mb-4">
        <label htmlFor="brand-select" className="block text-sm font-medium text-gray-700 mb-1">
          Brand
        </label>
        <select
          id="brand-select"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={handleBrandChange}
          value={selectedBrandId || ''}
          disabled={loading}
        >
          <option value="">Select a brand</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {selectedBrandId && (
        <div className="mb-4">
          <label htmlFor="product-select" className="block text-sm font-medium text-gray-700 mb-1">
            Product (Optional)
          </label>
          <select
            id="product-select"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleProductChange}
            value={selectedProductId || ''}
            disabled={loading || products.length === 0}
          >
            <option value="">Select a product (optional)</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          {products.length === 0 && selectedBrandId && !loading && (
            <p className="text-sm text-gray-500 mt-1">No products found for this brand.</p>
          )}
        </div>
      )}

      {loading && <div className="text-sm text-gray-500">Loading...</div>}
    </div>
  );
};

export default ProductBrandSelector;
