import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'
import Root from './Layout/Root'
import AuthProvider from './contexts/AuthProvider';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './Pages/Profile';
import Services from './Pages/Services';
import AddServices from './Pages/AddServices';
import MyBookings from './Pages/MyBookings';
import MyServices from './Pages/MyServices';
import ServiceDetail from './Pages/ServiceDetail';
import ErrorPage from './Pages/ErrorPage';

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
      },
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: 'services',
        Component: Services
      },{
        path: 'addservice',
        Component : AddServices
      },
      {
        path: 'bookings',
        Component: MyBookings
      },
      {
        path: 'myservices',
        Component: MyServices
      },
      {
        path: '/service/:_id',
        Component: ServiceDetail
      },
      {
        path: "*",
        element: <ErrorPage/>
      },
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
