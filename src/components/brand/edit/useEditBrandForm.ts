
import { useState, useEffect } from 'react';
import { Brand, ProductType } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { editDialogTranslations } from './translations';
import { Product } from '../products/translations';
import { useLanguage } from '@/contexts/LanguageContext';

interface QAPair {
  question: string;
  answer: string;
}

interface BrandKnowledgeState {
  brandInfo: string;
  qaPairs: QAPair[];
  products?: Product[];
}

// Function to convert between Product and ProductType
const convertToProduct = (productType: ProductType): Product => {
  return {
    id: productType.id,
    brandId: productType.brandId,
    name: productType.name,
    description: productType.description,
    features: productType.features,
    pricing: productType.pricing || '',
    benefits: productType.benefits || '',
    image: productType.image,
    createdAt: productType.createdAt,
    updatedAt: productType.updatedAt
  };
};

const convertToProductType = (product: Product): ProductType => {
  return {
    id: product.id || '',
    brandId: product.brandId || '',
    name: product.name,
    description: product.description,
    features: product.features,
    pricing: product.pricing,
    benefits: product.benefits,
    image: product.image,
    createdAt: product.createdAt || new Date(),
    updatedAt: product.updatedAt || new Date()
  };
};

export function useEditBrandForm(
  brand: Brand,
  onBrandUpdated: (updatedBrand: Brand) => void,
  onOpenChange: (open: boolean) => void
) {
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
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
      const { data, error } = await supabase
        .from('brands')
        .update({
          name: formData.name,
          description: formData.description,
          logo: formData.logo || null,
          website: formData.website || null,
          primary_color: formData.primaryColor,
          secondary_color: formData.secondaryColor,
          tone: selectedTones.join(', '),
          themes: selectedThemes,
        })
        .eq('id', brand.id)
        .select('*')
        .single();
      
      if (error) {
        throw error;
      }

      // Update brand knowledge
      if (brand.knowledge) {
        const { error: knowledgeError } = await supabase
          .from('brand_knowledge')
          .update({
            history: brandKnowledge.brandInfo,
          })
          .eq('brand_id', brand.id);

        if (knowledgeError) {
          console.error('Error updating brand knowledge:', knowledgeError);
        }

        // Update QA pairs
        if (brandKnowledge.qaPairs.length > 0) {
          // First, delete existing QA pairs
          const { error: deleteQAError } = await supabase
            .from('qa_pairs')
            .delete()
            .eq('brand_id', brand.id);

          if (deleteQAError) {
            console.error('Error deleting existing QA pairs:', deleteQAError);
          }

          // Then insert new QA pairs
          const qaPairsData = brandKnowledge.qaPairs.map(pair => ({
            brand_id: brand.id,
            question: pair.question,
            answer: pair.answer
          }));

          const { error: insertQAError } = await supabase
            .from('qa_pairs')
            .insert(qaPairsData);

          if (insertQAError) {
            console.error('Error inserting QA pairs:', insertQAError);
          }
        }

        // Update products
        if (products && products.length > 0) {
          // First, delete existing products
          const { error: deleteProductsError } = await supabase
            .from('products')
            .delete()
            .eq('brand_id', brand.id);

          if (deleteProductsError) {
            console.error('Error deleting existing products:', deleteProductsError);
          }

          // Then insert new products
          const productsData = products.map(product => ({
            brand_id: brand.id,
            name: product.name,
            description: product.description,
            features: product.features,
            pricing: product.pricing || '',
            benefits: product.benefits || '',
            image: product.image || null
          }));

          if (productsData.length > 0) {
            const { error: insertProductsError } = await supabase
              .from('products')
              .insert(productsData);

            if (insertProductsError) {
              console.error('Error inserting products:', insertProductsError);
            }
          }
        }
      }
      
      // Map the data to our Brand type
      const updatedBrand: Brand = {
        ...brand,
        name: data.name,
        description: data.description,
        logo: data.logo || undefined,
        website: data.website || undefined,
        colors: {
          primary: data.primary_color,
          secondary: data.secondary_color,
        },
        tone: data.tone,
        themes: data.themes || [],
        updatedAt: new Date(data.updated_at),
        products: products.map(convertToProductType),
        knowledge: {
          ...brand.knowledge,
          history: brandKnowledge.brandInfo,
          qaPairs: brandKnowledge.qaPairs,
        }
      };
      
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
