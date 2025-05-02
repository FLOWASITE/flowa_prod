
import { useState } from 'react';
import { Brand, ProductType } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/components/brand/products/translations';

interface FormData {
  name: string;
  description: string;
  logo: string;
  website: string;
  primaryColor: string;
  secondaryColor: string;
}

interface BrandKnowledge {
  brandInfo: string;
  qaPairs: Array<{ question: string; answer: string }>;
  products?: Product[];
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
  const [products, setProducts] = useState<Product[]>([]);
  const [brandKnowledge, setBrandKnowledge] = useState<BrandKnowledge>({
    brandInfo: '',
    qaPairs: [],
    products: [],
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
      brandInfo: '',
      qaPairs: [],
      products: [],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProducts: ProductType[] = products.map(p => ({
      id: uuidv4(), // This will be replaced with the actual ID from Supabase
      brandId: uuidv4(), // This will be replaced with the actual brand ID from Supabase
      name: p.name,
      description: p.description,
      features: p.features,
      pricing: p.pricing,
      benefits: p.benefits,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const newBrand: Brand = {
      id: uuidv4(), // This will be replaced with the actual ID from Supabase
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
      knowledge: {
        history: brandKnowledge.brandInfo,
        values: '',
        targetAudience: '',
        guidelines: '',
        qaPairs: brandKnowledge.qaPairs,
      }
    };

    onBrandCreated(newBrand);
    resetForm();
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
