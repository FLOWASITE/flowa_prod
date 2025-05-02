
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { brandDetailsTranslations } from '@/pages/brand/details/translations';

interface BrandDetailsHeaderProps {
  onEditClick: () => void;
}

export function BrandDetailsHeader({ onEditClick }: BrandDetailsHeaderProps) {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();

  const t = (key: keyof typeof brandDetailsTranslations) => {
    return brandDetailsTranslations[key][currentLanguage.code] || brandDetailsTranslations[key].en;
  };

  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/brands')} 
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-semibold">{t('brandDetails')}</h1>
      </div>
      
      <Button 
        onClick={onEditClick} 
        variant="outline"
        className="flex items-center gap-2"
      >
        <Edit className="h-4 w-4" />
        {currentLanguage.code === 'vi' ? 'Chỉnh sửa' : 'Edit'}
      </Button>
    </div>
  );
}
