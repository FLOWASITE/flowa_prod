
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Dashboard from "./pages/Dashboard";
import Brands from "./pages/Brands";
import Topics from "./pages/Topics";
import Content from "./pages/Content";
import Chat from "./pages/Chat";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import BrandDetails from "./pages/BrandDetails";
import Users from "./pages/Users";
import Crm from "./pages/Crm";
import FileManager from "./pages/FileManager";
import AccountType from "./pages/AccountType";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import Invoices from "./pages/Invoices";
import ProfileSettings from "./pages/ProfileSettings";
import SocialConnections from "./pages/SocialConnections";
import { isSupabaseConnected } from "./integrations/supabase/client";
import { useEffect } from "react";
import { toast } from "sonner";
import { GoogleOAuthProvider } from '@react-oauth/google';
import PrivacyPolicyPage from "./pages/PrivacyPolicy";


// Create a React Query client with default settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  // Check backend connection on app startup
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = await isSupabaseConnected();

        // Show connection status notification
        if (connected) {
          toast.success("Connected to backend successfully", {
            description: "Your application is connected to the Supabase backend"
          });
        } else {
          toast.error("Backend connection failed", {
            description: "Using mock data instead. Check your network and Supabase settings."
          });
        }
      } catch (error) {
        console.error("Error checking backend connection:", error);
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    const initFacebookSDK = () => {
      window.FB.init({
        appId: '1371052354162968',
        cookie: true,
        xfbml: true,
        version: 'v22.0'
      });
    };

    // Kiểm tra xem SDK đã có trong window chưa
    if (window.FB) {
      initFacebookSDK();
    } else {
      // Lắng nghe khi SDK sẵn sàng
      window.fbAsyncInit = initFacebookSDK;
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId="663238634600-kot6od7eevdv9mqlb8i7vt08nm8dr4dj.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LanguageProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/brands/:id" element={<BrandDetails />} />
                <Route path="/topics" element={<Topics />} />
                <Route path="/content" element={<Content />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/crm" element={<Crm />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/filemanager" element={<FileManager />} />
                <Route path="/users" element={<Users />} />
                <Route path="/account-type" element={<AccountType />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/profile-settings" element={<ProfileSettings />} />
                <Route path="/social-connections" element={<SocialConnections />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LanguageProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>

  );
}

export default App;
