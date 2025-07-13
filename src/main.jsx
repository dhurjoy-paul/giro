import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './contexts/AuthProvider'
import './index.css'
import router from './routes/router'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          autoClose={2500}
          theme="light"
          closeOnClick
          pauseOnFocusLoss
          draggable
          position="top-center"
          newestOnTop={true}
          rtl={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
