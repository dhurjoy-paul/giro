import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './contexts/AuthProvider'
import './index.css'
import router from './routes/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={3500}
        theme="light"
        closeOnClick
        pauseOnFocusLoss
        draggable
        position="top-right"
        newestOnTop={true}
        rtl={false} />
    </AuthProvider>
  </StrictMode>
)
