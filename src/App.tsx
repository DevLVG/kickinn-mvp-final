import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import RegisterStepTwo from "./pages/RegisterStepTwo";
import RegisterStepThree from "./pages/RegisterStepThree";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitIdea from "./pages/SubmitIdea";
import Ideas from "./pages/Ideas";
import IdeaDetail from "./pages/IdeaDetail";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RegisterRouter = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  
  if (step === '2') return <RegisterStepTwo />;
  if (step === '3') return <RegisterStepThree />;
  return <Register />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<RegisterRouter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit-idea" element={<SubmitIdea />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/ideas/:id" element={<IdeaDetail />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
