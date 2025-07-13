// src/layouts/DashboardLayout.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { Outlet } from 'react-router';
import LoadingHash from '../components/shared/LoadingHash';
import ThemeProvider from '../contexts/ThemeContext';
import useAuth from '../hooks/useAuth';
import Sidebar from '../pages/dashboard/sidebar/Sidebar';

export default function DashboardLayout() {
  const { loading: authLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (authLoading) return <LoadingHash />;

  return (
    <ThemeProvider>
      <div className="h-screen flex overflow-hidden bg-background text-text">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden relative z-10">

          {/* Mobile Topbar */}
          <div className="lg:hidden bg-sidebar px-4 py-3 shadow-md flex justify-between items-center border-b border-border">
            <button onClick={() => setSidebarOpen(true)} className="text-text-muted hover:text-text transition">
              <HiMenu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-brand">Dashboard</h1>
          </div>

          {/* Dynamic Content */}
          <main className="flex-1 overflow-y-auto p-6 pb-24 bg-background">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Outlet />
            </motion.div>
          </main>

          {/* Fixed Footer */}
          <footer className="fixed bottom-0 left-0 right-0 bg-sidebar border-t border-border z-50 text-center py-3 text-sm text-text-muted">
            © {new Date().getFullYear()} GIRO Ltd. All rights reserved.
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}
