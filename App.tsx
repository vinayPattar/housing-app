
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import ListingDetails from './pages/ListingDetails';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { AuthState, User } from './types';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const savedAuth = localStorage.getItem('homify_auth');
    return savedAuth ? JSON.parse(savedAuth) : { user: null, token: null };
  });

  useEffect(() => {
    localStorage.setItem('homify_auth', JSON.stringify(auth));
  }, [auth]);

  const handleLogin = (user: User, token: string) => {
    setAuth({ user, token });
  };

  const handleLogout = () => {
    setAuth({ user: null, token: null });
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar user={auth.user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route 
              path="/login" 
              element={auth.user ? <Navigate to="/" /> : <Auth mode="login" onAuthSuccess={handleLogin} />} 
            />
            <Route 
              path="/signup" 
              element={auth.user ? <Navigate to="/" /> : <Auth mode="signup" onAuthSuccess={handleLogin} />} 
            />
            <Route 
              path="/dashboard" 
              element={auth.user ? <Dashboard user={auth.user} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </HashRouter>
  );
};

export default App;
