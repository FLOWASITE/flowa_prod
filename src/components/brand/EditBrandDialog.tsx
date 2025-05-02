
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
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Info } from 'lucide-react';
import { editDialogTranslations } from './edit/translations';
import { BasicInfoTab } from './edit/BasicInfoTab';
import { TonesTab } from './edit/TonesTab';
import { ThemesTab } from './edit/ThemesTab';
import { BrandKnowledgeTab } from './edit/BrandKnowledgeTab';
import { SocialConnectionsTab } from './edit/SocialConnectionsTab';

interface EditBrandDialogProps {
  brand: Brand;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBrandUpdated: (updatedBrand: Brand) => void;
}

export function EditBrandDialog({ brand, open, onOpenChange, onBrandUpdated }: EditBrandDialogProps) {
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
  const [brandKnowledge, setBrandKnowledge] = useState({
    brandInfo: brand.knowledge?.history || '',
    qaPairs: brand.knowledge?.qaPairs || [],
  });

  useEffect(() => {
    if (open) {
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
      setBrandKnowledge({
        brandInfo: brand.knowledge?.history || '',
        qaPairs: brand.knowledge?.qaPairs || [],
      });
    }
  }, [brand, open]);
  
  const t = (key: keyof typeof editDialogTranslations) => {
    return editDialogTranslations[key][currentLanguage.code] || editDialogTranslations[key].en;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
                  brandKnowledge={brandKnowledge}
                  setBrandKnowledge={setBrandKnowledge}
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
