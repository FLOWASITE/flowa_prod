
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Brand } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ToneSelector } from './ToneSelector';
import { ThemeSelector } from './ThemeSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { BrandKnowledgeSection } from './BrandKnowledgeSection';
import { SocialConnectionsSelector } from './SocialConnectionsSelector';
import { LogoUpload } from './LogoUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Info } from 'lucide-react';

interface EditBrandDialogProps {
  brand: Brand;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBrandUpdated: (updatedBrand: Brand) => void;
}

const translations = {
  editBrand: {
    en: 'Edit Brand',
    vi: 'Chỉnh sửa thương hiệu',
  },
  editDetails: {
    en: 'Edit the details of your brand.',
    vi: 'Chỉnh sửa thông tin chi tiết của thương hiệu.',
  },
  name: {
    en: 'Name',
    vi: 'Tên',
  },
  description: {
    en: 'Description',
    vi: 'Mô tả',
  },
  website: {
    en: 'Website',
    vi: 'Trang web',
  },
  primaryColor: {
    en: 'Primary Color',
    vi: 'Màu chính',
  },
  secondaryColor: {
    en: 'Secondary Color',
    vi: 'Màu phụ',
  },
  cancel: {
    en: 'Cancel',
    vi: 'Hủy',
  },
  save: {
    en: 'Save Changes',
    vi: 'Lưu thay đổi',
  },
  updatingBrand: {
    en: 'Updating brand...',
    vi: 'Đang cập nhật thương hiệu...',
  },
  updateSuccess: {
    en: 'Brand updated successfully',
    vi: 'Cập nhật thương hiệu thành công',
  },
  updateError: {
    en: 'Error updating brand',
    vi: 'Lỗi khi cập nhật thương hiệu',
  },
  toneOfVoice: {
    en: 'Voice Tone',
    vi: 'Giọng điệu',
  },
  themes: {
    en: 'Themes',
    vi: 'Chủ đề',
  },
  brandKnowledge: {
    en: 'Brand Knowledge',
    vi: 'Kiến thức thương hiệu',
  },
  socialConnections: {
    en: 'Social Connections',
    vi: 'Kết nối mạng xã hội',
  },
  uploadLogo: {
    en: 'Upload Logo',
    vi: 'Tải lên Logo',
  },
  dragAndDrop: {
    en: 'Drag and drop or click to upload',
    vi: 'Kéo thả hoặc nhấp để tải lên',
  },
  brandColors: {
    en: 'Brand Colors',
    vi: 'Màu thương hiệu',
  },
  brandPreview: {
    en: 'Brand Preview',
    vi: 'Xem trước thương hiệu',
  }
};

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
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-medium">{t('name')}</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-base font-medium">{t('description')}</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-base font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {t('website')}
                      </Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://"
                        className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-base font-medium">{t('brandColors')}</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor="primaryColor" className="text-sm">{t('primaryColor')}</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="primaryColor"
                              name="primaryColor"
                              type="color"
                              value={formData.primaryColor}
                              onChange={handleChange}
                              className="h-10 w-10 p-0.5 rounded cursor-pointer"
                            />
                            <span className="text-sm text-muted-foreground">{formData.primaryColor}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="secondaryColor" className="text-sm">{t('secondaryColor')}</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="secondaryColor"
                              name="secondaryColor"
                              type="color"
                              value={formData.secondaryColor}
                              onChange={handleChange}
                              className="h-10 w-10 p-0.5 rounded cursor-pointer"
                            />
                            <span className="text-sm text-muted-foreground">{formData.secondaryColor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium block mb-2">Logo</Label>
                    <LogoUpload
                      onLogoChange={(logo) => handleChange({ target: { name: 'logo', value: logo } } as any)}
                      translations={{
                        uploadLogo: t('uploadLogo'),
                        dragAndDrop: t('dragAndDrop')
                      }}
                    />
                    
                    <div className="mt-4 p-3 bg-muted/50 rounded-md">
                      <div className="flex items-center mb-2">
                        <Info className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm font-medium">{t('brandPreview')}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 border rounded-md bg-card">
                        <div className="flex-shrink-0">
                          {formData.logo ? (
                            <img src={formData.logo} alt="Logo preview" className="h-10 w-10 object-contain" />
                          ) : (
                            <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                              <span className="text-muted-foreground font-medium">
                                {formData.name ? formData.name[0].toUpperCase() : '?'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium" style={{color: formData.primaryColor}}>
                            {formData.name || 'Your Brand Name'}
                          </h4>
                          <div className="h-1 w-16 mt-1 rounded-full" style={{background: formData.secondaryColor}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tone" className="mt-0 space-y-4">
                <ToneSelector
                  selectedTones={selectedTones}
                  onTonesChange={setSelectedTones}
                />
              </TabsContent>
              
              <TabsContent value="themes" className="mt-0 space-y-4">
                <ThemeSelector
                  selectedThemes={selectedThemes}
                  onThemesChange={setSelectedThemes}
                />
              </TabsContent>
              
              <TabsContent value="knowledge" className="mt-0 space-y-6">
                <div className="space-y-6">
                  <BrandKnowledgeSection
                    data={brandKnowledge}
                    onUpdate={setBrandKnowledge}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="social" className="mt-0">
                <SocialConnectionsSelector />
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
