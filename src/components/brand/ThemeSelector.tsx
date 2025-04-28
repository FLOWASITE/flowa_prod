
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
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
    en: 'Suggestions',
    vi: 'Gợi ý',
    fr: 'Suggestions',
    es: 'Sugerencias',
    th: 'ข้อเสนอแนะ',
  },
  enterTheme: {
    en: 'Enter theme type or select from suggestions',
    vi: 'Nhập loại chủ đề hoặc chọn từ gợi ý',
    fr: 'Entrez le type de thème ou sélectionnez parmi les suggestions',
    es: 'Ingrese el tipo de tema o seleccione de las sugerencias',
    th: 'ป้อนประเภทธีมหรือเลือกจากข้อเสนอแนะ',
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

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTheme(inputValue.trim());
      setInputValue('');
    }
  };

  const addTheme = (theme: string) => {
    if (!selectedThemes.includes(theme)) {
      onThemesChange([...selectedThemes, theme]);
    }
  };

  const removeTheme = (theme: string) => {
    onThemesChange(selectedThemes.filter(t => t !== theme));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t('themes')}</Label>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={t('enterTheme')}
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
                onClick={() => addTheme(theme)}
              >
                {theme}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}
