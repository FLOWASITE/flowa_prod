
import React from 'react';
import { ThemeSelector } from '../ThemeSelector';

interface ThemesTabProps {
  selectedThemes: string[];
  setSelectedThemes: (themes: string[]) => void;
}

export function ThemesTab({ selectedThemes, setSelectedThemes }: ThemesTabProps) {
  return (
    <ThemeSelector
      selectedThemes={selectedThemes}
      onThemesChange={setSelectedThemes}
    />
  );
}
