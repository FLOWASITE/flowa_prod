
import { useState } from 'react';
import { Brand, ProductType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface FormData {
  name: string;
  description: string;
  logo: string;
  website: string;
  primaryColor: string;
  secondaryColor: string;
}

interface BrandKnowledge {
  history: string;
  values: string;
  targetAudience: string;
  guidelines: string;
  qaPairs: Array<{ question: string; answer: string }>;
  productPricing: string;
  productBenefits: string;
}

export const useBrandForm = (onBrandCreated: (brand: Brand) => void) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    logo: '',
    website: '',
    primaryColor: '#2563eb',
    secondaryColor: '#0d9488',
  });

  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedTones, setSelectedTones] = useState<string[]>(['Professional']);
  const [products, setProducts] = useState<Array<{ name: string; description: string; features: string[] }>>([]);
  const [brandKnowledge, setBrandKnowledge] = useState<BrandKnowledge>({
    history: '',
    values: '',
    targetAudience: '',
    guidelines: '',
    qaPairs: [],
    productPricing: '',
    productBenefits: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      logo: '',
      website: '',
      primaryColor: '#2563eb',
      secondaryColor: '#0d9488',
    });
    setSelectedThemes([]);
    setSelectedTones(['Professional']);
    setProducts([]);
    setBrandKnowledge({
      history: '',
      values: '',
      targetAudience: '',
      guidelines: '',
      qaPairs: [],
      productPricing: '',
      productBenefits: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProducts: ProductType[] = products.map(p => ({
      id: uuidv4(),
      brandId: uuidv4(),
      name: p.name,
      description: p.description,
      features: p.features,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const newBrand: Brand = {
      id: uuidv4(),
      name: formData.name,
      description: formData.description,
      logo: formData.logo || undefined,
      website: formData.website || undefined,
      colors: {
        primary: formData.primaryColor,
        secondary: formData.secondaryColor,
      },
      tone: selectedTones.join(', '),
      themes: selectedThemes,
      products: newProducts,
      createdAt: new Date(),
      updatedAt: new Date(),
      knowledge: brandKnowledge
    };

    onBrandCreated(newBrand);
  };

  return {
    formData,
    selectedThemes,
    selectedTones,
    products,
    brandKnowledge,
    handleChange,
    setSelectedThemes,
    setSelectedTones,
    setProducts,
    setBrandKnowledge,
    handleSubmit,
    resetForm
  };
};
