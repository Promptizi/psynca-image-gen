import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Gallery from "./pages/Gallery";
import Credits from "./pages/Credits";
import Profile from "./pages/Profile";
import ThumbnailGenerator from "./pages/ThumbnailGenerator";
import CustomThumbnailGenerator from "./pages/CustomThumbnailGenerator";
import ThumbnailTester from "./pages/ThumbnailTester";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/thumbnail-generator" element={<ThumbnailGenerator />} />
          <Route path="/custom-thumbnails" element={<CustomThumbnailGenerator />} />
          <Route path="/thumbnail-tester" element={<ThumbnailTester />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
