
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

class ApiClient {
  private client: AxiosInstance;
  private apiKey: string | null;

  constructor() {
    this.apiKey = localStorage.getItem('api_key') || 'dev-api-key'; // Default dev key, should be replaced with the actual key from the database
    
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add API key
    this.client.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${this.apiKey}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        
        // Show toast notification for errors
        toast.error('API Error', {
          description: message,
        });

        return Promise.reject(error);
      }
    );
  }

  // Set API key
  setApiKey(key: string): void {
    this.apiKey = key;
    localStorage.setItem('api_key', key);
  }

  // Get API key
  getApiKey(): string | null {
    return this.apiKey;
  }

  // Generic GET request
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  // Generic POST request
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  // Generic PUT request
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  // Generic DELETE request
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
