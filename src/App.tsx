import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 🔥 Firebase
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Contexts & UI
import { SidebarProvider } from "@/contexts/SidebarContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Pages
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Deployment from "./pages/Deployment";
import MLOps from "./pages/MLOps";
import Performance from "./pages/Performance";
import Devices from "./pages/Devices";
import APIKeys from "./pages/APIKeys";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

// ScrollToTop
import ScrollToTop from "./components/ScrollToTop"; // make sure path is correct

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Listen to Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ⏳ Prevent flicker while checking auth
  if (loading) return null; // or a loading spinner

  const isAuthenticated = !!user;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop /> {/* Scroll to top on route change */}
            <Routes>
              {/* Redirect root */}
              <Route path="/" element={<Navigate to="/auth" replace />} />

              {/* Auth Page */}
              <Route
                path="/auth"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Auth setIsAuthenticated={() => {}} />
                  )
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/dashboard/deployment"
                element={
                  isAuthenticated ? <Deployment /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/dashboard/ml-ops"
                element={
                  isAuthenticated ? <MLOps /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/dashboard/performance"
                element={
                  isAuthenticated ? <Performance /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/dashboard/devices"
                element={
                  isAuthenticated ? <Devices /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/dashboard/api-keys"
                element={
                  isAuthenticated ? <APIKeys /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/dashboard/security"
                element={
                  isAuthenticated ? <Security /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  isAuthenticated ? <Settings /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/dashboard/support"
                element={
                  isAuthenticated ? <Support /> : <Navigate to="/auth" replace />
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
