
import React, { useState } from 'react';
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
  }
};

export function EditBrandDialog({ brand, open, onOpenChange, onBrandUpdated }: EditBrandDialogProps) {
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: brand.name,
    description: brand.description,
    website: brand.website || '',
    primaryColor: brand.colors.primary,
    secondaryColor: brand.colors.secondary,
  });
  
  const [selectedTones, setSelectedTones] = useState<string[]>([brand.tone]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(brand.themes || []);

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
      
      // Map the data to our Brand type
      const updatedBrand: Brand = {
        ...brand,
        name: data.name,
        description: data.description,
        website: data.website || undefined,
        colors: {
          primary: data.primary_color,
          secondary: data.secondary_color,
        },
        tone: data.tone,
        themes: data.themes || [],
        updatedAt: new Date(data.updated_at),
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
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('editBrand')}</DialogTitle>
            <DialogDescription>{t('editDetails')}</DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">{t('name')}</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">{t('description')}</Label>
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
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right">{t('website')}</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="primaryColor" className="text-right">{t('primaryColor')}</Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="primaryColor"
                  name="primaryColor"
                  type="color"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="w-12"
                />
                <Input
                  value={formData.primaryColor}
                  onChange={handleChange}
                  name="primaryColor"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secondaryColor" className="text-right">{t('secondaryColor')}</Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="secondaryColor"
                  name="secondaryColor"
                  type="color"
                  value={formData.secondaryColor}
                  onChange={handleChange}
                  className="w-12"
                />
                <Input
                  value={formData.secondaryColor}
                  onChange={handleChange}
                  name="secondaryColor"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <div className="text-right pt-2">Voice Tone</div>
              <div className="col-span-3">
                <ToneSelector
                  selectedTones={selectedTones}
                  onTonesChange={setSelectedTones}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <div className="text-right pt-2">Themes</div>
              <div className="col-span-3">
                <ThemeSelector
                  selectedThemes={selectedThemes}
                  onThemesChange={setSelectedThemes}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t('updatingBrand') : t('save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
