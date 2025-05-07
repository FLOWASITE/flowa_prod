
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Brand } from '@/types';
import { useBrandForm } from '@/hooks/useBrandForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BasicInfoTab } from './edit/BasicInfoTab';
import { TonesTab } from './edit/TonesTab';
import { ThemesTab } from './edit/ThemesTab';
import { BrandKnowledgeTab } from './edit/BrandKnowledgeTab';
import { SocialConnectionsTab } from './edit/SocialConnectionsTab';
import { newBrandDialogTranslations } from './new/translations';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NewBrandDialogProps {
  onBrandCreated: (newBrand: Brand) => void;
}

export function NewBrandDialog({ onBrandCreated }: NewBrandDialogProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const {
    formData,
    formError,
    selectedThemes,
    selectedTones,
    products,
    brandKnowledge,
    handleChange,
    setSelectedThemes,
    setSelectedTones,
    setProducts,
    setBrandKnowledge,
    handleSubmit,
    resetForm
  } = useBrandForm((brand) => {
    onBrandCreated(brand);
    toast({
      title: t('brandCreated'),
    });
    resetForm();
    setOpen(false);
  });

  const t = (key: keyof typeof newBrandDialogTranslations) => {
    return newBrandDialogTranslations[key][currentLanguage.code] || newBrandDialogTranslations[key].en;
  };

  // Update brandKnowledge object to include products
  const updatedBrandKnowledge = {
    ...brandKnowledge,
    products: products,
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (newOpen === false) {
          resetForm();
        }
        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl">
          <Plus className="mr-2 h-4 w-4" />
          {t('newBrand')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-2">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader className="p-6 pb-4 border-b bg-white/95 dark:bg-gray-950/95">
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {t('createNewBrand')}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="basic" className="flex-1">
            <div className="flex border-b bg-white/95 dark:bg-gray-950/95">
              <TabsList className="h-auto p-0 bg-transparent flex-wrap">
                <TabsTrigger
                  value="basic"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  1. {t('brandName')} & Logo
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

            <div className="p-6 max-h-[60vh] overflow-y-auto bg-white/80 dark:bg-gray-950/80">
              <TabsContent value="basic" className="mt-0 space-y-6">
                {formError.name && (
                  <Alert variant="destructive" className="mb-4 bg-red-50/90 border border-red-200">
                    <AlertDescription>
                      {formError.name}
                    </AlertDescription>
                  </Alert>
                )}
                <BasicInfoTab
                  formData={formData}
                  handleChange={handleChange}
                  error={formError}
                  translations={newBrandDialogTranslations}
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

          <DialogFooter className="p-6 bg-white/95 dark:bg-gray-950/95 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
              className="transition-all duration-200"
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {t('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
