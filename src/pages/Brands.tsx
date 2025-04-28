
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { BrandCard } from '@/components/brand/BrandCard';
import { NewBrandDialog } from '@/components/brand/NewBrandDialog';
import { mockBrands } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brand } from '@/types';
import { supabase, isSupabaseConnected } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { toast as sonnerToast } from 'sonner';
import { Button } from '@/components/ui/button';
import { DatabaseZap, AlertTriangle } from 'lucide-react';

const translations = {
  brands: {
    en: 'Brands',
    vi: 'Thương hiệu',
    fr: 'Marques',
    es: 'Marcas',
    th: 'แบรนด์',
  },
  description: {
    en: 'Manage your brand identities and settings',
    vi: 'Quản lý danh tính và cài đặt thương hiệu của bạn',
    fr: 'Gérez les identités et les paramètres de votre marque',
    es: 'Administre las identidades y configuraciones de su marca',
    th: 'จัดการข้อมูลและการตั้งค่าแบรนด์ของคุณ',
  },
  loadingError: {
    en: 'Error loading brands',
    vi: 'Lỗi khi tải thương hiệu',
    fr: 'Erreur lors du chargement des marques',
    es: 'Error al cargar marcas',
    th: 'เกิดข้อผิดพลาดในการโหลดแบรนด์',
  },
  supabaseNotConnected: {
    en: 'Supabase is not connected. Using mock data.',
    vi: 'Supabase chưa được kết nối. Đang sử dụng dữ liệu mẫu.',
    fr: 'Supabase n\'est pas connecté. Utilisation de données fictives.',
    es: 'Supabase no está conectado. Usando datos ficticios.',
    th: 'Supabase ไม่ได้เชื่อมต่อ กำลังใช้ข้อมูลจำลอง',
  },
  tryReconnect: {
    en: 'Try reconnecting',
    vi: 'Thử kết nối lại',
    fr: 'Essayez de vous reconnecter',
    es: 'Intenta reconectar',
    th: 'ลองเชื่อมต่ออีกครั้ง',
  }
};

const Brands = () => {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  const checkSupabaseConnection = async () => {
    console.log("Checking Supabase connection...");
    const connected = await isSupabaseConnected();
    console.log("Supabase connected:", connected);
    setIsConnected(connected);
    
    if (connected) {
      fetchBrands();
    } else {
      setLoading(false);
      setBrands([...mockBrands]);
      toast({
        title: t('supabaseNotConnected'),
        description: 'Using mock data instead.',
        variant: 'destructive',
      });
    }
  };

  const fetchBrands = async () => {
    try {
      setLoading(true);
      console.log("Fetching brands from Supabase...");
      
      // Fetch from Supabase
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching brands:', error);
        throw error;
      }
      
      console.log('Fetched brands data:', data); // Debug log
      
      const mappedBrands: Brand[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        logo: item.logo || undefined,
        website: item.website || undefined,
        colors: {
          primary: item.primary_color,
          secondary: item.secondary_color,
        },
        tone: item.tone || 'Professional',
        themes: item.themes || [],
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      }));
      
      setBrands(mappedBrands);
      sonnerToast.success('Brands loaded successfully');
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast({
        title: t('loadingError'),
        variant: 'destructive',
      });
      
      setBrands([...mockBrands]);
      toast({
        title: t('supabaseNotConnected'),
        description: 'Using mock data instead.',
        variant: 'default',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddBrand = async (newBrand: Brand) => {
    try {      
      const brandData = {
        name: newBrand.name,
        description: newBrand.description,
        logo: newBrand.logo || null,
        website: newBrand.website || null,
        primary_color: newBrand.colors.primary,
        secondary_color: newBrand.colors.secondary,
        tone: newBrand.tone,
        themes: newBrand.themes || [],
      };
      
      const { data, error } = await supabase.from('brands').insert(brandData).select();
      
      if (error) {
        console.error('Error adding brand:', error);
        throw error;
      }
      
      if (newBrand.knowledge) {
        const knowledgeData = {
          brand_id: data[0].id,
          history: newBrand.knowledge.history,
          values: newBrand.knowledge.values,
          target_audience: newBrand.knowledge.targetAudience,
          guidelines: newBrand.knowledge.guidelines,
          product_pricing: newBrand.knowledge.productPricing,
          product_benefits: newBrand.knowledge.productBenefits
        };
        
        const { error: knowledgeError } = await supabase.from('brand_knowledge').insert(knowledgeData);
        
        if (knowledgeError) {
          console.error('Error adding brand knowledge:', knowledgeError);
        }
      }
      
      if (newBrand.products && newBrand.products.length > 0) {
        const productsData = newBrand.products.map(product => ({
          brand_id: data[0].id,
          name: product.name,
          description: product.description,
          features: product.features || [],
          image: product.image || null,
        }));
        
        const { error: productsError } = await supabase.from('products').insert(productsData);
        
        if (productsError) {
          console.error('Error adding products:', productsError);
        }
      }
      
      toast({
        title: 'Brand created successfully',
        variant: 'default',
      });
      
      fetchBrands(); // Refresh the brands list
    } catch (error) {
      console.error('Error adding brand:', error);
      toast({
        title: 'Error adding brand',
        description: 'There was an error adding your brand. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t('brands')}
            </h1>
            <p className="text-muted-foreground">{t('description')}</p>
          </div>
          
          {isConnected === false && (
            <Button 
              variant="outline" 
              onClick={checkSupabaseConnection} 
              className="flex items-center gap-2"
            >
              <DatabaseZap size={16} />
              {t('tryReconnect')}
            </Button>
          )}
          
          <NewBrandDialog onBrandCreated={handleAddBrand} />
        </div>
        
        {isConnected === false && (
          <div className="mb-6 p-4 border border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              {t('supabaseNotConnected')}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(3).fill(0).map((_, idx) => (
              <Card key={idx} className="h-[200px] animate-pulse">
                <div className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  </div>
                </div>
              </Card>
            ))
          ) : brands.length > 0 ? (
            brands.map(brand => (
              <BrandCard key={brand.id} brand={brand} />
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-muted-foreground">
                {currentLanguage.code === 'vi' 
                  ? 'Chưa có thương hiệu nào được tạo. Hãy tạo thương hiệu đầu tiên của bạn!'
                  : 'No brands created yet. Create your first brand!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Brands;
