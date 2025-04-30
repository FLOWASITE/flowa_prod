
import React from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/contexts/LanguageContext';
import { languages } from '@/types/language';
import { useToast } from '@/hooks/use-toast';

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();
  const { toast } = useToast();

  const handleLanguageSelect = (language) => {
    if (language.code !== currentLanguage.code) {
      setLanguage(language);
      toast({
        title: language.code === 'vi' ? 'Ngôn ngữ đã được thay đổi' : 'Language changed',
        description: language.code === 'vi' 
          ? `Đã chuyển sang ${language.nativeName}` 
          : `Switched to ${language.nativeName}`,
        duration: 3000,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Globe className="h-5 w-5 cursor-pointer text-gray-700 dark:text-gray-300" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-white dark:bg-gray-950 shadow-lg border border-gray-200 dark:border-gray-800">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${currentLanguage.code === language.code ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            onSelect={(e) => {
              e.preventDefault();
              handleLanguageSelect(language);
            }}
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">({language.name})</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
