
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Globe, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Brand } from '@/types';
import { ProductSelector } from '@/components/brand/products/ProductSelector';
import { ToneSelector } from './ToneSelector';
import { ThemeSelector } from './ThemeSelector';
import { BrandKnowledgeSection } from './BrandKnowledgeSection';
import { SocialConnectionsSelector } from './SocialConnectionsSelector';
import { LogoUpload } from './LogoUpload';
import { useBrandForm } from '@/hooks/useBrandForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const translations = {
  newBrand: {
    en: 'New Brand',
    vi: 'Thương hiệu mới',
    fr: 'Nouvelle marque',
    es: 'Nueva marca',
    th: 'แบรนด์ใหม่',
  },
  createNewBrand: {
    en: 'Create New Brand',
    vi: 'Tạo thương hiệu mới',
    fr: 'Créer une nouvelle marque',
    es: 'Crear nueva marca',
    th: 'สร้างแบรนด์ใหม่',
  },
  brandName: {
    en: 'Brand Name',
    vi: 'Tên thương hiệu',
    fr: 'Nom de la marque',
    es: 'Nombre de la marca',
    th: 'ชื่อแบรนด์',
  },
  description: {
    en: 'Description',
    vi: 'Mô tả',
    fr: 'Description',
    es: 'Descripción',
    th: 'คำอธิบาย',
  },
  primaryColor: {
    en: 'Primary Color',
    vi: 'Màu chính',
    fr: 'Couleur primaire',
    es: 'Color primario',
    th: 'สีหลัก',
  },
  secondaryColor: {
    en: 'Secondary Color',
    vi: 'Màu phụ',
    fr: 'Couleur secondaire',
    es: 'Color secundario',
    th: 'สีรอง',
  },
  cancel: {
    en: 'Cancel',
    vi: 'Hủy bỏ',
    fr: 'Annuler',
    es: 'Cancelar',
    th: 'ยกเลิก',
  },
  create: {
    en: 'Create Brand',
    vi: 'Tạo thương hiệu',
    fr: 'Créer la marque',
    es: 'Crear marca',
    th: 'สร้างแบรนด์',
  },
  themeTypes: {
    en: 'Theme Types',
    vi: 'Loại chủ đề',
    fr: 'Types de thèmes',
    es: 'Tipos de temas',
    th: 'ประเภทธีม',
  },
  selectThemeTypes: {
    en: 'Select theme types...',
    vi: 'Chọn loại chủ đề...',
    fr: 'Sélectionnez les types de thèmes...',
    es: 'Seleccione tipos de temas...',
    th: 'เลือกประเภทธีม...',
  },
  noThemeTypesFound: {
    en: 'No theme types found.',
    vi: 'Không tìm thấy loại chủ đề.',
    fr: 'Aucun type de thème trouvé.',
    es: 'No se encontraron tipos de temas.',
    th: 'ไม่พบประเภทธีม',
  },
  brandNameRequired: {
    en: 'Brand name is required',
    vi: 'Tên thương hiệu là bắt buộc',
    fr: 'Le nom de la marque est requis',
    es: 'El nombre de la marca es obligatorio',
    th: 'จำเป็นต้องมีชื่อแบรนด์',
  },
  brandCreated: {
    en: 'Brand created successfully!',
    vi: 'Tạo thương hiệu thành công!',
    fr: 'Marque créée avec succès!',
    es: '¡Marca creada con éxito!',
    th: 'สร้างแบรนด์สำเร็จ!',
  },
  logo: {
    en: 'Logo URL',
    vi: 'URL Logo',
    fr: 'URL du logo',
    es: 'URL del logotipo',
    th: 'URL โลโก้',
  },
  website: {
    en: 'Website URL',
    vi: 'URL Website',
    fr: 'URL du site web',
    es: 'URL del sitio web',
    th: 'URL เว็บไซต์',
  },
  toneOfVoice: {
    en: 'Voice Tone',
    vi: 'Giọng điệu',
    fr: 'Ton de voix',
    es: 'Tono de voz',
    th: 'น้ำเสี��ง',
  },
  suggestedTones: {
    en: 'Suggested Tones',
    vi: 'Giọng điệu gợi ý',
    fr: 'Tons suggérés',
    es: 'Tonos sugeridos',
    th: 'โนเสียงที่แนะนำ',
    id: 'Nada yang Disarankan'
  },
  suggestedThemes: {
    en: 'Suggested Theme Types',
    vi: 'Loại chủ đề gợi ý',
    fr: 'Types de thèmes suggérés',
    es: 'Tipos de temas sugeridos',
    th: 'ประเภทธีมที่แนะนำ',
    id: 'Jenis Tema yang Disarankan'
  },
  products: {
    en: 'Products & Services',
    vi: 'Sản phẩm & Dịch vụ',
    fr: 'Produits & Services',
    es: 'Productos y servicios',
    th: 'สินค้าและบริการ',
  },
  uploadLogo: {
    en: 'Upload Logo',
    vi: 'Tải lên Logo',
    fr: 'Télécharger le logo',
    es: 'Subir logo',
    th: 'อัปโหลดโลโก้',
  },
  dragAndDrop: {
    en: 'Drag and drop or click to upload',
    vi: 'Kéo thả hoặc nhấp để tải lên',
    fr: 'Glisser-déposer ou cliquer pour télécharger',
    es: 'Arrastrar y soltar o hacer clic para subir',
    th: 'ลากและวางหรือคลิกเพื่ออัปโหลด',
  }
};

interface NewBrandDialogProps {
  onBrandCreated: (newBrand: Brand) => void;
}

export function NewBrandDialog({ onBrandCreated }: NewBrandDialogProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const {
    formData,
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

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
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
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white dark:bg-gray-950 border-2">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {t('createNewBrand')}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="flex-1">
            <div className="flex border-b">
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
                  4. Brand Knowledge
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
                      <Label htmlFor="name" className="text-base font-medium">{t('brandName')}</Label>
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
                      <Label className="text-base font-medium">Brand Colors</Label>
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
                    <Label className="text-base font-medium block mb-2">{t('logo')}</Label>
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
                        <span className="text-sm font-medium">Brand Preview</span>
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
                  
                  <div className="border-t pt-6">
                    <ProductSelector 
                      products={products}
                      onProductsChange={setProducts}
                    />
                  </div>
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
