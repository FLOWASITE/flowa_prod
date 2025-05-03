
import { useState } from 'react';
import { Brand, ProductType } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/components/brand/products/translations';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { newBrandDialogTranslations } from '@/components/brand/new/translations';

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
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    logo: '',
    website: '',
    primaryColor: '#2563eb',
    secondaryColor: '#0d9488',
  });
  const [formError, setFormError] = useState<{name?: string}>({});

  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedTones, setSelectedTones] = useState<string[]>(['Professional']);
  const [products, setProducts] = useState<Product[]>([]);
  const [brandKnowledge, setBrandKnowledge] = useState<BrandKnowledge>({
    brandInfo: '',
    qaPairs: [],
    products: [],
  });

  const t = (key: keyof typeof newBrandDialogTranslations) => {
    return newBrandDialogTranslations[key][currentLanguage.code] || newBrandDialogTranslations[key].en;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types in the name field
    if (name === 'name' && value.trim() !== '') {
      setFormError({});
    }
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
    setFormError({});
  };

  const validateForm = (): boolean => {
    const errors: {name?: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = t('brandNameRequired');
    }
    
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: t('brandNameRequired'),
        variant: 'destructive',
      });
      return;
    }

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
    formError,
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
