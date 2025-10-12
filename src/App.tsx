import { Switch, Route, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "@/pages/Login";
import Events from "@/pages/Events";
import CreateEvent from "@/pages/CreateEvent";
import NotFound from "@/pages/not-found";
import { api } from "@/lib/api";

function Router() {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if there's a valid user in localStorage
    const currentUser = api.getCurrentUser();
    const auth = currentUser !== null;
    console.log('Initial auth state:', auth, 'User:', currentUser);
    return auth;
  });

  console.log('Current location:', location);
  console.log('Is authenticated:', isAuthenticated);

  const handleLogin = () => {
    // Only set authenticated if user data exists in localStorage
    const currentUser = api.getCurrentUser();
    if (currentUser) {
      setIsAuthenticated(true);
      setLocation('/events');
    }
  };

  const handleLogout = async () => {
    await api.logout(); // This clears localStorage
    setIsAuthenticated(false);
    setLocation('/');
  };

  // Redirect logic
  useEffect(() => {
    if (location === '/' && isAuthenticated) {
      setLocation('/events');
    } else if (location !== '/' && !isAuthenticated) {
      setLocation('/');
    }
  }, [location, isAuthenticated]);

  return (
    <Switch>
      <Route path="/">
        <Login onLogin={handleLogin} />
      </Route>
      <Route path="/events">
        <Events onLogout={handleLogout} />
      </Route>
      <Route path="/create">
        <CreateEvent onLogout={handleLogout} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
