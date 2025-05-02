
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Globe, Info } from 'lucide-react';
import { LogoUpload } from '../LogoUpload';
import { useLanguage } from '@/contexts/LanguageContext';

interface BasicInfoTabProps {
  formData: {
    name: string;
    description: string;
    logo: string;
    website: string;
    primaryColor: string;
    secondaryColor: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  translations: Record<string, Record<string, string>>;
}

export function BasicInfoTab({ formData, handleChange, translations }: BasicInfoTabProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: string) => {
    return translations[key]?.[currentLanguage.code] || translations[key]?.en || key;
  };

  return (
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
  );
}
