
import React from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-white">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`cursor-pointer ${currentLanguage.code === language.code ? 'bg-gray-100' : ''}`}
            onSelect={(e) => {
              e.preventDefault();
              handleLanguageSelect(language);
            }}
          >
            <span className="font-medium">{language.nativeName}</span>
            <span className="ml-2 text-gray-500">({language.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
