import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Pages/Register.tsx';
import Login from './Pages/Login.tsx';
import PhotoPage from './Pages/PhotoPage.tsx';
// Import AuthProvider
import { AuthProvider } from './AuthContext'; // Adjust the import path as necessary

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/register', element: <Register/> },
  { path: '/login', element: <Login/> },
  { path: '/PhotoPage', element: <PhotoPage/> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrap RouterProvider with AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);