
import React from 'react';
import { EditBrandDialog as EditBrandDialogComponent } from './edit/EditBrandDialog';
import { Brand } from '@/types';

interface EditBrandDialogProps {
  brand: Brand;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBrandUpdated: (updatedBrand: Brand) => void;
}

export function EditBrandDialog(props: EditBrandDialogProps) {
  return <EditBrandDialogComponent {...props} />;
}
