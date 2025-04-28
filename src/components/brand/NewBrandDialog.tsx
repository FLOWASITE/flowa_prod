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
import { Badge } from '@/components/ui/badge';
import { Globe, Image, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Brand } from '@/types';
import { defaultThemeCategories } from '@/data/defaultThemeTypes';

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
    th: 'น้ำเสียง',
  },
  suggestedTones: {
    en: 'Suggested Tones',
    vi: 'Giọng điệu gợi ý',
    fr: 'Tons suggérés',
    es: 'Tonos sugeridos',
    th: 'โทนเสียงที่แนะนำ',
  },
  friendly: {
    en: 'Friendly',
    vi: 'Thân thiện',
    fr: 'Amical',
    es: 'Amigable',
    th: 'เป็นมิตร',
  },
  professional: {
    en: 'Professional',
    vi: 'Chuyên nghiệp',
    fr: 'Professionnel',
    es: 'Profesional',
    th: 'มืออาชีพ',
  },
  casual: {
    en: 'Casual',
    vi: 'Thoải mái',
    fr: 'Décontracté',
    es: 'Casual',
    th: 'เป็นกันเอง',
  },
  enthusiastic: {
    en: 'Enthusiastic',
    vi: 'Nhiệt tình',
    fr: 'Enthousiaste',
    es: 'Entusiasta',
    th: 'กระตือรือร้น',
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
  const [selectedTone, setSelectedTone] = useState<string>('professional');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThemeToggle = (themeName: string) => {
    setSelectedThemes(prev => 
      prev.includes(themeName)
        ? prev.filter(t => t !== themeName)
        : [...prev, themeName]
    );
  };

  const handleToneChange = (tone: string) => {
    setSelectedTone(tone);
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
      tone: selectedTone,
      themes: selectedThemes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onBrandCreated(newBrand);
    toast({
      title: t('brandCreated'),
    });
    
    setFormData({
      name: '',
      description: '',
      logo: '',
      website: '',
      primaryColor: '#2563eb',
      secondaryColor: '#0d9488',
    });
    setSelectedThemes([]);
    setSelectedTone('professional');
    setOpen(false);
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const suggestedTones = ['professional', 'friendly', 'casual', 'enthusiastic'];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          
          <div className="px-6 space-y-6">
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

            <div className="space-y-3">
              <Label>{t('toneOfVoice')}</Label>
              <div className="flex flex-wrap gap-2">
                {suggestedTones.map((tone) => (
                  <Badge
                    key={tone}
                    variant={selectedTone === tone ? "default" : "outline"}
                    className="cursor-pointer transition-all duration-200 hover:bg-primary/20"
                    onClick={() => handleToneChange(tone)}
                  >
                    {t(tone as keyof typeof translations)}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>{t('suggestedThemes')}</Label>
              <div className="flex flex-wrap gap-2">
                {defaultThemeCategories.map((theme) => (
                  <Badge
                    key={theme.name}
                    variant={selectedThemes.includes(theme.name) ? "default" : "outline"}
                    className="cursor-pointer transition-all duration-200 hover:bg-primary/20"
                    onClick={() => handleThemeToggle(theme.name)}
                  >
                    {theme.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="transition-all duration-200">
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
