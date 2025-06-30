
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";
import Dashboard from "@/pages/Dashboard";
import OrganisateurEvents from "@/pages/OrganisateurEvents";
import OrganisateurScanner from "@/pages/OrganisateurScanner";
import CreateEvent from "@/pages/CreateEvent";
import ParticipantEvents from "@/pages/ParticipantEvents";
import ParticipantTickets from "@/pages/ParticipantTickets";
import AdminUsers from "@/pages/AdminUsers";
import AdminEvents from "@/pages/AdminEvents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />} />
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/organisateur/events" element={
        <ProtectedRoute allowedRoles={['organisateur']}>
          <OrganisateurEvents />
        </ProtectedRoute>
      } />
      
      <Route path="/organisateur/create-event" element={
        <ProtectedRoute allowedRoles={['organisateur']}>
          <CreateEvent />
        </ProtectedRoute>
      } />
      
      <Route path="/organisateur/scanner" element={
        <ProtectedRoute allowedRoles={['organisateur']}>
          <OrganisateurScanner />
        </ProtectedRoute>
      } />
      
      <Route path="/participant/events" element={
        <ProtectedRoute allowedRoles={['participant']}>
          <ParticipantEvents />
        </ProtectedRoute>
      } />
      
      <Route path="/participant/tickets" element={
        <ProtectedRoute allowedRoles={['participant']}>
          <ParticipantTickets />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['administrateur']}>
          <AdminUsers />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/events" element={
        <ProtectedRoute allowedRoles={['administrateur']}>
          <AdminEvents />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
