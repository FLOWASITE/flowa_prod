
import { supabase } from '@/integrations/supabase/client';
import { Brand } from '@/types';
import { Product } from '@/components/brand/products/translations';
import { BrandKnowledgeState } from './editBrandFormTypes';
import { convertToProductType } from './productTypeConverters';

export async function updateBrandInSupabase(
  brand: Brand,
  formData: {
    name: string;
    description: string;
    logo: string;
    website: string;
    primaryColor: string;
    secondaryColor: string;
  },
  selectedTones: string[],
  selectedThemes: string[]
) {
  const { data, error } = await supabase
    .from('brands')
    .update({
      name: formData.name,
      description: formData.description,
      logo: formData.logo || null,
      website: formData.website || null,
      primary_color: formData.primaryColor,
      secondary_color: formData.secondaryColor,
      tone: selectedTones.join(', '),
      themes: selectedThemes,
    })
    .eq('id', brand.id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateBrandKnowledge(
  brandId: string,
  brandKnowledge: BrandKnowledgeState
) {
  const { error: knowledgeError } = await supabase
    .from('brand_knowledge')
    .update({
      history: brandKnowledge.brandInfo,
    })
    .eq('brand_id', brandId);

  if (knowledgeError) {
    console.error('Error updating brand knowledge:', knowledgeError);
  }
}

export async function updateQAPairs(
  brandId: string,
  qaPairs: Array<{ question: string; answer: string }>
) {
  if (qaPairs.length === 0) return;

  // First, delete existing QA pairs
  const { error: deleteQAError } = await supabase
    .from('qa_pairs')
    .delete()
    .eq('brand_id', brandId);

  if (deleteQAError) {
    console.error('Error deleting existing QA pairs:', deleteQAError);
  }

  // Then insert new QA pairs
  const qaPairsData = qaPairs.map(pair => ({
    brand_id: brandId,
    question: pair.question,
    answer: pair.answer
  }));

  const { error: insertQAError } = await supabase
    .from('qa_pairs')
    .insert(qaPairsData);

  if (insertQAError) {
    console.error('Error inserting QA pairs:', insertQAError);
  }
}

export async function updateProducts(
  brandId: string,
  products: Product[]
) {
  if (products.length === 0) return;

  // First, delete existing products
  const { error: deleteProductsError } = await supabase
    .from('products')
    .delete()
    .eq('brand_id', brandId);

  if (deleteProductsError) {
    console.error('Error deleting existing products:', deleteProductsError);
  }

  // Then insert new products
  const productsData = products.map(product => ({
    brand_id: brandId,
    name: product.name,
    description: product.description,
    features: product.features,
    pricing: product.pricing || '',
    benefits: product.benefits || '',
    image: product.image || null
  }));

  if (productsData.length > 0) {
    const { error: insertProductsError } = await supabase
      .from('products')
      .insert(productsData);

    if (insertProductsError) {
      console.error('Error inserting products:', insertProductsError);
    }
  }
}

export function mapDataToBrand(
  brand: Brand,
  data: any,
  formData: any,
  selectedTones: string[],
  selectedThemes: string[],
  products: Product[],
  brandKnowledge: BrandKnowledgeState
): Brand {
  return {
    ...brand,
    name: data.name,
    description: data.description,
    logo: data.logo || undefined,
    website: data.website || undefined,
    colors: {
      primary: data.primary_color,
      secondary: data.secondary_color,
    },
    tone: data.tone,
    themes: data.themes || [],
    updatedAt: new Date(data.updated_at),
    products: products.map(convertToProductType),
    knowledge: {
      ...brand.knowledge,
      history: brandKnowledge.brandInfo,
      qaPairs: brandKnowledge.qaPairs,
    }
  };
}
