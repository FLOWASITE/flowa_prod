
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

const translations = {
  brandInfo: {
    vi: 'Thông tin thương hiệu',
    en: 'Brand Information',
    fr: 'Informations sur la marque',
    es: 'Información de la marca',
    th: 'ข้อมูลแบรนด์',
  },
  brandInfoDescription: {
    vi: 'Nhập thông tin chi tiết về thương hiệu của bạn để hỗ trợ trí tuệ nhân tạo hiểu rõ hơn về thương hiệu',
    en: 'Enter detailed information about your brand to help AI better understand it',
    fr: 'Entrez des informations détaillées sur votre marque pour aider l\'IA à mieux la comprendre',
    es: 'Ingrese información detallada sobre su marca para ayudar a la IA a comprenderla mejor',
    th: 'ป้อนข้อมูลโดยละเอียดเกี่ยวกับแบรนด์ของคุณเพื่อช่วยให้ AI เข้าใจได้ดียิ่งขึ้น',
  },
  brandInfoPlaceholder: {
    vi: 'Nhập thông tin về lịch sử thương hiệu, giá trị cốt lõi, đối tượng mục tiêu và hướng dẫn thương hiệu...',
    en: 'Enter information about brand history, core values, target audience and brand guidelines...',
    fr: 'Entrez des informations sur l\'histoire de la marque, les valeurs fondamentales, le public cible et les directives de la marque...',
    es: 'Ingrese información sobre la historia de la marca, valores fundamentales, público objetivo y directrices de la marca...',
    th: 'ป้อนข้อมูลเกี่ยวกับประวัติแบรนด์ ค่านิยมหลัก กลุ่มเป้าหมาย และแนวทางแบรนด์...',
  },
};

interface BrandInfoInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function BrandInfoInput({ value, onChange }: BrandInfoInputProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Card className="border border-muted">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Info className="h-5 w-5 text-primary" />
          {t('brandInfo')}
        </CardTitle>
        <CardDescription>
          {t('brandInfoDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={value}
          onChange={handleChange}
          placeholder={t('brandInfoPlaceholder')}
          className="min-h-[160px] resize-y"
        />
      </CardContent>
    </Card>
  );
}
