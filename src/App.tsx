import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

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
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
