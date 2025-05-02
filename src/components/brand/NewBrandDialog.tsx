
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
import { ProductSelector } from '@/components/brand/products/ProductSelector';
import { useBrandForm } from '@/hooks/useBrandForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BasicInfoTab } from './edit/BasicInfoTab';
import { TonesTab } from './edit/TonesTab';
import { ThemesTab } from './edit/ThemesTab';
import { BrandKnowledgeTab } from './edit/BrandKnowledgeTab';
import { SocialConnectionsTab } from './edit/SocialConnectionsTab';
import { editDialogTranslations } from './edit/translations';

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
  themes: {
    en: 'Themes',
    vi: 'Chủ đề',
    fr: 'Thèmes',
    es: 'Temas',
    th: 'ธีม',
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
    th: 'น้ำเสียง',
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
  },
  socialConnections: {
    en: 'Social Connections',
    vi: 'Kết nối mạng xã hội',
    fr: 'Connexions sociales',
    es: 'Conexiones sociales',
    th: 'การเชื่อมต่อโซเชียล',
    id: 'Koneksi Sosial'
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
                
                <div className="border-t pt-6">
                  <ProductSelector 
                    products={products}
                    onProductsChange={setProducts}
                  />
                </div>
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
