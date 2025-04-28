
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
import { isSupabaseConnected } from "./integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Create a React Query client with default settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  // Check backend connection on app startup
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = await isSupabaseConnected();
        
        setBackendStatus(connected ? 'connected' : 'disconnected');
        
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
        setBackendStatus('disconnected');
        console.error("Error checking backend connection:", error);
      }
    };

    checkConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard backendStatus={backendStatus} />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/brands/:id" element={<BrandDetails />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/content" element={<Content />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
