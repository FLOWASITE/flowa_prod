import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  toneOfVoice: {
    en: 'Tone of Voice',
    vi: 'Tông giọng',
    fr: 'Ton de voix',
    es: 'Tono de voz',
    th: 'น้ำเสียง',
  },
  suggestions: {
    en: 'Suggested Tones',
    vi: 'Thêm gợi ý giọng điệu',
    fr: 'Tons suggérés',
    es: 'Tonos sugeridos',
    th: 'โทนที่แนะนำ',
  },
  enterTone: {
    en: 'Enter tone or select from suggestions',
    vi: 'Nhập tông giọng hoặc chọn từ gợi ý',
    fr: 'Entrez le ton ou sélectionnez parmi les suggestions',
    es: 'Ingrese el tono o seleccione de las sugerencias',
    th: 'ป้อนโทนหรือเลือกจากข้อเสนอแนะ',
  },
  addNewTone: {
    en: 'Press Enter to add new tone',
    vi: 'Nhấn Enter để thêm tông giọng mới',
    fr: 'Appuyez sur Entrée pour ajouter un nouveau ton',
    es: 'Presione Enter para agregar nuevo tono',
    th: 'กด Enter เพื่อเพิ่มโทนใหม่',
  },
  addCustomTone: {
    en: 'Add custom tone',
    vi: 'Thêm tông giọng tùy chỉnh',
    fr: 'Ajouter un ton personnalisé',
    es: 'Agregar tono personalizado',
    th: 'เพิ่มโทนที่กำหนดเอง',
  }
};

const suggestedTones = [
  'Professional', 'Friendly', 'Playful', 'Enthusiastic', 'Conversational',
  'Authoritative', 'Technical', 'Serious', 'Formal', 'Casual'
];

interface ToneSelectorProps {
  selectedTones: string[];
  onTonesChange: (tones: string[]) => void;
}

export function ToneSelector({ selectedTones, onTonesChange }: ToneSelectorProps) {
  const { currentLanguage } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const [customTones, setCustomTones] = useState<string[]>([]);
  
  const allSuggestionsSelected = suggestedTones.every(tone => selectedTones.includes(tone));

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTone(inputValue.trim());
      setInputValue('');
    }
  };

  const addTone = (tone: string) => {
    if (!selectedTones.includes(tone)) {
      // If this is a custom tone not in the suggestions, add it to customTones
      if (!suggestedTones.includes(tone) && !customTones.includes(tone)) {
        setCustomTones([...customTones, tone]);
      }
      onTonesChange([...selectedTones, tone]);
    }
  };

  const removeTone = (tone: string) => {
    onTonesChange(selectedTones.filter(t => t !== tone));
  };
  
  // Function to handle adding a custom tone through the badge click
  const handleAddCustomTone = () => {
    // If there's text in the input, add it
    if (inputValue.trim()) {
      addTone(inputValue.trim());
      setInputValue('');
    } else {
      // Otherwise, open a prompt to get custom tone input
      const customTone = prompt(t('enterTone'));
      if (customTone && customTone.trim()) {
        addTone(customTone.trim());
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t('toneOfVoice')}</Label>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={inputValue.trim() ? t('addNewTone') : t('enterTone')}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedTones.map((tone) => (
          <Badge
            key={tone}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {tone}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeTone(tone)}
            />
          </Badge>
        ))}
      </div>

      <div className="space-y-2">
        <Label>{t('suggestions')}</Label>
        <div className="flex flex-wrap gap-2">
          {suggestedTones
            .filter(tone => !selectedTones.includes(tone))
            .map((tone) => (
              <Badge
                key={tone}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => addTone(tone)}
              >
                {tone}
              </Badge>
            ))}
            
          {(allSuggestionsSelected || customTones.length > 0) && (
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent bg-primary/10"
              onClick={handleAddCustomTone}
            >
              {t('addCustomTone')}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
