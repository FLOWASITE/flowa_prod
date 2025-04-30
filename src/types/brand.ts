
export interface Brand {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  colors: {
    primary: string;
    secondary: string;
  };
  tone: string;
  themes?: string[];
  products?: ProductType[];
  knowledge?: {
    history: string;
    values: string;
    targetAudience: string;
    guidelines: string;
    qaPairs?: Array<{
      question: string;
      answer: string;
    }>;
    productPricing?: string;
    productBenefits?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ThemeType {
  id: string;
  brandId: string;
  name: string;
  description: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductType {
  id: string;
  brandId: string;
  name: string;
  description: string;
  features: string[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentTone {
  id: string;
  brandId: string;
  name: string;
  style: string;
  language: string;
  formalityLevel: 'casual' | 'neutral' | 'formal';
  targetAudience: string;
  createdAt: Date;
  updatedAt: Date;
}
