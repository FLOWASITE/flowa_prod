
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  toneOfVoice: {
    en: 'Voice Tone',
    vi: 'Tông giọng',
    fr: 'Ton de voix',
    es: 'Tono de voz',
    th: 'น้ำเสียง',
  },
  suggestions: {
    en: 'Suggested Tone Types',
    vi: 'Tông giọng gợi ý',
    fr: 'Tons suggérés',
    es: 'Tonos sugeridos',
    th: 'โทนที่แนะนำ',
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
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const addTone = (tone: string) => {
    if (!selectedTones.includes(tone)) {
      onTonesChange([...selectedTones, tone]);
    }
  };

  const removeTone = (tone: string) => {
    onTonesChange(selectedTones.filter(t => t !== tone));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>{t('toneOfVoice')}</Label>
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
        </div>
      </div>
    </div>
  );
}
