
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

class ApiClient {
  private client: AxiosInstance;
  private apiKey: string | null;

  constructor() {
    this.apiKey = localStorage.getItem('api_key') || 'dev-api-key'; // Default dev key, should be replaced with the actual key from the database
    
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8009';
    console.log('API URL:', apiUrl);
    
    this.client = axios.create({
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout to prevent hanging requests
      timeout: 10000,
    });

    // Request interceptor to add API key and log requests
    this.client.interceptors.request.use(
      (config) => {
        // Add authorization header
        config.headers.Authorization = `Bearer ${this.apiKey}`;
        
        // Log the request for debugging
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
          headers: config.headers,
          params: config.params,
          data: config.data
        });
        
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for logging and error handling
    this.client.interceptors.response.use(
      (response) => {
        // Log successful response
        console.log(`API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, {
          data: response.data,
          headers: response.headers
        });
        return response;
      },
      (error) => {
        // Log error details
        console.error('API Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
          method: error.config?.method
        });
        
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
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      console.error(`GET ${url} failed:`, error);
      throw error;
    }
  }

  // Generic POST request
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`POST ${url} failed:`, error);
      throw error;
    }
  }

  // Generic PUT request
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`PUT ${url} failed:`, error);
      throw error;
    }
  }

  // Generic DELETE request
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete<T>(url, config);
      return response.data;
    } catch (error) {
      console.error(`DELETE ${url} failed:`, error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
