import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { mockBrands } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brand, ProductType } from '@/types';
import { Package2, Speaker, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

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
  const { id } = useParams();
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
        
        // Fetch the brand
        const { data: brandData, error: brandError } = await supabase
          .from('brands')
          .select('*')
          .eq('id', id)
          .single();
        
        if (brandError) {
          throw brandError;
        }
        
        if (!brandData) {
          throw new Error('Brand not found');
        }
        
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
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchBrandDetails();
    }
  }, [id, toast]);

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
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">{t('brandDetails')}</h1>
        </div>

        <div className="space-y-8">
          {/* Brand Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brand Info */}
            <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center gap-4">
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="w-16 h-16 object-contain rounded-lg" />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-semibold text-gray-400">{brand.name[0]}</span>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold">{brand.name}</h2>
                  <p className="text-muted-foreground">{brand.description}</p>
                </div>
              </div>

              {brand.website && (
                <div>
                  <h3 className="font-medium mb-2">Website</h3>
                  <a href={brand.website} target="_blank" rel="noopener noreferrer" 
                     className="text-primary hover:underline">
                    {brand.website}
                  </a>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Primary Color</h3>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: brand.colors.primary }}
                    />
                    <span>{brand.colors.primary}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Secondary Color</h3>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: brand.colors.secondary }}
                    />
                    <span>{brand.colors.secondary}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Knowledge */}
            <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold">Brand Knowledge</h2>
              
              {brand.knowledge && (
                <>
                  {brand.knowledge.history && (
                    <div>
                      <h3 className="font-medium mb-2">History</h3>
                      <p className="text-muted-foreground">{brand.knowledge.history}</p>
                    </div>
                  )}
                  {brand.knowledge.values && (
                    <div>
                      <h3 className="font-medium mb-2">Values</h3>
                      <p className="text-muted-foreground">{brand.knowledge.values}</p>
                    </div>
                  )}
                  {brand.knowledge.targetAudience && (
                    <div>
                      <h3 className="font-medium mb-2">Target Audience</h3>
                      <p className="text-muted-foreground">{brand.knowledge.targetAudience}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Package2 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">{t('products')}</h2>
            </div>
            
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">{product.name}</h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    {product.features && product.features.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">{t('features')}</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">{t('noProducts')}</p>
            )}
          </div>

          {/* Voice Tone Section */}
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Speaker className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">{t('tone')}</h2>
            </div>
            <p className="text-muted-foreground">{brand.tone}</p>
          </div>

          {/* Theme Types Section */}
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">{t('themes')}</h2>
            </div>
            
            {brand.themes && brand.themes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {brand.themes.map((theme, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-muted/50">
                    <p>{theme}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">{t('noThemes')}</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrandDetails;
