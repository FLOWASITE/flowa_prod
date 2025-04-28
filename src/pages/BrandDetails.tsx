import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { mockBrands } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brand, ProductType } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { BrandBasicInfo } from '@/components/brand/details/BrandBasicInfo';
import { BrandProductsSection } from '@/components/brand/details/BrandProductsSection';
import { BrandVoiceToneSection } from '@/components/brand/details/BrandVoiceToneSection';
import { BrandThemesSection } from '@/components/brand/details/BrandThemesSection';
import { BrandKnowledgeSection } from '@/components/brand/BrandKnowledgeSection';

const translations = {
  brandDetails: {
    en: 'Brand Details',
    vi: 'Chi tiết thương hiệu',
  },
  products: {
    en: 'Products & Services',
    vi: 'Sản phẩm & Dịch vụ',
  },
  tone: {
    en: 'Voice Tone',
    vi: 'Giọng điệu',
  },
  themes: {
    en: 'Theme Types',
    vi: 'Loại chủ đề',
  },
  features: {
    en: 'Features',
    vi: 'Tính năng',
  },
  noProducts: {
    en: 'No products or services added',
    vi: 'Chưa có sản phẩm hoặc dịch vụ',
  },
  noThemes: {
    en: 'No theme types added',
    vi: 'Chưa có loại chủ đề',
  },
  loading: {
    en: 'Loading brand details...',
    vi: 'Đang tải chi tiết thương hiệu...',
  },
  error: {
    en: 'Failed to load brand details',
    vi: 'Không thể tải chi tiết thương hiệu',
  },
  fallbackData: {
    en: 'Using fallback data',
    vi: 'Đang sử dụng dữ liệu dự phòng',
  }
};

const BrandDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [knowledge, setKnowledge] = useState<any>(null);

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        setLoading(true);
        console.log('Fetching brand details for ID:', id); // Debug log
        
        // Fetch the brand
        const { data: brandData, error: brandError } = await supabase
          .from('brands')
          .select('*')
          .eq('id', id)
          .single();
        
        if (brandError) {
          console.error('Brand fetch error:', brandError); // Debug log
          throw brandError;
        }
        
        if (!brandData) {
          console.error('No brand data found'); // Debug log
          throw new Error('Brand not found');
        }
        
        console.log('Fetched brand data:', brandData); // Debug log
        
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
            productPricing: knowledgeData.product_pricing,
            productBenefits: knowledgeData.product_benefits,
          } : undefined
        };
        
        // Map products
        const mappedProducts: ProductType[] = productsData ? productsData.map((product: any) => ({
          id: product.id,
          brandId: product.brand_id,
          name: product.name,
          description: product.description,
          features: product.features || [],
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
          title: t('error'),
          description: error.message,
          variant: 'destructive',
        });
        
        // Fallback to mock data if available
        const mockBrand = mockBrands.find(b => b.id === id);
        if (mockBrand) {
          setBrand(mockBrand);
          toast({
            title: t('fallbackData'),
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

  if (loading) {
    return (
      <Layout>
        <div className="max-w-[1400px] mx-auto p-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-xl text-muted-foreground">{t('loading')}</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!brand) {
    return (
      <Layout>
        <div className="max-w-[1400px] mx-auto">
          <p>Brand not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8 flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/brands')} 
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold">{t('brandDetails')}</h1>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BrandBasicInfo brand={brand} />
            <BrandKnowledgeSection 
              onUpdate={(knowledge) => setKnowledge(knowledge)}
              data={brand.knowledge || {
                history: '',
                values: '',
                targetAudience: '',
                guidelines: '',
                qaPairs: [],
                productPricing: '',
                productBenefits: ''
              }}
            />
          </div>

          <BrandProductsSection products={products} />
          <BrandVoiceToneSection tone={brand.tone} />
          <BrandThemesSection themes={brand.themes || []} />
        </div>
      </div>
    </Layout>
  );
};

export default BrandDetails;
