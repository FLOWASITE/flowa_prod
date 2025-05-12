
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
import OAuth2Callback from "./utils/oauth/OAuth2Callback";
import { Provider } from 'react-redux';
import { store } from "./redux/app/store";
import TwitterCallback from "./utils/oauth/TwitterCallback";
import TwitterPost from "./TwitterPost";

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
    // Khởi tạo SDK Facebook khi component mount
    window.fbAsyncInit = function () {
      FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v22.0'
      });

      FB.AppEvents.logPageView();
    };

    // Tải SDK Facebook
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Cleanup khi component unmount
    return () => {
      if (window.FB) {
        window.FB = undefined;
      }
    };
  }, []);

  // useEffect(() => {
  //   const initFacebookSDK = () => {
  //     window.FB.init({
  //       appId: '1371052354162968',
  //       cookie: true,
  //       xfbml: true,
  //       version: 'v22.0'
  //     });
  //   };

  //   // Kiểm tra xem SDK đã có trong window chưa
  //   if (window.FB) {
  //     initFacebookSDK();
  //   } else {
  //     // Lắng nghe khi SDK sẵn sàng
  //     window.fbAsyncInit = initFacebookSDK;
  //   }
  // }, []);

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={"663238634600-kot6od7eevdv9mqlb8i7vt08nm8dr4dj.apps.googleusercontent.com"}>
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
                  <Route path="/oauth2callback" element={<OAuth2Callback />} />
                  <Route path="/auth/twitter/callback" element={<TwitterCallback />} />
                  <Route path="/post-twitter" element={<TwitterPost />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </LanguageProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
