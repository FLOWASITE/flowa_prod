
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { brandCardTranslations } from './cardTranslations';

interface BrandActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  languageCode: string;
}

export const BrandActions: React.FC<BrandActionsProps> = ({ 
  onEdit, 
  onDelete,
  languageCode 
}) => {
  const t = (key: keyof typeof brandCardTranslations) => {
    return brandCardTranslations[key][languageCode as 'en' | 'vi'] || brandCardTranslations[key].en;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-white/60 dark:bg-gray-700/60 hover:bg-gray-100/90 dark:hover:bg-gray-600/90 rounded-full shadow-sm backdrop-blur-sm"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md">
        <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
          {t('edit')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer text-destructive"
          onClick={onDelete}
        >
          {t('delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
