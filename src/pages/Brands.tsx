
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { BrandCard } from '@/components/brand/BrandCard';
import { NewBrandDialog } from '@/components/brand/NewBrandDialog';
import { mockBrands } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brand } from '@/types';
import { supabase, isSupabaseConnected } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

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
  }
};

const Brands = () => {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      
      if (!isSupabaseConnected()) {
        console.log('Supabase not connected, using mock data');
        setBrands([...mockBrands]);
        toast({
          title: t('supabaseNotConnected'),
          variant: 'default',
        });
        return;
      }
      
      const { data, error } = await supabase!
        .from('brands')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching brands:', error);
        throw error;
      }
      
      const mappedBrands: Brand[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        logo: item.logo || undefined,
        colors: {
          primary: item.primary_color,
          secondary: item.secondary_color,
        },
        tone: item.tone || 'Professional',
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      }));
      
      setBrands(mappedBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast({
        title: t('loadingError'),
        variant: 'destructive',
      });
      
      setBrands([...mockBrands]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBrand = async (newBrand: Brand) => {
    try {
      if (!isSupabaseConnected()) {
        setBrands(prev => [...prev, newBrand]);
        return;
      }
      
      const brandData = {
        id: newBrand.id,
        name: newBrand.name,
        description: newBrand.description,
        logo: newBrand.logo || null,
        primary_color: newBrand.colors.primary,
        secondary_color: newBrand.colors.secondary,
        tone: newBrand.tone,
        themes: newBrand.themes || [],  // Add themes to saved data
        created_at: newBrand.createdAt.toISOString(),
        updated_at: newBrand.updatedAt.toISOString(),
      };
      
      const { error } = await supabase!.from('brands').insert(brandData);
      
      if (error) {
        console.error('Error adding brand:', error);
        throw error;
      }
      
      setBrands(prev => [...prev, newBrand]);
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('brands')}</h1>
          <p className="text-gray-500 dark:text-gray-400">{t('description')}</p>
        </div>
        
        <NewBrandDialog onBrandCreated={handleAddBrand} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, idx) => (
            <div key={idx} className="h-40 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
          ))
        ) : brands.length > 0 ? (
          brands.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">Chưa có thương hiệu nào được tạo. Hãy tạo thương hiệu đầu tiên của bạn!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Brands;
