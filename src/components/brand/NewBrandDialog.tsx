
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
import { Plus, Trash2 } from 'lucide-react';
import { defaultThemeCategories } from '@/data/defaultThemeTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Brand } from '@/types';

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
  brandInformation: {
    en: 'Brand Information',
    vi: 'Thông tin thương hiệu',
    fr: 'Information sur la marque',
    es: 'Información de marca',
    th: 'ข้อมูลแบรนด์',
  },
  themeTypes: {
    en: 'Theme Types',
    vi: 'Loại chủ đề',
    fr: 'Types de thèmes',
    es: 'Tipos de temas',
    th: 'ประเภทธีม',
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
  enterBrandName: {
    en: 'Enter brand name',
    vi: 'Nhập tên thương hiệu',
    fr: 'Entrez le nom de la marque',
    es: 'Ingrese el nombre de la marca',
    th: 'ป้อนชื่อแบรนด์',
  },
  enterBrandDescription: {
    en: 'Enter brand description',
    vi: 'Nhập mô tả thương hiệu',
    fr: 'Entrez la description de la marque',
    es: 'Ingrese la descripción de la marca',
    th: 'ป้อนคำอธิบายแบรนด์',
  },
  themeName: {
    en: 'Theme Name',
    vi: 'Tên chủ đề',
    fr: 'Nom du thème',
    es: 'Nombre del tema',
    th: 'ชื่อธีม',
  },
  themeDescription: {
    en: 'Description',
    vi: 'Mô tả',
    fr: 'Description',
    es: 'Descripción',
    th: 'คำอธิบาย',
  },
  keywords: {
    en: 'Keywords (comma-separated)',
    vi: 'Từ khóa (phân tách bằng dấu phẩy)',
    fr: 'Mots-clés (séparés par des virgules)',
    es: 'Palabras clave (separadas por comas)',
    th: 'คำสำคัญ (คั่นด้วยเครื่องหมายจุลภาค)',
  },
  newThemeName: {
    en: 'New Theme Name',
    vi: 'Tên chủ đề mới',
    fr: 'Nouveau nom de thème',
    es: 'Nuevo nombre de tema',
    th: 'ชื่อธีมใหม่',
  },
  addThemeType: {
    en: 'Add Theme Type',
    vi: 'Thêm loại chủ đề',
    fr: 'Ajouter un type de thème',
    es: 'Añadir tipo de tema',
    th: 'เพิ่มประเภทธีม',
  },
  brandCreated: {
    en: 'Brand created successfully!',
    vi: 'Tạo thương hiệu thành công!',
    fr: 'Marque créée avec succès!',
    es: '¡Marca creada con éxito!',
    th: 'สร้างแบรนด์สำเร็จ!',
  },
  brandNameRequired: {
    en: 'Brand name is required',
    vi: 'Tên thương hiệu là bắt buộc',
    fr: 'Le nom de la marque est requis',
    es: 'El nombre de la marca es obligatorio',
    th: 'จำเป็นต้องมีชื่อแบรนด์',
  }
};

interface NewBrandDialogProps {
  onBrandCreated: (newBrand: Brand) => void;
}

