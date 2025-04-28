
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockBrands } from '@/data/mockData';

const translations = {
  switchBrand: {
    en: 'Switch Brand',
    vi: 'Chuyển đổi thương hiệu',
    fr: 'Changer de marque',
    es: 'Cambiar marca',
    th: 'เปลี่ยนแบรนด์',
    id: 'Ganti Merek'
  }
};

export function BrandSwitcher() {
  const { currentLanguage } = useLanguage();
  const [selectedBrand, setSelectedBrand] = React.useState(mockBrands[0]);

  const getTranslation = (key: keyof typeof translations) => {
    const lang = currentLanguage.code;
    return translations[key][lang] || translations[key]['en'];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {selectedBrand.name}
          <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {mockBrands.map((brand) => (
          <DropdownMenuItem
            key={brand.id}
            onClick={() => setSelectedBrand(brand)}
            className="justify-between"
          >
            {brand.name}
            {selectedBrand.id === brand.id && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
