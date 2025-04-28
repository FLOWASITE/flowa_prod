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
import { Globe, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Brand } from '@/types';
import { ProductSelector } from './ProductSelector';
import { ToneSelector } from './ToneSelector';
import { ThemeSelector } from './ThemeSelector';
import { BrandKnowledgeSection } from './BrandKnowledgeSection';
import { SocialConnectionsSelector } from './SocialConnectionsSelector';
import { LogoUpload } from './LogoUpload';
import { useBrandForm } from '@/hooks/useBrandForm';

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
      <DialogContent className="max-w-[800px] p-0 overflow-hidden bg-white dark:bg-gray-950 border-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {t('createNewBrand')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="px-6 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-6">
              <LogoUpload
                onLogoChange={(logo) => handleChange({ target: { name: 'logo', value: logo } } as any)}
                translations={{
                  uploadLogo: t('uploadLogo'),
                  dragAndDrop: t('dragAndDrop')
                }}
              />

              <div className="space-y-2">
                <Label htmlFor="name">{t('brandName')}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="w-full flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex-shrink-0">
                    <Input
                      id="primaryColor"
                      name="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={handleChange}
                      className="h-8 w-8 p-0.5 rounded cursor-pointer border-0"
                    />
                  </div>
                  <span>{t('primaryColor')}</span>
                </div>
                <div className="w-full flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex-shrink-0">
                    <Input
                      id="secondaryColor"
                      name="secondaryColor"
                      type="color"
                      value={formData.secondaryColor}
                      onChange={handleChange}
                      className="h-8 w-8 p-0.5 rounded cursor-pointer border-0"
                    />
                  </div>
                  <span>{t('secondaryColor')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="logo" className="flex items-center gap-2">
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
            </div>

            <div className="space-y-6">
              <div className="border-t border-b py-6 -mx-6 px-6 bg-gray-50 dark:bg-gray-900/50">
                <ProductSelector 
                  products={products}
                  onProductsChange={setProducts}
                />
              </div>

              <ToneSelector
                selectedTones={selectedTones}
                onTonesChange={setSelectedTones}
              />

              <ThemeSelector
                selectedThemes={selectedThemes}
                onThemesChange={setSelectedThemes}
              />

              <BrandKnowledgeSection
                data={brandKnowledge}
                onUpdate={setBrandKnowledge}
              />

              <div className="border-t border-b py-6 -mx-6 px-6 bg-gray-50 dark:bg-gray-900/50">
                <SocialConnectionsSelector />
              </div>
            </div>
          </div>
          
          <DialogFooter className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t">
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
