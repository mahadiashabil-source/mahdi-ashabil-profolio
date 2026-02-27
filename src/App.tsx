/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Home from './pages/Home';
import VenturePage from './pages/VenturePage';
import Admin from './pages/Admin';

const AppRoutes = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("AppRoutes mounted, current path:", location.pathname);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-t-2 border-b-2 border-cyan-400 rounded-full animate-spin opacity-80" />
            <div className="absolute w-10 h-10 border-l-2 border-r-2 border-indigo-500 rounded-full animate-spin opacity-80" style={{ animationDirection: 'reverse' }} />
            <div className="absolute w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(0,243,255,1)] animate-pulse" />
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<VenturePage />} />
        <Route path="/mahdiurmirjamaiarrakiex" element={<Admin />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <Router>
        <AppRoutes />
      </Router>
    </PortfolioProvider>
  );
}
