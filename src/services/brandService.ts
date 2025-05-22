import axios from 'axios';
import { API_BASE_URL } from '@/config/constants';

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  website?: string;
  industry?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const getBrands = async (): Promise<Brand[]> => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.get(`${API_BASE_URL}/brands`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

const getBrandById = async (brandId: string): Promise<Brand> => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.get(`${API_BASE_URL}/brands/${brandId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching brand ${brandId}:`, error);
    throw error;
  }
};

export const brandService = {
  getBrands,
  getBrandById,
};
