import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { DashboardLayout } from "./components/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import Features from "./pages/Features";
import AdminSettings from "./pages/AdminSettings";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import DataAuditing from "./pages/DataAuditing";
import AIVerification from "./pages/AIVerification";
import RealTimeCompliance from "./pages/RealTimeCompliance";
import RegulatoryAlignment from "./pages/RegulatoryAlignment";
import ExportableReports from "./pages/ExportableReports";
import Integrations from "./pages/Integrations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="features" element={<Features />} />
            <Route path="auditing" element={<DataAuditing />} />
            <Route path="verification" element={<AIVerification />} />
            <Route path="realtime" element={<RealTimeCompliance />} />
            <Route path="regulatory" element={<RegulatoryAlignment />} />
            <Route path="reports" element={<ExportableReports />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="support" element={<Support />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
