
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brand } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { EditBrandDialog } from '@/components/brand/edit/EditBrandDialog';
import { BrandLogo } from './card/BrandLogo';
import { BrandActions } from './card/BrandActions';
import { DeleteConfirmDialog } from './card/DeleteConfirmDialog';
import { useDeleteBrand } from '@/hooks/brand/useDeleteBrand';
import { brandCardTranslations } from './card/cardTranslations';

interface BrandCardProps {
  brand: Brand;
  onBrandUpdated?: (updatedBrand: Brand) => void;
}

export function BrandCard({ brand, onBrandUpdated }: BrandCardProps) {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Brand>(brand);
  
  const { isDeleting, handleDeleteBrand } = useDeleteBrand(
    currentBrand, 
    onBrandUpdated,
    currentLanguage.code
  );
  
  const t = (key: keyof typeof brandCardTranslations) => {
    return brandCardTranslations[key][currentLanguage.code] || brandCardTranslations[key].en;
  };

  const handleBrandUpdated = (updatedBrand: Brand) => {
    setCurrentBrand(updatedBrand);
    if (onBrandUpdated) {
      onBrandUpdated(updatedBrand);
    }
  };

  const handleDeleteConfirm = async () => {
    await handleDeleteBrand();
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <Card className="group bg-white/90 dark:bg-gray-800/90 transition-all duration-200 hover:shadow-md backdrop-blur-sm">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <BrandLogo logo={currentBrand.logo} name={currentBrand.name} />
            
            <BrandActions
              onEdit={() => setShowEditDialog(true)}
              onDelete={() => setShowDeleteConfirmation(true)}
              languageCode={currentLanguage.code}
            />
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

      <DeleteConfirmDialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        languageCode={currentLanguage.code}
      />
    </>
  );
}
