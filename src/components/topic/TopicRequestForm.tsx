
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockProductTypes } from '@/data/mockData';
import { Tag } from 'lucide-react';

export function TopicRequestForm() {
  const [promptText, setPromptText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { currentLanguage } = useLanguage();
  
  // Get first 3 product names from mockProductTypes for example buttons
  const productExamples = mockProductTypes.slice(0, 3);
  
  const translations = {
    cardTitle: {
      vi: 'Yêu cầu chủ đề mới',
      en: 'Request New Topics',
      fr: 'Demander de nouveaux sujets',
      es: 'Solicitar nuevos temas',
      th: 'ขอหัวข้อใหม่',
      id: 'Minta Topik Baru'
    },
    cardDescription: {
      vi: 'Mô tả chủ đề bạn cần và AI của chúng tôi sẽ đề xuất gợi ý cho bạn.',
      en: 'Describe the topics you need and our AI will generate suggestions for you.',
      fr: 'Décrivez les sujets dont vous avez besoin et notre IA générera des suggestions pour vous.',
      es: 'Describa los temas que necesita y nuestra IA generará sugerencias para usted.',
      th: 'อธิบายหัวข้อที่คุณต้องการและ AI ของเราจะสร้างข้อเสนอแนะให้คุณ',
      id: 'Jelaskan topik yang Anda butuhkan dan AI kami akan menghasilkan saran untuk Anda.'
    },
    yourRequest: {
      vi: 'Yêu cầu của bạn',
      en: 'Your Request',
      fr: 'Votre demande',
      es: 'Su solicitud',
      th: 'คำขอของคุณ',
      id: 'Permintaan Anda'
    },
    promptPlaceholder: {
      vi: 'Ví dụ: "Tạo 5 chủ đề về đồ ăn nhẹ hữu cơ cho phụ huynh quan tâm đến sức khỏe"',
      en: 'Example: "Create 5 topics about organic snacks for health-conscious parents"',
      fr: 'Exemple: "Créez 5 sujets sur les collations biologiques pour les parents soucieux de leur santé"',
      es: 'Ejemplo: "Cree 5 temas sobre snacks orgánicos para padres conscientes de la salud"',
      th: 'ตัวอย่าง: "สร้าง 5 หัวข้อเกี่ยวกับขนมขบเคี้ยวออร์แกนิกสำหรับพ่อแม่ที่ใส่ใจสุขภาพ"',
      id: 'Contoh: "Buat 5 topik tentang camilan organik untuk orang tua yang sadar kesehatan"'
    },
    exampleRequests: {
      vi: 'Yêu cầu mẫu',
      en: 'Example Requests',
      fr: 'Exemples de demandes',
      es: 'Solicitudes de ejemplo',
      th: 'ตัวอย่างคำขอ',
      id: 'Contoh Permintaan'
    },
    productRequests: {
      vi: 'Sản phẩm',
      en: 'Products',
      fr: 'Produits',
      es: 'Productos',
      th: 'ผลิตภัณฑ์',
      id: 'Produk'
    },
    seasonalRequest: {
      vi: 'Tạo 5 chủ đề về xu hướng sản phẩm theo mùa',
      en: 'Create 5 topics about seasonal product trends',
      fr: 'Créer 5 sujets sur les tendances de produits saisonniers',
      es: 'Crear 5 temas sobre tendencias de productos estacionales',
      th: 'สร้าง 5 หัวข้อเกี่ยวกับเทรนด์ผลิตภัณฑ์ตามฤดูกาล',
      id: 'Buat 5 topik tentang tren produk musiman'
    },
    educationalRequest: {
      vi: 'Tạo 3 chủ đề giáo dục về công nghệ của chúng tôi',
      en: 'Generate 3 educational topics about our technology',
      fr: 'Générer 3 sujets éducatifs sur notre technologie',
      es: 'Generar 3 temas educativos sobre nuestra tecnología',
      th: 'สร้าง 3 หัวข้อการศึกษาเกี่ยวกับเทคโนโลยีของเรา',
      id: 'Hasilkan 3 topik pendidikan tentang teknologi kami'
    },
    comparisonRequest: {
      vi: 'Đề xuất 4 chủ đề so sánh sản phẩm của chúng tôi với đối thủ cạnh tranh',
      en: 'Suggest 4 topics comparing our products with competitors',
      fr: 'Suggérer 4 sujets comparant nos produits à ceux des concurrents',
      es: 'Sugerir 4 temas que comparen nuestros productos con los competidores',
      th: 'แนะนำ 4 หัวข้อเปรียบเทียบผลิตภัณฑ์ของเรากับคู่แข่ง',
      id: 'Sarankan 4 topik yang membandingkan produk kami dengan pesaing'
    },
    generatingTopics: {
      vi: 'Đang tạo chủ đề...',
      en: 'Generating Topics...',
      fr: 'Génération de sujets...',
      es: 'Generando temas...',
      th: 'กำลังสร้างหัวข้อ...',
      id: 'Menghasilkan Topik...'
    },
    generateTopics: {
      vi: 'Tạo chủ đề',
      en: 'Generate Topics',
      fr: 'Générer des sujets',
      es: 'Generar temas',
      th: 'สร้างหัวข้อ',
      id: 'Hasilkan Topik'
    }
  };

  const getTranslation = (key) => {
    const lang = currentLanguage.code;
    return translations[key][lang] || translations[key]['en'];
  };
  
  // Generate example requests for each product type
  const getProductRequestText = (productName) => {
    return `Tạo 3 chủ đề về ${productName}`;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    setTimeout(() => {
      console.log('Sending request:', {
        prompt: promptText
      });
      setIsSending(false);
      setPromptText("");
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTranslation('cardTitle')}</CardTitle>
        <CardDescription>
          {getTranslation('cardDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="prompt">{getTranslation('yourRequest')}</Label>
              <Textarea
                id="prompt"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder={getTranslation('promptPlaceholder')}
                className="min-h-[120px]"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label>{getTranslation('exampleRequests')}</Label>
              <div className="flex flex-wrap gap-2">
                {productExamples.map(product => (
                  <Button
                    key={product.id}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPromptText(getProductRequestText(product.name))}
                    className="flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {product.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <CardFooter className="px-0 pt-6">
            <Button type="submit" className="w-full" disabled={!promptText || isSending}>
              {isSending ? (
                <>
                  <span className="animate-pulse">{getTranslation('generatingTopics')}</span>
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {getTranslation('generateTopics')}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
