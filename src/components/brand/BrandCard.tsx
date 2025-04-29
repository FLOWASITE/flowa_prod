
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
import { Brand } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { EditBrandDialog } from './EditBrandDialog';
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

  return (
    <>
      <Card className="group bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-md">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
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
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowEditDialog(true)}>
                  {t('edit')}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-destructive">
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
    </>
  );
}
