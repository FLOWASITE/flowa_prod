// src/pages/OAuth2Callback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');

        if (accessToken) {
            localStorage.setItem('google_access_token', accessToken);
            navigate('/dashboard');
        } else {
            console.error('Không nhận được access_token');
        }
    }, [navigate]);

    return <div>Đang xác thực với Google...</div>;
};

export default OAuth2Callback;
