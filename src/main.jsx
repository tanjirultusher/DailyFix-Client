import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'
import Root from './Layout/Root'
import AuthProvider from './contexts/AuthProvider';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children:[
      {
        index: true,
        Component: Home
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      }
    ]
  }
]) 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
