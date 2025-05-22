import axios from 'axios';
// baseURL: 'https://flowa-backend.onrender.com/api/',
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8009/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
