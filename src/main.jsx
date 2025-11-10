import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'
import Root from './Layout/Root'
import AuthProvider from './contexts/AuthProvider';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children:[]
  }
]) 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
