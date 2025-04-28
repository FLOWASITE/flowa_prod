import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, languages } from '@/types/language';

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    try {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage) {
        const parsed = JSON.parse(savedLanguage);
        const foundLanguage = languages.find(lang => lang.code === parsed.code);
        return foundLanguage || languages.find(lang => lang.code === 'vi') || languages[0];
      }
    } catch (error) {
      console.error("Error loading language from localStorage:", error);
    }
    return languages.find(lang => lang.code === 'vi') || languages[0]; // Default to Vietnamese
  });

  const setLanguage = (language: Language) => {
    try {
      setCurrentLanguage(language);
      localStorage.setItem('preferredLanguage', JSON.stringify(language));
    } catch (error) {
      console.error("Error saving language to localStorage:", error);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLanguage.code);
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
