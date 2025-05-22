import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingSpinner } from './ui/loading-spinner';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('auth_token');
        
        // If no token exists, user is not authenticated
        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        
        // Verify token with backend
        const response = await fetch('http://localhost:8009/api/auth/verify-token', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });
        
        const data = await response.json();
        
        if (data.valid) {
          // If token is valid, update user info if needed
          if (data.user) {
            localStorage.setItem('user_info', JSON.stringify(data.user));
          }
          setIsAuthenticated(true);
        } else {
          console.error('Token verification failed:', data.message);
          localStorage.removeItem('auth_token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error verifying authentication:', error);
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Verifying Authentication</h1>
          <div className="flex justify-center mb-6">
            <LoadingSpinner size="lg" />
          </div>
          <p className="text-gray-600">
            Please wait while we verify your authentication...
          </p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/token-handler?error=auth_required" state={{ from: location }} replace />;
  }
  
  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
