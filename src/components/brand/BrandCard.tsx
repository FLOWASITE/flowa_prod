
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Brand } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { EditBrandDialog } from '@/components/brand/edit/EditBrandDialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BrandCardProps {
  brand: Brand;
  onBrandUpdated?: (updatedBrand: Brand) => void;
}

export function BrandCard({ brand, onBrandUpdated }: BrandCardProps) {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Brand>(brand);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const translations = {
    viewDetails: {
      en: 'View Details',
      vi: 'Xem chi tiết'
    },
    edit: {
      en: 'Edit',
      vi: 'Chỉnh sửa'  
    },
    delete: {
      en: 'Delete',
      vi: 'Xóa'
    },
    deleteConfirmTitle: {
      en: 'Are you sure?',
      vi: 'Bạn có chắc chắn?'
    },
    deleteConfirmDesc: {
      en: 'This action cannot be undone. This will permanently delete the brand and all of its data.',
      vi: 'Hành động này không thể hoàn tác. Điều này sẽ xóa vĩnh viễn thương hiệu và tất cả dữ liệu của nó.'
    },
    cancel: {
      en: 'Cancel',
      vi: 'Hủy'
    },
    confirmDelete: {
      en: 'Delete',
      vi: 'Xóa'
    },
    deleteSuccess: {
      en: 'Brand has been deleted',
      vi: 'Thương hiệu đã được xóa'
    },
    deleteError: {
      en: 'Error deleting brand',
      vi: 'Lỗi khi xóa thương hiệu'
    }
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleBrandUpdated = (updatedBrand: Brand) => {
    setCurrentBrand(updatedBrand);
    if (onBrandUpdated) {
      onBrandUpdated(updatedBrand);
    }
  };

  const handleDeleteBrand = async () => {
    try {
      setIsDeleting(true);
      
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', currentBrand.id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: t('deleteSuccess'),
        variant: 'default',
      });
      
      // Remove the brand from parent component
      if (onBrandUpdated) {
        // We use onBrandUpdated to signal the parent to remove this brand
        // This is a bit of a hack, but it works
        const dummyDeletedBrand = { ...currentBrand, id: `deleted-${currentBrand.id}` };
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
      setShowDeleteConfirmation(false);
    }
  };

  return (
    <>
      <Card className="group bg-white/90 dark:bg-gray-800/90 transition-all duration-200 hover:shadow-md backdrop-blur-sm">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="h-12 w-12 rounded-lg bg-gray-100/80 dark:bg-gray-700/80 flex items-center justify-center">
              {currentBrand.logo ? (
                <img src={currentBrand.logo} alt={currentBrand.name} className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-xl font-semibold text-gray-500">
                  {currentBrand.name[0]}
                </span>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-white/60 dark:bg-gray-700/60 hover:bg-gray-100/90 dark:hover:bg-gray-600/90 rounded-full shadow-sm backdrop-blur-sm"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md">
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowEditDialog(true)}>
                  {t('edit')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive"
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  {t('delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-left">{currentBrand.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 text-left line-clamp-2">
              {currentBrand.description}
            </p>
          </div>

          <Button 
            variant="default" 
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary"
            onClick={() => navigate(`/brands/${currentBrand.id}`)}
          >
            {t('viewDetails')}
          </Button>
        </div>
      </Card>
      
      <EditBrandDialog 
        brand={currentBrand} 
        open={showEditDialog} 
        onOpenChange={setShowEditDialog} 
        onBrandUpdated={handleBrandUpdated} 
      />

      <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <AlertDialogContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-md">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteConfirmDesc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteBrand}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('confirmDelete')}
                </span>
              ) : t('confirmDelete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
