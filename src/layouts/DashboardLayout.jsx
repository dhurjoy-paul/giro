// src/layouts/DashboardLayout.jsx
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { Outlet } from 'react-router';
import LoadingHash from '../components/shared/LoadingHash';
import Heading from '../components/ui/Heading';
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
            <div className=''> <Heading /></div>
            <div className='flex items-center gap-4'>
              <h1 className="text-[22px] font-bricolage-grotesque font-bold text-text">Dashboard</h1>
              <button onClick={() => setSidebarOpen(true)} className="text-text-muted hover:text-text transition cursor-pointer">
                <HiMenu size={26} />
              </button>
            </div>
          </div>

          {/* Dynamic Content */}
          <main className="flex-1 overflow-y-auto bg-background">
            <div className='relative bg-background isolate overflow-y-hidden min-h-screen'
            >{/* Blurred BGs */}
              <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }} className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-emerald-100 to-amber-100 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                />
              </div>

              <Outlet />

              {/* Top Glow */}
              <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
                <div className="aspect-1155/678 w-288.75 bg-gradient-to-tr from-amber-200 to-emerald-200 opacity-30"
                  style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
              </div>
            </div>
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