export function NewBrandDialog({ onBrandCreated }: NewBrandDialogProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('brand');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    primaryColor: '#2563eb',
    secondaryColor: '#0d9488',
  });

  const [themeTypes, setThemeTypes] = useState(defaultThemeCategories.map(category => ({
    name: category.name,
    description: category.description,
    keywords: category.keywords.join(', '),
  })));

  const [newThemeType, setNewThemeType] = useState({
    name: '',
    description: '',
    keywords: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThemeTypeChange = (index: number, field: string, value: string) => {
    setThemeTypes(prev => prev.map((theme, i) => 
      i === index ? { ...theme, [field]: value } : theme
    ));
  };

  const addNewThemeType = () => {
    if (newThemeType.name && newThemeType.description) {
      setThemeTypes(prev => [...prev, { ...newThemeType }]);
      setNewThemeType({ name: '', description: '', keywords: '' });
    }
  };

  const removeThemeType = (index: number) => {
    setThemeTypes(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: translations.brandNameRequired[currentLanguage.code] || translations.brandNameRequired.en,
        variant: "destructive",
      });
      return;
    }

    // Tạo dữ liệu thương hiệu mới
    const newBrand: Brand = {
      id: uuidv4(),
      name: formData.name,
      description: formData.description,
      colors: {
        primary: formData.primaryColor,
        secondary: formData.secondaryColor,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Creating brand:', newBrand);
    
    // Gọi hàm callback để cập nhật danh sách thương hiệu
    onBrandCreated(newBrand);
    
    // Hiển thị thông báo thành công
    toast({
      title: translations.brandCreated[currentLanguage.code] || translations.brandCreated.en,
    });
    
    // Reset form và đóng dialog
    setFormData({
      name: '',
      description: '',
      primaryColor: '#2563eb',
      secondaryColor: '#0d9488',
    });
    setThemeTypes(defaultThemeCategories.map(category => ({
      name: category.name,
      description: category.description,
      keywords: category.keywords.join(', '),
    })));
    setOpen(false);
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('newBrand')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('createNewBrand')}</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="brand">{t('brandInformation')}</TabsTrigger>
              <TabsTrigger value="themes">{t('themeTypes')}</TabsTrigger>
            </TabsList>

            <TabsContent value="brand" className="mt-4">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t('brandName')}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('enterBrandName')}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">{t('description')}</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder={t('enterBrandDescription')}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="primaryColor">{t('primaryColor')}</Label>
                    <div className="flex items-center">
                      <Input
                        id="primaryColor"
                        name="primaryColor"
                        type="color"
                        value={formData.primaryColor}
                        onChange={handleChange}
                        className="w-10 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.primaryColor}
                        onChange={handleChange}
                        name="primaryColor"
                        className="ml-2"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="secondaryColor">{t('secondaryColor')}</Label>
                    <div className="flex items-center">
                      <Input
                        id="secondaryColor"
                        name="secondaryColor"
                        type="color"
                        value={formData.secondaryColor}
                        onChange={handleChange}
                        className="w-10 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.secondaryColor}
                        onChange={handleChange}
                        name="secondaryColor"
                        className="ml-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="themes" className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid gap-6">
                  {themeTypes.map((theme, index) => (
                    <div key={index} className="grid gap-4 p-4 border rounded-lg relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => removeThemeType(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="grid gap-2">
                        <Label>{t('themeName')}</Label>
                        <Input
                          value={theme.name}
                          onChange={(e) => handleThemeTypeChange(index, 'name', e.target.value)}
                          placeholder={t('themeName')}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>{t('themeDescription')}</Label>
                        <Input
                          value={theme.description}
                          onChange={(e) => handleThemeTypeChange(index, 'description', e.target.value)}
                          placeholder={t('themeDescription')}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>{t('keywords')}</Label>
                        <Input
                          value={theme.keywords}
                          onChange={(e) => handleThemeTypeChange(index, 'keywords', e.target.value)}
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="grid gap-4 p-4 border rounded-lg border-dashed">
                    <div className="grid gap-2">
                      <Label>{t('newThemeName')}</Label>
                      <Input
                        value={newThemeType.name}
                        onChange={(e) => setNewThemeType(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={t('enterBrandName')}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>{t('themeDescription')}</Label>
                      <Input
                        value={newThemeType.description}
                        onChange={(e) => setNewThemeType(prev => ({ ...prev, description: e.target.value }))}
                        placeholder={t('enterBrandDescription')}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>{t('keywords')}</Label>
                      <Input
                        value={newThemeType.keywords}
                        onChange={(e) => setNewThemeType(prev => ({ ...prev, keywords: e.target.value }))}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addNewThemeType}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {t('addThemeType')}
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t('cancel')}
            </Button>
            <Button type="submit">{t('create')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
