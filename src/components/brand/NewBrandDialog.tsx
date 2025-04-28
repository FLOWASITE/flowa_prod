
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
import { Textarea } from '@/components/ui/textarea';
import { Globe, Image, Plus, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Brand, ProductType } from '@/types';
import { ToneSelector } from './ToneSelector';
import { ThemeSelector } from './ThemeSelector';
import { ProductSelector } from './ProductSelector';
import { SocialConnectionsSelector } from './SocialConnectionsSelector';
import { BrandKnowledgeSection } from './BrandKnowledgeSection';

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
  }
};

interface NewBrandDialogProps {
  onBrandCreated: (newBrand: Brand) => void;
}

export function NewBrandDialog({ onBrandCreated }: NewBrandDialogProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    website: '',
    primaryColor: '#2563eb',
    secondaryColor: '#0d9488',
  });

  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedTones, setSelectedTones] = useState<string[]>(['Professional']);
  const [products, setProducts] = useState<Array<{ name: string; description: string; features: string[] }>>([]);
  const [brandKnowledge, setBrandKnowledge] = useState({
    history: '',
    values: '',
    targetAudience: '',
    guidelines: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      logo: '',
      website: '',
      primaryColor: '#2563eb',
      secondaryColor: '#0d9488',
    });
    setSelectedThemes([]);
    setSelectedTones(['Professional']);
    setProducts([]);
    setBrandKnowledge({
      history: '',
      values: '',
      targetAudience: '',
      guidelines: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: t('brandNameRequired'),
        variant: "destructive",
      });
      return;
    }

    const newProducts: ProductType[] = products.map(p => ({
      id: uuidv4(),
      brandId: uuidv4(),
      name: p.name,
      description: p.description,
      features: p.features,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const newBrand: Brand = {
      id: uuidv4(),
      name: formData.name,
      description: formData.description,
      logo: formData.logo || undefined,
      website: formData.website || undefined,
      colors: {
        primary: formData.primaryColor,
        secondary: formData.secondaryColor,
      },
      tone: selectedTones.join(', '),
      themes: selectedThemes,
      products: newProducts,
      createdAt: new Date(),
      updatedAt: new Date(),
      knowledge: brandKnowledge
    };

    onBrandCreated(newBrand);
    toast({
      title: t('brandCreated'),
    });
    
    resetForm();
    setOpen(false);
  };

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">{t('primaryColor')}</Label>
                  <Input
                    id="primaryColor"
                    name="primaryColor"
                    type="color"
                    value={formData.primaryColor}
                    onChange={handleChange}
                    className="h-10 p-1 rounded-lg transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">{t('secondaryColor')}</Label>
                  <Input
                    id="secondaryColor"
                    name="secondaryColor"
                    type="color"
                    value={formData.secondaryColor}
                    onChange={handleChange}
                    className="h-10 p-1 rounded-lg transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="logo" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  {t('logo')}
                </Label>
                <Input
                  id="logo"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="https://"
                  className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
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

            <div className="space-y-2">
              <Label htmlFor="description">{t('description')}</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="min-h-[80px] transition-all duration-200 hover:border-primary/50 focus:border-primary"
              />
            </div>

            <div className="space-y-6">
              <div className="border-t border-b py-6 -mx-6 px-6 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">{t('products')}</h3>
                </div>
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
