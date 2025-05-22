import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LoadingSpinner } from '../components/ui/loading-spinner';

/**
 * TokenHandler component
 * 
 * This component processes the authentication token from Google OAuth
 * redirect and stores it in local storage before redirecting to the dashboard.
 */
const TokenHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if this is a direct access or error redirect
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const errorParam = params.get('error');
    
    // Handle direct access to token-handler without a token
    if (!token) {
      // If this is an auth_required redirect, show appropriate message
      if (errorParam === 'auth_required') {
        setError('Authentication required. Please log in to access this page.');
      } else {
        setError('No authentication token found. Please log in through the login page.');
      }
      setIsLoading(false);
      return;
    }

    try {
      // Store token in localStorage
      localStorage.setItem('auth_token', token);
      console.log('Token successfully stored in localStorage');
      
      // Verify token with backend (optional, for added security)
      const verifyToken = async () => {
        try {
          const response = await axios.post('http://localhost:8009/api/auth/verify-token', 
            {}, // Empty body for POST request
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          
          const data = response.data;
          
          if (data.valid) {
            console.log('Token verified successfully');
            // Store user info if needed
            if (data.user) {
              localStorage.setItem('user_info', JSON.stringify(data.user));
            }
            
            // If there was a previous location stored (from ProtectedRoute redirect)
            const state = location.state as { from?: Location };
            const from = state?.from?.pathname || '/dashboard';
            
            // Redirect to the original destination or dashboard
            setTimeout(() => navigate(from), 500);
          } else {
            // This case might not be reached if backend returns non-2xx for invalid token, 
            // as axios would throw an error.
            console.error('Token verification failed (axios success but data.valid false):', data.message);
            setError(`Authentication failed: ${data.message || 'Token reported as invalid by server.'}`);
            localStorage.removeItem('auth_token');
            setIsLoading(false);
          }
        } catch (err) {
          console.error('Error verifying token with axios:', err);
          let errorMessage = 'An unexpected error occurred during token verification.';
          if (axios.isAxiosError(err)) {
            if (err.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error('Error response data:', err.response.data);
              console.error('Error response status:', err.response.status);
              
              // Special handling for "Token used too early" error
              const responseData = err.response.data;
              if (responseData && responseData.detail && responseData.detail.includes('Token used too early')) {
                errorMessage = 'Your computer clock is not synchronized with our servers. Please sync your computer clock and try again.';
              } else {
                errorMessage = responseData?.message || `Server error: ${err.response.status}`;
              }
            } else if (err.request) {
              // The request was made but no response was received
              console.error('Error request:', err.request);
              errorMessage = 'No response from server. Check network or CORS on server.';
            } else {
              // Something happened in setting up the request that triggered an Error
              errorMessage = err.message;
            }
          } else if (err instanceof Error) {
            errorMessage = err.message;
          }
          setError(`Authentication failed: ${errorMessage}`);
          localStorage.removeItem('auth_token'); // Remove token on error
          setIsLoading(false);
        }
      };
      
      verifyToken();
    } catch (err) {
      console.error('Error processing authentication:', err);
      setError('Error processing authentication. Please try again.');
    }
  }, [navigate, location.state]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {error ? 'Authentication Error' : 'Processing Authentication'}
        </h1>
        
        {error ? (
          <div className="text-red-500 mb-6">
            {error}
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <LoadingSpinner size="lg" />
            </div>
            <p className="text-gray-600">
              Please wait while we complete your authentication...
            </p>
          </>
        )}
        
        {error && (
          <div className="mt-6 space-y-4">
            <div className="text-gray-600 text-sm">
              <p className="mb-2">If you're experiencing "Invalid token" errors:</p>
              <ul className="list-disc text-left pl-6 mb-4">
                <li>Make sure your computer's clock is synchronized with internet time</li>
                <li>Clear your browser cookies and cache</li>
                <li>Try using a different browser</li>
              </ul>
            </div>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors w-full"
              onClick={() => window.location.href = 'http://localhost:8080/login'}
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenHandler;
