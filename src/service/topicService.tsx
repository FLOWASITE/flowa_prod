import axios from 'axios';
import { API_BASE_URL } from '@/config/constants';

export const generateTopics = async (data) => {
    try {
        // Get authentication token
        const token = localStorage.getItem('auth_token') || localStorage.getItem('api_key') || 'dev-api-key';
        
        // Make request to the correct API endpoint
        const response = await axios.post(
            `${API_BASE_URL}/api/topics/generate`, 
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        console.log('Generated topics response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error generating topics:', error);
        throw error;
    }
};
