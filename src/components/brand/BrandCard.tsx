import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Brand } from '@/types';
import { useNavigate } from 'react-router-dom';

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="group bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-md3-2">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="w-8 h-8 object-contain" />
            ) : (
              <span className="text-xl font-semibold text-gray-500">
                {brand.name[0]}
              </span>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-destructive">
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-left">{brand.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 text-left line-clamp-2">
            {brand.description}
          </p>
        </div>

        <Button 
          variant="default" 
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary"
          onClick={() => navigate(`/brands/${brand.id}`)}
        >
          Xem chi tiết
        </Button>
      </div>
    </Card>
  );
}
