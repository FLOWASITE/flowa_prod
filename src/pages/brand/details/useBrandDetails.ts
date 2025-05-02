
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brand, ProductType } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { mockBrands } from '@/data/mockData';
import { Product } from '@/components/brand/products/translations';

export function useBrandDetails(id: string | undefined) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [knowledge, setKnowledge] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        setLoading(true);
        console.log('Fetching brand details for ID:', id);
        
        // Fetch the brand
        const { data: brandData, error: brandError } = await supabase
          .from('brands')
          .select('*')
          .eq('id', id)
          .single();
        
        if (brandError) {
          console.error('Brand fetch error:', brandError);
          throw brandError;
        }
        
        if (!brandData) {
          console.error('No brand data found');
          throw new Error('Brand not found');
        }
        
        console.log('Fetched brand data:', brandData);
        
        // Fetch related products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('brand_id', id);
        
        if (productsError) {
          console.error('Error fetching products:', productsError);
        }
        
        // Fetch brand knowledge
        const { data: knowledgeData, error: knowledgeError } = await supabase
          .from('brand_knowledge')
          .select('*')
          .eq('brand_id', id)
          .maybeSingle();
        
        if (knowledgeError) {
          console.error('Error fetching brand knowledge:', knowledgeError);
        }
        
        // Map the data to our Brand type
        const mappedBrand: Brand = {
          id: brandData.id,
          name: brandData.name,
          description: brandData.description,
          logo: brandData.logo || undefined,
          website: brandData.website || undefined,
          colors: {
            primary: brandData.primary_color,
            secondary: brandData.secondary_color,
          },
          tone: brandData.tone || 'Professional',
          themes: brandData.themes || [],
          createdAt: new Date(brandData.created_at),
          updatedAt: new Date(brandData.updated_at),
          knowledge: knowledgeData ? {
            history: knowledgeData.history,
            values: knowledgeData.values,
            targetAudience: knowledgeData.target_audience,
            guidelines: knowledgeData.guidelines,
          } : undefined
        };
        
        // Map products
        const mappedProducts: ProductType[] = productsData ? productsData.map((product: any) => ({
          id: product.id,
          brandId: product.brand_id,
          name: product.name,
          description: product.description,
          features: product.features || [],
          pricing: product.pricing || '',
          benefits: product.benefits || '',
          image: product.image,
          createdAt: new Date(product.created_at),
          updatedAt: new Date(product.updated_at)
        })) : [];
        
        setBrand(mappedBrand);
        setProducts(mappedProducts);
        setKnowledge(knowledgeData);
      } catch (error: any) {
        console.error('Error fetching brand details:', error);
        toast({
          title: 'Error loading brand details',
          description: error.message,
          variant: 'destructive',
        });
        
        // Fallback to mock data if available
        const mockBrand = mockBrands.find(b => b.id === id);
        if (mockBrand) {
          setBrand(mockBrand);
          toast({
            title: 'Using fallback data',
            variant: 'default',
          });
        } else {
          // If no mock data found for this ID, navigate back
          navigate('/brands');
          toast({
            title: 'Brand not found',
            description: 'The requested brand could not be found',
            variant: 'destructive',
          });
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchBrandDetails();
    }
  }, [id, toast, navigate]);

  const handleBrandUpdated = (updatedBrand: Brand) => {
    setBrand(updatedBrand);
  };

  const handleKnowledgeUpdate = (knowledge: any) => {
    setKnowledge(knowledge);
  };

  // Convert products to the format expected by BrandKnowledgeSection
  const getFormattedProductsList = (): Product[] => {
    if (!products) return [];
    
    return products.map(product => ({
      name: product.name,
      description: product.description,
      features: product.features,
      pricing: product.pricing || '',
      benefits: product.benefits || '',
      image: product.image,
    }));
  };

  const getKnowledgeData = () => {
    return {
      brandInfo: brand?.knowledge?.history || '',
      qaPairs: brand?.knowledge?.qaPairs || [],
      products: getFormattedProductsList()
    };
  };

  return {
    brand,
    loading,
    products,
    setProducts,
    showEditDialog,
    setShowEditDialog,
    handleBrandUpdated,
    handleKnowledgeUpdate,
    getKnowledgeData
  };
}
