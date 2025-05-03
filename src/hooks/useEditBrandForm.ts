
import { useState, useEffect } from 'react';
import { Brand } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { editDialogTranslations } from '@/components/brand/edit/translations';
import { Product } from '@/components/brand/products/translations';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FormData, 
  BrandKnowledgeState, 
  UseEditBrandFormProps,
  UseEditBrandFormReturn 
} from './brand/editBrandFormTypes';
import { 
  updateBrandInSupabase, 
  updateBrandKnowledge, 
  updateQAPairs, 
  updateProducts,
  mapDataToBrand 
} from './brand/updateBrandData';
import { convertToProduct } from './brand/productTypeConverters';

export function useEditBrandForm({
  brand,
  onBrandUpdated,
  onOpenChange
}: UseEditBrandFormProps): UseEditBrandFormReturn {
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: brand.name,
    description: brand.description,
    logo: brand.logo || '',
    website: brand.website || '',
    primaryColor: brand.colors.primary,
    secondaryColor: brand.colors.secondary,
  });
  
  const [selectedTones, setSelectedTones] = useState<string[]>(
    brand.tone ? brand.tone.split(', ') : ['Professional']
  );
  const [selectedThemes, setSelectedThemes] = useState<string[]>(brand.themes || []);
  
  // Convert ProductType[] to Product[]
  const [products, setProducts] = useState<Product[]>(
    brand.products ? brand.products.map(convertToProduct) : []
  );
  
  const [brandKnowledge, setBrandKnowledge] = useState<BrandKnowledgeState>({
    brandInfo: brand.knowledge?.history || '',
    qaPairs: brand.knowledge?.qaPairs || [],
    products: [],
  });

  const t = (key: keyof typeof editDialogTranslations) => {
    return editDialogTranslations[key][currentLanguage.code] || editDialogTranslations[key].en;
  };

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name,
        description: brand.description,
        logo: brand.logo || '',
        website: brand.website || '',
        primaryColor: brand.colors.primary,
        secondaryColor: brand.colors.secondary,
      });
      setSelectedTones(brand.tone ? brand.tone.split(', ') : ['Professional']);
      setSelectedThemes(brand.themes || []);
      setProducts(brand.products ? brand.products.map(convertToProduct) : []);
      setBrandKnowledge({
        brandInfo: brand.knowledge?.history || '',
        qaPairs: brand.knowledge?.qaPairs || [],
        products: [],
      });
    }
  }, [brand]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Create a properly typed handler for brandKnowledge updates
  const handleBrandKnowledgeUpdate = (knowledge: {
    brandInfo: string;
    qaPairs: { question: string; answer: string; }[];
    products?: Product[];
  }) => {
    setBrandKnowledge({
      brandInfo: knowledge.brandInfo,
      qaPairs: knowledge.qaPairs,
      products: knowledge.products || [],
    });
    
    if (knowledge.products) {
      setProducts(knowledge.products);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update the brand in Supabase
      const data = await updateBrandInSupabase(brand, formData, selectedTones, selectedThemes);
      
      // Update brand knowledge if it exists
      if (brand.knowledge) {
        await updateBrandKnowledge(brand.id, brandKnowledge);
        
        // Update QA pairs
        if (brandKnowledge.qaPairs.length > 0) {
          await updateQAPairs(brand.id, brandKnowledge.qaPairs);
        }

        // Update products
        if (products && products.length > 0) {
          await updateProducts(brand.id, products);
        }
      }
      
      // Map the data to our Brand type
      const updatedBrand = mapDataToBrand(
        brand, 
        data, 
        formData, 
        selectedTones, 
        selectedThemes, 
        products, 
        brandKnowledge
      );
      
      // Notify the parent component
      onBrandUpdated(updatedBrand);
      
      toast({
        title: t('updateSuccess'),
        variant: 'default',
      });
      
      // Close the dialog
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating brand:', error);
      toast({
        title: t('updateError'),
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    selectedTones,
    selectedThemes,
    products,
    brandKnowledge,
    loading,
    handleChange,
    setSelectedTones,
    setSelectedThemes,
    setProducts,
    setBrandKnowledge: handleBrandKnowledgeUpdate,
    handleSubmit
  };
}
