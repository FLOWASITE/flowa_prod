
import { Brand } from '@/types';
import { Product } from '@/components/brand/products/translations';

export interface FormData {
  name: string;
  description: string;
  logo: string;
  website: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface QAPair {
  question: string;
  answer: string;
}

export interface BrandKnowledgeState {
  brandInfo: string;
  qaPairs: QAPair[];
  products?: Product[];
}

export interface UseEditBrandFormProps {
  brand: Brand;
  onBrandUpdated: (updatedBrand: Brand) => void;
  onOpenChange: (open: boolean) => void;
}

export interface UseEditBrandFormReturn {
  formData: FormData;
  selectedTones: string[];
  selectedThemes: string[];
  products: Product[];
  brandKnowledge: BrandKnowledgeState;
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setSelectedTones: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedThemes: React.Dispatch<React.SetStateAction<string[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setBrandKnowledge: (knowledge: {
    brandInfo: string;
    qaPairs: QAPair[];
    products?: Product[];
  }) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}
