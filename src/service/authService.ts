import axiosInstance from "@/utils/axiosInstance";

const API_URL = 'auth';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post(`${API_URL}/login`, credentials);
        const { token, user } = response.data;

        // Store token in localStorage
        localStorage.setItem('token', token);

        return { token, user };
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const logout = (): void => {
    localStorage.removeItem('token');
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
}; 