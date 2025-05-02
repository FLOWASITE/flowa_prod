
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Brand } from '@/types';
import { useEditBrandForm } from './useEditBrandForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { editDialogTranslations } from './translations';
import { BasicInfoTab } from './BasicInfoTab';
import { TonesTab } from './TonesTab';
import { ThemesTab } from './ThemesTab';
import { BrandKnowledgeTab } from './BrandKnowledgeTab';
import { SocialConnectionsTab } from './SocialConnectionsTab';
import { Product } from '../products/translations';

interface EditBrandDialogProps {
  brand: Brand;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBrandUpdated: (updatedBrand: Brand) => void;
}

export function EditBrandDialog({ brand, open, onOpenChange, onBrandUpdated }: EditBrandDialogProps) {
  const { currentLanguage } = useLanguage();
  
  const {
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
    setBrandKnowledge,
    handleSubmit
  } = useEditBrandForm(brand, onBrandUpdated, onOpenChange);
  
  const t = (key: keyof typeof editDialogTranslations) => {
    return editDialogTranslations[key][currentLanguage.code] || editDialogTranslations[key].en;
  };

  // Update brandKnowledge object to include products
  const updatedBrandKnowledge = {
    ...brandKnowledge,
    products: products,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white dark:bg-gray-950 border-2">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {t('editBrand')}
            </DialogTitle>
            <DialogDescription>{t('editDetails')}</DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="flex-1">
            <div className="flex border-b">
              <TabsList className="h-auto p-0 bg-transparent flex-wrap">
                <TabsTrigger 
                  value="basic" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  1. {t('name')} & Logo
                </TabsTrigger>
                <TabsTrigger 
                  value="tone" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  2. {t('toneOfVoice')}
                </TabsTrigger>
                <TabsTrigger 
                  value="themes" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  3. {t('themes')}
                </TabsTrigger>
                <TabsTrigger 
                  value="knowledge" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  4. {t('brandKnowledge')}
                </TabsTrigger>
                <TabsTrigger 
                  value="social" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  5. {t('socialConnections')}
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <TabsContent value="basic" className="mt-0 space-y-6">
                <BasicInfoTab 
                  formData={formData} 
                  handleChange={handleChange}
                  translations={editDialogTranslations}
                />
              </TabsContent>
              
              <TabsContent value="tone" className="mt-0 space-y-4">
                <TonesTab 
                  selectedTones={selectedTones}
                  setSelectedTones={setSelectedTones}
                />
              </TabsContent>
              
              <TabsContent value="themes" className="mt-0 space-y-4">
                <ThemesTab 
                  selectedThemes={selectedThemes}
                  setSelectedThemes={setSelectedThemes}
                />
              </TabsContent>
              
              <TabsContent value="knowledge" className="mt-0 space-y-6">
                <BrandKnowledgeTab 
                  brandKnowledge={updatedBrandKnowledge}
                  setBrandKnowledge={setBrandKnowledge}
                  products={products}
                  setProducts={setProducts}
                />
              </TabsContent>
              
              <TabsContent value="social" className="mt-0">
                <SocialConnectionsTab />
              </TabsContent>
            </div>
          </Tabs>
          
          <DialogFooter className="p-6 bg-muted/30 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="transition-all duration-200"
            >
              {t('cancel')}
            </Button>
            <Button 
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {loading ? t('updatingBrand') : t('save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
