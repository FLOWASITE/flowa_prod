import axios from 'axios';
import { API_BASE_URL } from '@/config/constants';

export interface Product {
  id: string;
  name: string;
  description?: string;
  brand_id: string;
  brand_name?: string;
  price?: number;
  image_url?: string;
  features?: string[];
  category?: string;
  tags?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const getProducts = async (brandId?: string): Promise<Product[]> => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    let url = `${API_BASE_URL}/products`;
    if (brandId) {
      url += `?brand_id=${brandId}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const getProductById = async (productId: string): Promise<Product> => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.get(`${API_BASE_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};

export const productService = {
  getProducts,
  getProductById,
};
