
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
    if (isDeleting) return false; // Prevent multiple deletion attempts
    
    try {
      setIsDeleting(true);
      console.log("Deleting brand with ID:", brand.id);
      
      // Signal to the UI immediately that deletion is in progress
      if (onBrandUpdated) {
        // Create a temporary deleted brand to update the UI right away
        const dummyDeletedBrand = { ...brand, id: `deleted-${brand.id}` };
        onBrandUpdated(dummyDeletedBrand);
      }
      
      // Execute the actual deletion in the background
      deleteFromDatabase(brand.id).then(() => {
        sonnerToast.success(t('deleteSuccess'));
      }).catch(error => {
        console.error('Background deletion error:', error);
        toast({
          title: t('deleteError'),
          description: error instanceof Error ? error.message : 'Unknown error',
          variant: 'destructive',
        });
      });
      
      // Return false to close the delete confirmation dialog
      return false;
    } catch (error) {
      console.error('Error initiating brand deletion:', error);
      setIsDeleting(false);
      toast({
        title: t('deleteError'),
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  // Separate function to handle the actual database deletion
  const deleteFromDatabase = async (brandId: string) => {
    try {
      // First, delete any related data in other tables
      // Delete brand_knowledge
      await supabase
        .from('brand_knowledge')
        .delete()
        .eq('brand_id', brandId);
      
      // Delete QA pairs
      await supabase
        .from('qa_pairs')
        .delete()
        .eq('brand_id', brandId);
      
      // Delete products
      await supabase
        .from('products')
        .delete()
        .eq('brand_id', brandId);
      
      // Finally delete the brand
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', brandId);
      
      if (error) {
        throw error;
      }
      
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      throw error;
    }
  };

  return {
    isDeleting,
    handleDeleteBrand
  };
};
