
import { useState } from 'react';
import { Brand } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { brandCardTranslations } from '@/components/brand/card/cardTranslations';

export const useDeleteBrand = (
  brand: Brand,
  onBrandUpdated?: (updatedBrand: Brand) => void,
  languageCode: string = 'en'
) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const t = (key: keyof typeof brandCardTranslations) => {
    return brandCardTranslations[key][languageCode as 'en' | 'vi'] || brandCardTranslations[key].en;
  };

  const handleDeleteBrand = async () => {
    try {
      setIsDeleting(true);
      console.log("Deleting brand with ID:", brand.id);
      
      // First, delete any related data in other tables
      // Delete brand_knowledge
      const { error: knowledgeError } = await supabase
        .from('brand_knowledge')
        .delete()
        .eq('brand_id', brand.id);
      
      if (knowledgeError) {
        console.log("Error deleting brand knowledge:", knowledgeError);
        // Continue with deletion even if this fails
      }
      
      // Delete QA pairs
      const { error: qaPairsError } = await supabase
        .from('qa_pairs')
        .delete()
        .eq('brand_id', brand.id);
      
      if (qaPairsError) {
        console.log("Error deleting QA pairs:", qaPairsError);
        // Continue with deletion even if this fails
      }
      
      // Delete products
      const { error: productsError } = await supabase
        .from('products')
        .delete()
        .eq('brand_id', brand.id);
      
      if (productsError) {
        console.log("Error deleting products:", productsError);
        // Continue with deletion even if this fails
      }
      
      // Finally delete the brand
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', brand.id);
      
      if (error) {
        throw error;
      }
      
      sonnerToast.success(t('deleteSuccess'));
      
      // Remove the brand from parent component
      if (onBrandUpdated) {
        // We use onBrandUpdated to signal the parent to remove this brand
        const dummyDeletedBrand = { ...brand, id: `deleted-${brand.id}` };
        onBrandUpdated(dummyDeletedBrand);
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      toast({
        title: t('deleteError'),
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      return false; // Return false to close the delete confirmation dialog
    }
  };

  return {
    isDeleting,
    handleDeleteBrand
  };
};
