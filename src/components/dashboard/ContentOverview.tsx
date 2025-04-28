
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useLanguage } from '@/contexts/LanguageContext';

interface ContentStatusData {
  name: string;
  value: number;
  color: string;
}

interface ContentOverviewProps {
  data: ContentStatusData[];
}

export function ContentOverview({ data }: ContentOverviewProps) {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    title: {
      vi: "Trạng thái nội dung",
      en: "Content Status",
      fr: "État du contenu",
      es: "Estado del contenido",
      th: "สถานะเนื้อหา",
      id: "Status Konten"
    }
  };
  
  const getTranslation = (key) => {
    const lang = currentLanguage.code;
    return translations[key][lang] || translations[key]['en']; // Fallback to English
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{getTranslation('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
