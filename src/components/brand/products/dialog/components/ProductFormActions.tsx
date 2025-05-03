
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProductFormActionsProps {
  onSave: () => void;
  onCancel: () => void;
  isDisabled: boolean;
  saveText: string;
  cancelText: string;
}

export function ProductFormActions({ 
  onSave, 
  onCancel, 
  isDisabled,
  saveText,
  cancelText
}: ProductFormActionsProps) {
  return (
    <>
      <Button 
        variant="outline" 
        onClick={onCancel}
        className="border-gray-300"
      >
        {cancelText}
      </Button>
      <Button 
        onClick={onSave}
        className="bg-[#ea384c] hover:bg-[#c52940] text-white"
        disabled={isDisabled}
      >
        {saveText}
      </Button>
    </>
  );
}
