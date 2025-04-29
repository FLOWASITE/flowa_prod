
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function EmptyBrandState() {
  const { currentLanguage } = useLanguage();
  
  return (
    <div className="col-span-3 text-center py-10">
      <p className="text-muted-foreground">
        {currentLanguage.code === 'vi' 
          ? 'Chưa có thương hiệu nào được tạo. Hãy tạo thương hiệu đầu tiên của bạn!'
          : 'No brands created yet. Create your first brand!'}
      </p>
    </div>
  );
}
