import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminMessages from "./pages/admin/AdminMessages";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [siteReady, setSiteReady] = useState(false);

  useEffect(() => {
    // Simulate initial loading time for resources
    const minLoadTime = setTimeout(() => {
      setSiteReady(true);
    }, 100);

    return () => clearTimeout(minLoadTime);
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {/* Preloader */}
          {isLoading && siteReady && (
            <Preloader onComplete={handlePreloaderComplete} />
          )}

          {/* Main Site */}
          <div 
            className={`site transition-all duration-1000 ${
              isLoading ? 'opacity-0 blur-sm' : 'opacity-100 blur-none'
            }`}
          >
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<><Navigation /><Home /></>} />
                <Route path="/services" element={<><Navigation /><Services /></>} />
                <Route path="/pricing" element={<><Navigation /><Pricing /></>} />
                <Route path="/gallery" element={<><Navigation /><Gallery /></>} />
                <Route path="/about" element={<><Navigation /><About /></>} />
                <Route path="/contact" element={<><Navigation /><Contact /></>} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="messages" element={<AdminMessages />} />
                </Route>
                
                {/* Catch-all */}
                <Route path="*" element={<><Navigation /><NotFound /></>} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
