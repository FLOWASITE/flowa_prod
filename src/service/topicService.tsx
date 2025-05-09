import axiosInstance from "@/utils/axiosInstance";


const API_URL = 'topics/generate';

export const generateTopics = async (data) => {
    try {
        const response = await axiosInstance.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error generating topics:', error);
        throw error;
    }
};
