
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Brand } from '@/types';
import { Link } from 'react-router-dom';

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Card className="overflow-hidden">
      <div 
        className="h-3"
        style={{ backgroundColor: brand.colors.primary }}
      />
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} className="w-12 h-12 object-contain" />
              ) : (
                <div 
                  className="w-10 h-10 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: brand.colors.secondary }}
                >
                  <span className="text-white font-bold text-xl">
                    {brand.name[0]}
                  </span>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-xl">{brand.name}</h3>
            <p className="text-muted-foreground mt-1 line-clamp-2">{brand.description}</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-900 px-6 py-4">
        <Button asChild className="w-full">
          <Link to={`/brands/${brand.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
