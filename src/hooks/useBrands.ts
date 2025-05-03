
import { useState, useEffect } from 'react';
import { Brand } from '@/types';
import { mockBrands } from '@/data/mockData';
import { supabase, isSupabaseConnected } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { brandsTranslations } from '@/pages/brands/translations';

export const useBrands = () => {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const t = (key: keyof typeof brandsTranslations) => {
    return brandsTranslations[key][currentLanguage.code] || brandsTranslations[key].en;
  };

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
      
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching brands:', error);
        throw error;
      }
      
      if (!data) {
        throw new Error('No data returned');
      }
      
      console.log('Fetched brands data:', data);
      
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
      
      if (!data || !data[0]) {
        throw new Error('No data returned after brand creation');
      }
      
      if (newBrand.knowledge) {
        const knowledgeData = {
          brand_id: data[0].id,
          history: newBrand.knowledge.history,
          values: newBrand.knowledge.values,
          target_audience: newBrand.knowledge.targetAudience,
          guidelines: newBrand.knowledge.guidelines,
        };
        
        const { error: knowledgeError } = await supabase.from('brand_knowledge').insert(knowledgeData);
        
        if (knowledgeError) {
          console.error('Error adding brand knowledge:', knowledgeError);
        }

        // Insert QA pairs if they exist
        if (newBrand.knowledge.qaPairs && newBrand.knowledge.qaPairs.length > 0) {
          const qaPairsData = newBrand.knowledge.qaPairs.map(pair => ({
            brand_id: data[0].id,
            question: pair.question,
            answer: pair.answer
          }));
          
          const { error: qaPairsError } = await supabase.from('qa_pairs').insert(qaPairsData);
          
          if (qaPairsError) {
            console.error('Error adding QA pairs:', qaPairsError);
          }
        }
      }
      
      if (newBrand.products && newBrand.products.length > 0) {
        const productsData = newBrand.products.map(product => ({
          brand_id: data[0].id,
          name: product.name,
          description: product.description,
          features: product.features || [],
          image: product.image || null,
          pricing: product.pricing || null,
          benefits: product.benefits || null
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

  const handleUpdateBrand = (updatedBrand: Brand) => {
    // Check if this is a deletion signal (we used a hack with id starting with "deleted-")
    if (updatedBrand.id.startsWith('deleted-')) {
      const originalId = updatedBrand.id.replace('deleted-', '');
      setBrands(prev => prev.filter(b => b.id !== originalId));
      return;
    }
    
    // Normal update
    setBrands(prev => 
      prev.map(b => b.id === updatedBrand.id ? updatedBrand : b)
    );
  };

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  return {
    brands,
    loading,
    isConnected,
    t,
    checkSupabaseConnection,
    handleAddBrand,
    handleUpdateBrand
  };
};
