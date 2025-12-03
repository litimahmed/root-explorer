/**
 * @file App.tsx
 * @description This is the main application component.
 * It sets up the routing configuration, global providers, and defines the overall structure of the application.
 * All major pages are routed from this component.
 */

// Import global UI components and providers.
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

// Import page components.
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import PartnerDetail from "./pages/PartnerDetail";
import TermsOfService from "./pages/TermsOfService";

/**
 * @const {QueryClient} queryClient
 * @description An instance of QueryClient from React Query for managing server state,
 * including caching, refetching, and invalidating data.
 */
const queryClient = new QueryClient();

/**
 * @component App
 * @description The root component of the application.
 * It wraps the entire application with necessary providers and sets up the routing.
 * - `QueryClientProvider`: Provides the React Query client to the component tree.
 * - `TooltipProvider`: Enables tooltip functionality throughout the app.
 * - `Toaster` and `Sonner`: Provide systems for displaying toast notifications.
 * - `ScrollToTop`: A utility component that scrolls the window to the top on route changes.
 * - `Routes`: Defines all the application's routes. New routes should be added here.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Global toast notification systems */}
      <Toaster />
      <Sonner />
      
      {/* Automatically scrolls to the top of the page on route changes */}
      <ScrollToTop />
      
      {/* Defines the routing for the application */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/partner/:partnerId" element={<PartnerDetail />} />
        
        {/* A catch-all route for handling 404 Not Found errors. */}
        {/* ADD ALL CUSTOM ROUTES ABOVE THIS LINE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
