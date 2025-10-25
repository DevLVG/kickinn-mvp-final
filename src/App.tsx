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
import ExecutorOpportunities from "./pages/ExecutorOpportunities";
import ExecutorOpportunityDetail from "./pages/ExecutorOpportunityDetail";
import ExecutorActive from "./pages/ExecutorActive";
import ExecutorContracts from "./pages/ExecutorContracts";
import ExecutorContractDetail from "./pages/ExecutorContractDetail";
import ExecutorEarnings from "./pages/ExecutorEarnings";
import ExecutorReputation from "./pages/ExecutorReputation";
import About from "./pages/About";
import Documentation from "./pages/Documentation";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import VentureWorkspace from "./pages/VentureWorkspace";
import Deals from "./pages/Deals";
import DealDetail from "./pages/DealDetail";
import Portfolio from "./pages/Portfolio";
import VentureDetail from "./pages/VentureDetail";
import ExitRedemption from "./pages/ExitRedemption";
import TokenDetail from "./pages/TokenDetail";
import Exits from "./pages/Exits";
import ExitDealDetail from "./pages/ExitDealDetail";
import MakeOffer from "./pages/MakeOffer";
import ComingSoon from "./pages/ComingSoon";
import Terms from "./pages/TermsOfService";
import Privacy from "./pages/PrivacyPolicy";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
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
          <Route path="/executor/opportunities" element={<ExecutorOpportunities />} />
          <Route path="/executor/opportunities/:id" element={<ExecutorOpportunityDetail />} />
          <Route path="/executor/active" element={<ExecutorActive />} />
          <Route path="/executor/contracts" element={<ExecutorContracts />} />
          <Route path="/executor/contracts/:id" element={<ExecutorContractDetail />} />
          <Route path="/ventures/:id" element={<VentureWorkspace />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/deals/:id" element={<DealDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:venture_id" element={<VentureDetail />} />
        <Route path="/portfolio/:venture_id/exit" element={<ExitRedemption />} />
        <Route path="/tokens/:venture_id" element={<TokenDetail />} />
          
          {/* Executor Routes */}
          <Route path="/executor/earnings" element={<ExecutorEarnings />} />
          <Route path="/executor/reputation" element={<ExecutorReputation />} />
          <Route path="/executor/marketplace" element={<ComingSoon />} />
          
          {/* Exit & Buyer Routes */}
          <Route path="/exits" element={<Exits />} />
          <Route path="/exits/:id" element={<ExitDealDetail />} />
          <Route path="/exits/:id/offer" element={<MakeOffer />} />
          <Route path="/buyer/offers" element={<ComingSoon />} />
          <Route path="/buyer/acquired" element={<ComingSoon />} />
          
          {/* Notifications & Settings */}
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          
          {/* Static Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<HelpCenter />} />
          
          {/* Coming Soon */}
          <Route path="/ventures" element={<ComingSoon />} />
          
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
