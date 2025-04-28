
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Tag } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  themes: {
    en: 'Theme Types',
    vi: 'Loại chủ đề',
    fr: 'Types de thèmes',
    es: 'Tipos de temas',
    th: 'ประเภทธีม',
  },
  suggestions: {
    en: 'Suggested Theme Types',
    vi: 'Thêm gợi ý Loại chủ đề',
    fr: 'Thèmes suggérés',
    es: 'Temas sugeridos',
    th: 'ธีมที่แนะนำ',
  },
  enterTheme: {
    en: 'Enter theme type or select from suggestions',
    vi: 'Nhập loại chủ đề hoặc chọn từ gợi ý',
    fr: 'Entrez le type de thème ou sélectionnez parmi les suggestions',
    es: 'Ingrese el tipo de tema o seleccione de las sugerencias',
    th: 'ป้อนประเภทธีมหรือเลือกจากข้อเสนอแนะ',
  },
  addNewTheme: {
    en: 'Press Enter to add new theme type',
    vi: 'Nhấn Enter để thêm loại chủ đề mới',
    fr: 'Appuyez sur Entrée pour ajouter un nouveau type de thème',
    es: 'Presione Enter para agregar nuevo tipo de tema',
    th: 'กด Enter เพื่อเพิ่มประเภทธีมใหม่',
  },
  addCustomTheme: {
    en: 'Add custom theme',
    vi: 'Thêm gợi ý loại chủ đề',
    fr: 'Ajouter un thème personnalisé',
    es: 'Agregar tema personalizado',
    th: 'เพิ่มธีมที่กำหนดเอง',
  }
};

const suggestedThemes = [
  'Product Updates', 'Industry News', 'Customer Stories', 'Tips & Tricks',
  'Behind the Scenes', 'Company Culture', 'Educational Content', 'Product Features'
];

interface ThemeSelectorProps {
  selectedThemes: string[];
  onThemesChange: (themes: string[]) => void;
}

export function ThemeSelector({ selectedThemes, onThemesChange }: ThemeSelectorProps) {
  const { currentLanguage } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const [customThemes, setCustomThemes] = useState<string[]>([]);
  
  const allSuggestionsSelected = suggestedThemes.every(theme => selectedThemes.includes(theme));

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && inputValue.trim()) {
      e.preventDefault();
      addTheme(inputValue.trim());
      setInputValue('');
    }
  };

  const addTheme = (theme: string) => {
    if (!selectedThemes.includes(theme)) {
      if (!suggestedThemes.includes(theme) && !customThemes.includes(theme)) {
        setCustomThemes([...customThemes, theme]);
      }
      onThemesChange([...selectedThemes, theme]);
      setInputValue(''); // Clear input after adding
    }
  };

  const removeTheme = (theme: string) => {
    onThemesChange(selectedThemes.filter(t => t !== theme));
  };
  
  const handleAddCustomTheme = () => {
    if (inputValue.trim()) {
      addTheme(inputValue.trim());
    } else {
      const customTheme = prompt(t('enterTheme'));
      if (customTheme?.trim()) {
        addTheme(customTheme.trim());
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{t('themes')}</h3>
      </div>

      <div className="space-y-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={inputValue.trim() ? t('addNewTheme') : t('enterTheme')}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedThemes.map((theme) => (
          <Badge
            key={theme}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {theme}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeTheme(theme)}
            />
          </Badge>
        ))}
      </div>

      <div className="space-y-2">
        <Label>{t('suggestions')}</Label>
        <div className="flex flex-wrap gap-2">
          {suggestedThemes
            .filter(theme => !selectedThemes.includes(theme))
            .map((theme) => (
              <Badge
                key={theme}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => {
                  addTheme(theme);
                  setInputValue('');
                }}
              >
                {theme}
              </Badge>
            ))}
          
          {(allSuggestionsSelected || customThemes.length > 0) && (
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent bg-primary/10"
              onClick={handleAddCustomTheme}
            >
              {t('addCustomTheme')}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
