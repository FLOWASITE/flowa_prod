
import { supabase } from '@/integrations/supabase/client';
import { Brand } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useAddBrand = (onFetchBrands: () => void) => {
  const { toast } = useToast();

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

      console.log('Brand data to insert:', brandData);

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

      onFetchBrands(); // Refresh the brands list
    } catch (error) {
      console.error('Error adding brand:', error);
      toast({
        title: 'Error adding brand',
        description: 'There was an error adding your brand. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return { handleAddBrand };
};
